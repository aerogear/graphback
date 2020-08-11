import { ModelDefinition, GraphbackContext, TransformType, FieldTransform, NoDataError, GraphbackOperationType } from '@graphback/core';
import { DataSyncModelConflictConfig, DataSyncFieldNames, ConflictMetadata, ConflictError } from '../util';
import { MongoDeltaSource } from '../deltaSource';
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';

export const MAX_RETRIES = 3;

/**
 * Data Provider with update conflicts and optional conflict resolution
 * that connects to the MongoDB database
 */
export class DataSyncConflictMongoDBDataProvider<Type = any> extends DataSyncMongoDBDataProvider<Type> {
  protected conflictConfig: DataSyncModelConflictConfig
  protected deltaSource: MongoDeltaSource

  public constructor(model: ModelDefinition, client: any, dataSyncConflictConfig: DataSyncModelConflictConfig) {
    super(model, client);
    this.conflictConfig = dataSyncConflictConfig;

    if (!this.conflictConfig.conflictResolution?.resolveUpdate) {
      this.conflictConfig.conflictResolution = {
        resolveUpdate(conflict: ConflictMetadata) {
          throw new ConflictError(conflict)
        }
      }
    }

    this.deltaSource = new MongoDeltaSource(model, client);

  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    context.graphback.options.selectedFields = []

    data[DataSyncFieldNames.version] = 1;

    const result = await super.create(data, context);

    await this.deltaSource.insertDiff(result).catch((e: any) => { console.error(`Error in inserting delta: ${e}`) });


    return result;
  }

  public async update(updateDocument: any, context: GraphbackContext): Promise<Type> {
    const { _id } = updateDocument;

    for(let i = 0; i < MAX_RETRIES; i++) {
      
      const serverData = await this.db.collection(this.collectionName).findOne({ _id, [DataSyncFieldNames.deleted]: false});
      const base = await this.deltaSource.findBaseForConflicts(updateDocument);

      let resolvedUpdate = Object.assign({}, updateDocument);

      const updateFilter = { _id, [DataSyncFieldNames.version]: serverData[DataSyncFieldNames.version] }

      if (serverData[DataSyncFieldNames.version] !== updateDocument[DataSyncFieldNames.version]){
        const conflict = this.checkForConflict(updateDocument, base, serverData, GraphbackOperationType.UPDATE);

        if (conflict) {
          resolvedUpdate = this.conflictConfig.conflictResolution.resolveUpdate(conflict);
        }

      }

      if (Object.keys(resolvedUpdate).length === 0) {
        return serverData;
      }

      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      resolvedUpdate[DataSyncFieldNames.version] = serverData[DataSyncFieldNames.version] + 1

      const { value } = await this.db.collection(this.collectionName).findOneAndUpdate(updateFilter, { $set: resolvedUpdate }, { returnOriginal: false });
      if (value) {
        await this.deltaSource.insertDiff(value);

        return value;
      }
    }

    throw new Error(`Cannot update ${this.collectionName}`);
  }

  public checkForConflict(clientData: any, base: any, serverData: any, operation: GraphbackOperationType): ConflictMetadata|undefined {
    const ignoredKeys = [DataSyncFieldNames.lastUpdatedAt, DataSyncFieldNames.version, DataSyncFieldNames.deleted];

    const clientDiff: any = {};
    const serverDiff: any = {};

    let conflictFound = false;

    // Calculate clientDiff and serverDiff
    for (const key of Object.keys(clientData)) {
      if (!ignoredKeys.includes(key)) {
        if (base[key] !== clientData[key]) {
          clientDiff[key] = clientData[key];
        }

        if (base[key] !== serverData[key]) {
          serverDiff[key] = serverData[key];
          if (clientDiff[key]) {
            conflictFound = true;
          }
        }
      }
    }


    if (conflictFound) {
      return {
        base,
        server: serverData,
        client: clientData,
        serverDiff,
        clientDiff,
        operation
      }
    }

    return undefined;
  }
}
