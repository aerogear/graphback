import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, QueryFilter, StringInput, GraphbackOperationType } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap } from "../util";
import { DataSyncProvider, DataSyncMongoDBDataProvider, DeltaProvider } from "./";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DeltaMongoDBDataProvider<Type = any> extends DataSyncMongoDBDataProvider <Type> {
  protected deltaProvider: DeltaProvider;

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
    applyIndexes([
      {
        key: {
          _deleted: 1
        }
      }
    ], this.db.collection(this.collectionName)).catch((e: any) => {
      throw e;
    });
    this.coerceTSFields = true;
    this.deltaProvider = new DeltaProvider(baseType, client);

  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;

    const res = await super.create(data, context);

    await this.deltaProvider.insertDiff((res as any)._id, res[metadataMap.fieldNames.updatedAt], res, GraphbackOperationType.CREATE);

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
          updatedAt: parseInt(data.updatedAt, 10),
          _deleted: {
            $ne: true
          }
        },
        {
          $set: Object.assign({}, updateSets, { updatedAt: Date.now() })
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
  
        const conflictReport = await this.deltaProvider.checkForConflicts(objectId, data.updatedAt, updateSets);
        // Resolve conflicts/Reject Update:

        // Check for conflicts
        if (Object.keys(conflictReport.conflicts).length > 0) {
          // Reject the update
          const serverState = Object.assign({ id: objectId, updatedAt: conflictReport.updatedAt.toString() }, conflictReport.conflicts)

          throw new ConflictError({ serverState, clientState: updateSets})
        }

        // No conflicts, bump updatedAt
        data.updatedAt = conflictReport.updatedAt;

        continue
      }
      
      // Update was successful
      await this.deltaProvider.insertDiff(objectId, updateResult.value.updatedAt, updateSets, GraphbackOperationType.UPDATE);

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

  public async findOne(filter: any, context: GraphbackContext): Promise<Type> {
    if (filter.id) {
      filter = { _id: new ObjectId(filter.id) }
    }
    const projection = this.buildProjectionOption(context);
    const query = this.db.collection(this.collectionName).findOne({
      ...filter,
      _deleted: { $ne: true }
    }, { projection });
    const data = await query;

    if (data) {
      return this.mapFields(data);
    }
    throw new NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async findBy(filter: QueryFilter<Type> | any, context: GraphbackContext, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<Type[]> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true };

    return super.findBy(filter, context, page, orderBy);
  }

  public async count(filter: any): Promise<number> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true };

    return super.count(filter);
  }

  public sync(lastSync: string, context: GraphbackContext, filter?: any): Promise<Type[]> {

    return super.findBy({
      ...filter,
      updatedAt: {
        gt: lastSync
      }
    }, context, undefined, undefined);
  }

  protected async checkForConflicts(clientData: any, context: GraphbackContext): Promise<ConflictStateMap> {
    const { idField } = getDatabaseArguments(this.tableMap, clientData);
    const { fieldNames } = metadataMap;

    if (!idField.value) {
      throw new NoDataError(`Couldn't get document from ${this.collectionName} - missing ID field`)
    }

    const projection = this.buildProjectionOption(context);

    if (projection) {
      projection[fieldNames.updatedAt] = 1;
      projection._deleted = 1
    }

    const queryResult = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value), _deleted: { $ne: true } }, { projection });
    if (queryResult) {
      queryResult[idField.name] = queryResult._id;
      if (
        queryResult[fieldNames.updatedAt] !== undefined &&
        clientData[fieldNames.updatedAt].toString() !== queryResult[fieldNames.updatedAt].toString()
      ) {
        queryResult[fieldNames.updatedAt] = queryResult[fieldNames.updatedAt].toString()

        return { serverState: queryResult, clientState: clientData };
      }

      return undefined;
    }

    throw new NoDataError(`Could not find any such documents from ${this.collectionName}`);
  }
}
