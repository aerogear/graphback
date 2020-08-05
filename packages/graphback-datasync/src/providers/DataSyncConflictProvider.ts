import { ModelDefinition, GraphbackContext, TransformType, FieldTransform, NoDataError, GraphbackOperationType } from '@graphback/core';
import { DataSyncModelConflictConfig, DataSyncFieldNames, ConflictMetadata, ConflictError } from '../util';
import { MongoDeltaHelper } from '../deltaHelper';
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';

export const MAX_RETRIES = 3;

/**
 * Da
 */
export class DataSyncConflictMongoDBDataProvider<Type = any> extends DataSyncMongoDBDataProvider<Type> {
  protected conflictConfig: DataSyncModelConflictConfig
  protected deltaHelper: MongoDeltaHelper

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

    this.deltaHelper = new MongoDeltaHelper(model, client);

  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    const contextWithoutSelectedFields: GraphbackContext = { ...context }
    contextWithoutSelectedFields.graphback.options.selectedFields = [];

    data[DataSyncFieldNames.version] = 1;

    const result = await super.create(data, contextWithoutSelectedFields);

    await this.deltaHelper.insertDiff(result).catch((e: any) => { console.error(`Error in inserting delta: ${e}`) });


    return result;
  }

  public async update(updateDocument: any, context: GraphbackContext): Promise<Type> {
    const { _id } = updateDocument;

    for(let i = 0; i < MAX_RETRIES; i++) {
      
      const serverData = await this.db.collection(this.collectionName).findOne({ _id, [DataSyncFieldNames.deleted]: false});
      const base = await this.deltaHelper.findBaseForConflicts(updateDocument);
      const clientData = updateDocument;

      let resolvedUpdate = Object.assign({}, updateDocument);

      const updateFilter: any = { _id, [DataSyncFieldNames.version]: serverData[DataSyncFieldNames.version] }

      if (serverData[DataSyncFieldNames.version] !== clientData[DataSyncFieldNames.version]){
        const conflict = this.checkForConflict(clientData, base, serverData, GraphbackOperationType.UPDATE);

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
        await this.deltaHelper.insertDiff(value);

        return value;
      }
    }

    throw new Error(`Cannot update ${this.collectionName}`);
  }

  public checkForConflict(clientData: any, base: any, serverData: any, operation: GraphbackOperationType): ConflictMetadata|undefined {
    const ignoredKeys = [DataSyncFieldNames.lastUpdatedAt, DataSyncFieldNames.version, DataSyncFieldNames.deleted];

    const clientDiff: any = {};
    const serverDiff: any = {};

    let isConflict = false;

    for (const key of Object.keys(clientData)) {
      if (base[key] !== clientData[key]) {
        if (!ignoredKeys.includes(key)) {
          clientDiff[key] = clientData[key];
        }
      }
    }

    // calculate server diff
    for (const key of Object.keys(clientData)) {
      if (base[key] !== serverData[key]) {
        if (!ignoredKeys.includes(key)) {
          serverDiff[key] = serverData[key];
          if (clientDiff[key]) {
            isConflict = true;
          }
        }
      }
    }

    if (isConflict) {
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