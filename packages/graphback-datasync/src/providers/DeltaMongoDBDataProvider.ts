import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, QueryFilter, StringInput, GraphbackOperationType } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap, ConflictEngine, HashConflictEngine } from "../util";
import { DataSyncProvider, DataSyncMongoDBDataProvider, DeltaProvider } from "./";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DeltaMongoDBDataProvider<Type = any> extends DataSyncMongoDBDataProvider <Type> {
  protected deltaProvider: DeltaProvider;

  public constructor(baseType: GraphQLObjectType, client: any, conflictEngine?: ConflictEngine) {
    super(baseType, client, conflictEngine);
    this.deltaProvider = new DeltaProvider(baseType, client);
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;
    data._version = 1;

    const res = await super.create(data, context);

    await this.deltaProvider.insertDiff((res as any)._id, res[metadataMap.fieldNames.updatedAt], 1, res, GraphbackOperationType.CREATE);

    return res;
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    const updateSets = Object.assign({}, data);
    delete updateSets.id;

    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }

    const objectId = new ObjectId(idField.value);

    const startTime = Date.now();

    const RETRY_LIMIT = 3000; // 3 seconds

    // while ((Date.now() - startTime) < RETRY_LIMIT) {   // Commented for debugging
    while (Date.now()) {
      const updateResult = await this.db.collection(this.collectionName).findOneAndUpdate(
        {
          _id: objectId,
          _version: data._version,
          _deleted: {
            $ne: true
          }
        },
        {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          $set: Object.assign({}, updateSets, { updatedAt: Date.now(), _version: data._version + 1 })
        },
        {
          returnOriginal: false
        }
      )
      if (!updateResult.value) {
        // There is conflict or document doesn't exist
  
        // Check if document exists
        const currentState = await this.db.collection(this.collectionName).countDocuments({ _id: objectId, _deleted: { $ne: true } })
        if (currentState === 0){
          throw new NoDataError(`Cannot update ${this.collectionName}`);
        }
  
        const conflictReport = await this.deltaProvider.checkForConflicts(objectId, data._version, updateSets); 
        // Resolve conflicts/Reject Update:

        // Check for conflicts
        if (Object.keys(conflictReport.conflicts).length > 0) {
          // Reject the update
          const serverState = Object.assign({ id: objectId, _version: conflictReport.version }, conflictReport.conflicts)

          throw new ConflictError({ serverState, clientState: updateSets})
        }

        // No conflicts, bump updatedAt
        data._version = conflictReport.version;

        continue
      }
      
      // Update was successful
      await this.deltaProvider.insertDiff(objectId, updateResult.value.updatedAt, updateResult.value._version, updateSets, GraphbackOperationType.UPDATE);

      return this.mapFields(updateResult.value)
    }
    throw new NoDataError(`Timeout on ${this.collectionName}`);
  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {
    const conflict = await this.checkForConflicts(data, context);
    if (conflict !== undefined) {
      throw new ConflictError(conflict);
    }

    const { idField } = getDatabaseArguments(this.tableMap, data);
    data = {};

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform();
      });

    data._deleted = true;
    const objectId = new ObjectId(idField.value);
    const projection = this.buildProjectionOption(context);
    const result = await this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId }, { $set: data }, { projection, returnOriginal: false });
    if (result.ok) {
      return this.mapFields(result.value);
    }

    throw new NoDataError(`Could not delete from ${this.collectionName}`);
  }
}
