import { GraphQLObjectType } from 'graphql';
import { ObjectId, Db, Cursor } from "mongodb"
import { ModelTableMap, buildModelTableMap, getDatabaseArguments } from '@graphback/core';
import { GraphbackDataProvider, GraphbackPage, NoDataError, GraphbackOrderBy, getFieldTransformations, FieldTransform, TransformType, FieldTransformMap } from '@graphback/runtime';
import { buildQuery } from './queryBuilder'

interface SortOrder {
  [fieldName: string]: 1 | -1;
}

/**
 * Graphback provider that connnects to the MongoDB database
 */
export class MongoDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
  protected db: Db;
  protected collectionName: string;
  protected tableMap: ModelTableMap;
  protected fieldTransformMap: FieldTransformMap;

  public constructor(baseType: GraphQLObjectType, db: any) {
    this.db = db;
    this.tableMap = buildModelTableMap(baseType);
    this.collectionName = this.tableMap.tableName;
    this.fieldTransformMap = getFieldTransformations(baseType);
  }

  public async create(data: any): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    if (data && data[idField.name]) {
      // Ignore id passed from client side. In case id is passed it should not be saved
      // eslint-disable-next-line @typescript-eslint/tslint/config
      delete data[idField.name];
    }

    this.fieldTransformMap[TransformType.CREATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform(f.fieldName);
      });

    const result = await this.db.collection(this.collectionName).insertOne(data);
    if (result && result.ops) {

      return this.mapFields(result.ops[0]);
    }
    throw new NoDataError(`Cannot create ${this.collectionName}`);
  }

  public async update(data: Type): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    if (!idField.value) {
      throw new NoDataError(`Cannot update ${this.collectionName} - missing ID field`)
    }

    this.fieldTransformMap[TransformType.UPDATE]
      .forEach((f: FieldTransform) => {
        data[f.fieldName] = f.transform(f.fieldName);
      });

    const result = await this.db.collection(this.collectionName).updateOne({ _id: new ObjectId(idField.value) }, { $set: data });
    if (result) {
      const queryResult = await this.db.collection(this.collectionName).find({ _id: new ObjectId(idField.value) }).toArray();
      if (queryResult && queryResult[0]) {

        return this.mapFields(queryResult[0]);
      }
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  public async delete(data: Type): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    if (!idField.value) {
      throw new NoDataError(`Cannot delete ${this.collectionName} - missing ID field`)
    }

    const queryResult = await this.db.collection(this.collectionName).findOne({ _id: new ObjectId(idField.value) });
    if (queryResult) {
      const result = await this.db.collection(this.collectionName).deleteOne({ _id: new ObjectId(idField.value) });
      if (result.result.ok) {

        return this.mapFields(queryResult);
      }
    }
    throw new NoDataError(`Cannot update ${this.collectionName}`);
  }

  public async findOne(filter: any): Promise<Type> {
    if (filter.id) {
      filter = { _id: new ObjectId(filter.id) }
    }
    const query = this.db.collection(this.collectionName).findOne(filter);
    const data = await query;

    if (data) {
      return this.mapFields(data);
    }
    throw new NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async findBy(filter?: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<Type[]> {
    const query = this.db.collection(this.collectionName).find(buildQuery(filter));
    const data = await this.usePage(this.sortQuery(query, orderBy), page);

    if (data) {
      return data.map((one: any) => {
        return this.mapFields(one);
      });
    }
    throw new NoDataError(`Cannot find all results for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(relationField: string, ids: string[], filter?: any): Promise<Type[][]> {
    let result: any;

    const { idField } = getDatabaseArguments(this.tableMap);

    if (relationField === idField.name) {
      relationField = "_id";
      const array = ids.map((value: string) => {
        return new ObjectId(value);
      });
      result = await this.db.collection(this.collectionName).find(buildQuery({ _id: { $in: array }, ...filter })).toArray();
    } else {
      let query: any = {};
      const array = ids.map((value: any) => {
        return value.toString();
      });
      query = {
        ...filter
      }
      query[relationField] = { $in: array };
      result = await this.db.collection(this.collectionName).find(buildQuery(query)).toArray();
    }

    if (result) {
      const resultsById = ids.map((objId: string) => {
        const objectsForId: any = [];
        for (const data of result) {
          if (data[relationField].toString() === objId.toString()) {
            objectsForId.push(this.mapFields(data));
          }
        }

        return objectsForId;
      });

      return resultsById as [Type[]];
    }

    throw new NoDataError(`No results for ${this.collectionName} query and batch read with filter: ${JSON.stringify(filter)}`);

  }
  
  protected mapFields(document: any): any {
    if (document?._id) {
      document.id = document._id;
    }

    return document;
  }

  private sortQuery(query: Cursor<any>, orderBy: GraphbackOrderBy): Cursor<any> {
    const sortOrder: SortOrder = {};
    if (orderBy) {
      if (orderBy.field) {
        sortOrder[orderBy.field] = 1;
      }
      if (orderBy.order) {
        if (orderBy.order.toLowerCase() === 'desc') {
          sortOrder[orderBy.field] = -1;
        }
      }

    }

    return query.sort(sortOrder);
  }


  private usePage(query: Cursor<any>, page?: GraphbackPage) {
    if (!page) {
      return query.toArray();
    }

    const { offset, limit } = page

    if (offset < 0) {
      throw new Error("Invalid offset value. Please use an offset of greater than or equal to 0 in queries")
    }

    if (limit < 1) {
      throw new Error("Invalid limit value. Please use a limit of greater than 1 in queries")
    }

    if (limit) {
      query = query.limit(limit)
    }
    if (offset) {
      query = query.skip(offset)
    }

    return query.toArray();
  }

}
