import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, NoDataError, GraphbackOrderBy, GraphbackPage } from '@graphback/runtime-mongo'; 
import { DataSyncProvider } from "./DataSyncProvider";

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DataSyncMongoDBDataProvider<Type = any, GraphbackContext = any> extends MongoDBDataProvider<Type, GraphbackContext> implements DataSyncProvider {

  public constructor(baseType: GraphQLObjectType, client: any) {
    super(baseType, client);
  }

  public async create(data: any): Promise<Type> {
    data._deleted = false;

    return super.create(data);
  }

  public async update(data: any): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }

    // TODO Can be improved by conditional updates
    const queryResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(idField.value), _deleted: false }).toArray();
    if (queryResult && queryResult[0]) {
      queryResult[0][idField.name] = queryResult[0]._id;
      if (data.updatedAt !== queryResult[0].updatedAt) {
        const conflictError: any = new Error();
        conflictError.conflictInfo = { serverState: queryResult[0], clientState: data };
        throw conflictError
      }


      // TODO use findOneAndUpdate to check consistency afterwards
      return super.update(data);
    }

    throw new NoDataError(`Could not find document to update in ${this.collectionName}`);
  }

  public async delete(data: any): Promise<Type> {

    // Only mark items as _deleted: true
    return super.update({
      ...data,
      _deleted: true
    });
  }

  public async findOne(filter: any): Promise<Type> {
    filter = this.mapDeletedField(filter);

    return super.findOne(filter);
  }

  public async findBy(filter?: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<Type[]> {
    filter = this.mapDeletedField(filter);

    return super.findBy(filter, orderBy, page);
  }

  public sync(lastSync: string): Promise<Type[]> {
    const filter = {
      updatedAt: {
        gt: lastSync
      },
    };

    return super.findBy(filter, undefined, undefined);
  }

  private mapDeletedField(filter: any) {
    if (filter === undefined) {
      filter = {};
    }

    filter._deleted = false

    return filter;
  }
}
