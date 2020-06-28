import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap } from "../util";
import { ConflictEngine, TimestampConflictEngine } from '../conflict/conflictEngine';
import { DataSyncProvider } from "./DataSyncProvider";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DataSyncMongoDBDataProvider<Type = any> extends MongoDBDataProvider<Type> implements DataSyncProvider {
  protected conflictEngine: ConflictEngine;

  public constructor(baseType: GraphQLObjectType, client: any, customConflictEngine?: ConflictEngine) {
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
    if (customConflictEngine !== undefined) {
      this.conflictEngine = customConflictEngine;
    } else {
      this.conflictEngine = new TimestampConflictEngine();
    }

    if (this.conflictEngine.updateState !== undefined) {
      const updateTransforms = this.conflictEngine.updateState();
      this.fieldTransformMap[TransformType.UPDATE].push(...updateTransforms);
      this.fieldTransformMap[TransformType.CREATE].push(...updateTransforms);
    }
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;

    return super.create(data, context);
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {
    data = await this.checkAndResolveConflicts(data, context);

    // TODO use findOneAndUpdate to check consistency afterwards
    return super.update(data, context);
  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {
    data = await this.checkAndResolveConflicts(data, context);

    const { idField } = getDatabaseArguments(this.tableMap, data);
    data = {};

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform();
      });

    data._deleted = true;
    const objectId = new ObjectId(idField.value);
    const result = await this.db.collection(this.collectionName).updateOne({ _id: objectId, _deleted: { $ne: true } }, { $set: data });
    if (result.result.nModified === 1) {
      const projection = this.buildProjectionOption(context);
      const updatedDocument = await this.db.collection(this.collectionName).findOne({ _id: objectId }, { projection })
      if (updatedDocument) {

        return this.mapFields(updatedDocument);
      }
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
      _deleted: { $ne: true}
    }, { projection });
    const data = await query;

    if (data) {
      return this.mapFields(data);
    }
    throw new NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async findBy(filter: any, context: GraphbackContext, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<Type[]> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true };

    return super.findBy(filter, context, orderBy, page);
  }

  public async count(filter: any): Promise<number> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = { ne: true};

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

  protected async checkAndResolveConflicts(clientData: any, context: GraphbackContext): Promise<any> {
    const { idField } = getDatabaseArguments(this.tableMap, clientData);
    const { fieldNames } = metadataMap;

    if (!idField.value) {
      throw new NoDataError(`Couldn't get document from ${this.collectionName} - missing ID field`)
    }
    const projection = {
      ...this.buildProjectionOption(context),
      [fieldNames.updatedAt]: 1,
      _deleted: 1
    };
    const serverState = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value), _deleted: { $ne: true} }, { projection });

    if (serverState) {
      let resolvedState = clientData;
      const conflict = this.conflictEngine.checkForConflicts(serverState, clientData)

      if (conflict !== undefined) {
        if (this.conflictEngine.resolveConflicts !== undefined) {
          resolvedState = this.conflictEngine.resolveConflicts(conflict);
        } else {
          throw new ConflictError(conflict);
        }
      }

      return resolvedState
    }

    throw new NoDataError(`Could not find any such documents from ${this.collectionName}`);
  }
}
