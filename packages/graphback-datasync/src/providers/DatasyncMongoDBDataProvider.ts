import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, QueryFilter, StringInput, ModelTableMap } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap, ConflictEngine} from "../util";
import { DataSyncProvider } from "./";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DataSyncMongoDBDataProvider<Type = any> extends MongoDBDataProvider<Type> implements DataSyncProvider {
  protected conflictEngine: ConflictEngine;

  public constructor(baseType: GraphQLObjectType, client: any, conflictEngine?: ConflictEngine) {
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
    this.conflictEngine = conflictEngine;
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;
    if (this.conflictEngine !== undefined) {
      const { next, conflictFieldName } = this.conflictEngine;
      data[conflictFieldName] = next(undefined, data);
    }

    return super.create(data, context);
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {

    const { idField } = getDatabaseArguments(this.tableMap, data);

    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }

    const objectId = new ObjectId(idField.value);

    const startTime = Date.now();

    const RETRY_LIMIT = 3000; // 3 seconds

    while ((Date.now() - startTime) < RETRY_LIMIT) {   // Commented for debugging
    // while (Date.now()) {

      this.fieldTransformMap[TransformType.UPDATE]
        .forEach((f: FieldTransform) => {
          data[f.fieldName] = f.transform(data[f.fieldName]);
        });

      const updateFilter: any = { _id: objectId, _deleted: { $ne: true } };
      const updateSets = Object.assign({}, data);
      // eslint-disable-next-line @typescript-eslint/tslint/config
      delete updateSets[this.tableMap.idField];

      if (this.conflictEngine !== undefined) {
        
        const { conflictFieldName, next } = this.conflictEngine;
        const currentState = updateSets[conflictFieldName];
        updateFilter[conflictFieldName] = currentState;

        // eslint-disable-next-line @typescript-eslint/tslint/config
        delete updateSets[conflictFieldName]

        updateSets[conflictFieldName] = next(currentState, updateSets);
      }

      const updateResult = await this.db.collection(this.collectionName).findOneAndUpdate(updateFilter, {
        $set: updateSets
      },{
        w: "majority",
        returnOriginal: false
      })

      if (!updateResult.value) {
        // There is conflict or document doesn't exist
  
        // Check if document exists
        const serverData = await this.db.collection(this.collectionName).findOne({ _id: objectId, _deleted: { $ne: true } })
        if (!serverData){
          throw new NoDataError(`Cannot update ${this.collectionName}`);
        }

        const { conflictFieldName, resolveConflicts } = this.conflictEngine;

        let conflictMap:ConflictStateMap = {
          serverState: serverData,
          clientState: Object.assign({}, updateSets, { _id: objectId, [conflictFieldName]: updateFilter[conflictFieldName]})
        }
  
        // Resolve conflicts/Reject Update:
        if (resolveConflicts !== undefined) {
          conflictMap = resolveConflicts(Object.assign({}, serverData), data)
        }

        if (conflictMap !== undefined){
          const serverState = this.mapFields(serverData)

          throw new ConflictError({ serverState, clientState: data})
        }


        // No conflicts, bump conflictField
        data[conflictFieldName] = serverData[conflictFieldName];

        continue
      }

      return this.mapFields(updateResult.value)

    }
    
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {
    // throw new Error('not implemented');
    // const conflict = await this.checkForConflicts(data, context);
    // if (conflict !== undefined) {
    //   throw new ConflictError(conflict);
    // }

    const { idField } = getDatabaseArguments(this.tableMap, data);

    const objectId = new ObjectId(idField.value);
    const updateSets:any = { _id: objectId, _deleted: true }

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        updateSets[f.fieldName] = f.transform(data[f.fieldName]);
      });

    const projection = this.buildProjectionOption(context);

    const updateFilter:any = { _id: objectId, _deleted: { $ne: true } }

    if (this.conflictEngine !== undefined) {
        
      const { conflictFieldName, next } = this.conflictEngine;
      const currentState = data[conflictFieldName];
      updateFilter[conflictFieldName] = currentState;

      updateSets[conflictFieldName] = next(currentState, updateSets);
    }

    const result = await this.db.collection(this.collectionName).findOneAndUpdate(updateFilter, { $set: updateSets }, { returnOriginal: false });
    if (result.value) {
      return this.mapFields(result.value);
    } else {
      // There is conflict or document doesn't exist
  
      // Check if document exists
      const serverData = await this.db.collection(this.collectionName).findOne({ _id: objectId, _deleted: { $ne: true } })
      if (!serverData){
        throw new NoDataError(`Cannot update ${this.collectionName}`);
      }

      const { conflictFieldName } = this.conflictEngine;

      const conflictMap:ConflictStateMap = {
        serverState: this.mapFields(serverData),
        clientState: Object.assign({}, updateSets, { _id: objectId, [conflictFieldName]: updateFilter[conflictFieldName]})
      }

      throw new ConflictError(conflictMap)
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

  /**
   * @deprecated
   */
  protected async checkForConflicts(clientData: any, context: GraphbackContext): Promise<ConflictStateMap> {
    throw new Error('Deprecated')
  }
}
