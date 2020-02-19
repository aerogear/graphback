import { GraphQLObjectType } from 'graphql';
import { ObjectId, Db } from "mongodb"
import { ModelTableMap, buildModelTableMap, getDatabaseArguments } from '@graphback/core';
import { GraphbackDataProvider, NoDataError, AdvancedFilter } from '@graphback/runtime';

export class MongoDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
  protected db: Db;
  protected collectionName: string;
  protected tableMap: ModelTableMap;

  constructor(baseType: GraphQLObjectType, db: any) {
    this.db = db;
    this.tableMap = buildModelTableMap(baseType);
    this.collectionName = this.tableMap.tableName;
  }

  public async create(data: Type): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    const result = await this.db.collection(this.collectionName).insertOne(data);
    if (result && result.ops) {
      result.ops[0][idField.name] = result.ops[0]._id;
      return result.ops[0];
    }
    throw new NoDataError(`Cannot create ${this.collectionName}`);
  }

  public async update(data: Type): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    if (idField) {
      const result = await this.db.collection(this.collectionName).updateOne({ _id: new ObjectId(idField.value) }, { $set: data });
      if (result) {
        const queryResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(idField.value) }).toArray();
        if (queryResult && queryResult[0]) {
          queryResult[0][idField.name] = queryResult[0]._id;
          return queryResult[0];
        } else {
          throw new NoDataError(`Cannot update ${this.collectionName}`);
        }
      }
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(data: Type): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    if (idField) {
      const queryResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(idField.value) }).toArray();
      if (queryResult) {
        const result = await this.db.collection(this.collectionName).deleteOne({ _id: new ObjectId(idField.value) });
        if (queryResult && queryResult[0]) {
          queryResult[0][idField.name] = queryResult[0]._id;
          return queryResult[0];
        } else {
          throw new NoDataError(`Cannot update ${this.collectionName}`);
        }
      }
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  public async findAll(): Promise<Type[]> {
    const data = await this.db.collection(this.collectionName).find({}).toArray();
    if (data) {
      return data.map((one: any) => {
        return {
          ...one,
          id: one._id
        }
      });
    }
    throw new NoDataError(`Cannot find all results for ${this.collectionName}`);
  }

  public async findBy(filter: Type | AdvancedFilter): Promise<Type[]> {
    let dbResult;
    const { idField } = getDatabaseArguments(this.tableMap, filter);
    // TODO MongoDB should use advanced filter with JSON scalar defined as InputType
    if (filter[idField.name]) {
      dbResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(filter[idField.name]) }).toArray();
    } else {
      dbResult = await this.db.collection(this.collectionName).find({ title: filter.title }).toArray();
    }
    if (dbResult) {
      return dbResult.map((one: any) => {
        return {
          ...one,
          id: one._id
        }
      });
    }
    throw new NoDataError(`No results for ${this.collectionName} query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
    // TODO
    return [];


  }

}
