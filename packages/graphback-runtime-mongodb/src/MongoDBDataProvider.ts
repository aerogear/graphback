import { GraphQLObjectType } from 'graphql';
import { ModelTableMap, buildModelTableMap, getDatabaseArguments } from '@graphback/core';
import { GraphbackDataProvider, NoDataError, AdvancedFilter } from '@graphback/runtime';
const { ObjectId } = require('mongodb');


export class MongoDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
  private db: any;
  protected tableName: string;
  protected tableMap: ModelTableMap;

  constructor(baseType: GraphQLObjectType, client: any) {
    client.connect((result: any) => {
      this.db = client.db("graphql_practice");
    });
    //TODO build and use mapping here
    this.tableMap = buildModelTableMap(baseType);
    this.tableName = this.tableMap.tableName;
  }

  public async create(data: any): Promise<Type> {
    // const { data: createData } = getDatabaseArguments(this.tableMap, data);
    const result = await this.db.collection(this.tableName).insertOne(data);
    if (result) {
      return {
        ...result.ops[0],
        id: result.ops[0]._id
      }
    }
    throw new NoDataError(`Cannot create ${this.tableName}`);
  }

  public async update(data: Type): Promise<Type> {
    const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);
    if (idField) {
      const result = await this.db.collection(this.tableName).updateOne({ _id: ObjectId(idField.value) }, { $set: data });
      if (result) {
        const dbResult = await this.db.collection(this.tableName).find({ _id: ObjectId(idField.value) }).toArray();
        if (dbResult) {
          return {
            ...dbResult[0],
            id: dbResult[0]._id
          }
        } else {
          throw new NoDataError(`Cannot update ${this.tableName}`);
        }
      }
    }
    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(data: Type): Promise<Type> {
    const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);
    if (idField) {
      const dbResult = await this.db.collection(this.tableName).find({ _id: ObjectId(idField.value) }).toArray();
      if (dbResult) {
        const result = await this.db.collection(this.tableName).deleteOne({ _id: ObjectId(idField.value) }, { $set: data });
        if (result) {
          return {
            ...dbResult[0],
            id: dbResult[0]._id,
          };
        } else {
          throw new NoDataError(`Cannot update ${this.tableName}`);
        }
      }
    }
    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  public async findAll(): Promise<Type[]> {
    const data = await this.db.collection(this.tableName).find({}).toArray();
    if (data) {
      return data.map((one: any) => {
        return {
          ...one,
          id: one._id
        }
      });
    }
    throw new NoDataError(`Cannot find all results for ${this.tableName}`);
  }

  public async findBy(filter: Type | AdvancedFilter): Promise<Type[]> {
    let dbResult;
    if (filter.id) {
      dbResult = await this.db.collection(this.tableName).find({ _id: ObjectId(filter.id) }).toArray();
    } else {
      dbResult = await this.db.collection(this.tableName).find({ title: filter.title }).toArray();
    }
    if (dbResult) {
      return dbResult.map((one: any) => {
        return {
          ...one,
          id: one._id
        }
      });
    }
    throw new NoDataError(`No results for ${this.tableName} query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
    // const dbResult = await this.db.select().from(name).whereIn(relationField, ids);

    // if (dbResult) {

    //   const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
    //     return data[relationField].toString() === id.toString();
    //   }))

    //   return resultsById as [Type[]];
    // }

    throw new NoDataError(`No results for ${this.tableName} and id: ${JSON.stringify(ids)}`);
  }

}
