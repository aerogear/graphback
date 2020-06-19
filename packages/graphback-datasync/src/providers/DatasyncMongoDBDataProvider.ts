import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap } from '@graphback/core';
import { ObjectId, IndexSpecification } from 'mongodb';
import { MongoDBDataProvider, NoDataError, GraphbackOrderBy, GraphbackPage, FieldTransform, TransformType, applyIndexes } from '@graphback/runtime-mongo'; 
import { ConflictError, ConflictStateMap } from "../util";
import { DataSyncProvider } from "./DataSyncProvider";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DataSyncMongoDBDataProvider<Type = any, GraphbackContext = any> extends MongoDBDataProvider<Type, GraphbackContext> implements DataSyncProvider {

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
    applyIndexes([
      {
        key: {
          _deleted: 1
        }
      }
    ],this.db.collection(this.collectionName)).catch((e: any) => {
      throw e;
    });
  }

  public async create(data: any): Promise<Type> {
    data._deleted = false;

    return super.create(data);
  }

  public async update(data: any): Promise<Type> {
    const conflict = await this.checkForConflicts(data);

    if (conflict !== undefined) {
      throw new ConflictError(conflict);
    }

    // TODO use findOneAndUpdate to check consistency afterwards
    return super.update(data);
  }

  public async delete(data: any): Promise<Type> {
    const conflict = await this.checkForConflicts(data);
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
    const result = await this.db.collection(this.collectionName).updateOne({ _id: new ObjectId(idField.value), _deleted: false }, { $set: data });
    if (result.result.nModified === 1) {
      const updatedDocument = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value) })
      if (updatedDocument) {

        return this.mapFields(updatedDocument);
      }
    }

    throw new NoDataError(`Could not delete from ${this.collectionName}`);
  }

  public async findOne(filter: any): Promise<Type> {
    if (filter.id) {
      filter = { _id: new ObjectId(filter.id) }
    }
    const query = this.db.collection(this.collectionName).findOne({
      ...filter,
      _deleted: false
    });
    const data = await query;

    if (data) {
      return this.mapFields(data);
    }
    throw new NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async findBy(filter?: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<Type[]> {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = false

    return super.findBy(filter, orderBy, page);
  }

  public sync(lastSync: string, filter?: any): Promise<Type[]> {

    return super.findBy({
      ...filter,
      updatedAt: {
        gt: lastSync
      }
    }, undefined, undefined);
  }

  protected async checkForConflicts(clientData: any): Promise<ConflictStateMap> {
    const { idField } = getDatabaseArguments(this.tableMap, clientData);
    const {fieldNames} = metadataMap;

    if (!idField.value) {
      throw new NoDataError(`Cannot delete ${this.collectionName} - missing ID field`)
    }
    const queryResult = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value), _deleted: false });
    if (queryResult) {
      queryResult[idField.name] = queryResult._id;
      if (clientData[fieldNames.updatedAt].toString() !== queryResult[fieldNames.updatedAt].toString()) {
        return { serverState: queryResult, clientState: clientData };
      }

      return undefined;
    }

    throw new NoDataError(`Could not delete from ${this.collectionName}`);
  }
}
