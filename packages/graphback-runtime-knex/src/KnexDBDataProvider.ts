import { buildModelTableMap, getDatabaseArguments, ModelTableMap } from '@graphback/core';
import { GraphQLObjectType } from 'graphql';
import * as Knex from 'knex';
import { GraphbackDataProvider, GraphbackPage, NoDataError, GraphbackOrderBy } from '@graphback/runtime';
import { buildQuery } from './knexQueryMapper';

/**
 * Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.
 * Layer is tested with following databases:
 *
 * - Sqlite
 * - MySQL (MariaDB)
 * - Postgres (by `PgKnexDBDataProvider`)
 *
 * NOTE: For Postgres use dedicated `PgKnexDBDataProvider` that implements more performant creation method.
 */
//tslint:disable-next-line: no-any
export class KnexDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

  protected db: Knex;
  protected baseType: GraphQLObjectType;
  protected tableName: string;
  protected tableMap: ModelTableMap;

  public constructor(baseType: GraphQLObjectType, db: Knex) {
    this.db = db;
    this.baseType = baseType;
    //TODO build and use mapping here
    this.tableMap = buildModelTableMap(baseType);
    this.tableName = this.tableMap.tableName;
  }

  public async create(data: Type): Promise<Type> {
    const { data: createData } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const [id] = await this.db(this.tableName).insert(createData);
    //tslint:disable-next-line: await-promise
    const dbResult = await this.db.select().from(this.tableName).where(this.tableMap.idField, '=', id)
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${this.tableName}`);
  }

  public async update(data: Type): Promise<Type> {
    const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const updateResult = await this.db(this.tableName).update(updateData).where(idField.name, '=', idField.value);
    if (updateResult === 1) {
      //tslint:disable-next-line: await-promise
      const dbResult = await this.db.select().from(this.tableName).where(idField.name, '=', idField.value);
      if (dbResult && dbResult[0]) {
        return dbResult[0]
      }
    }
    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  //tslint:disable-next-line: no-reserved-keywords
  public async delete(data: Type): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const beforeDelete = await this.db.select().from(this.tableName).where(idField.name, '=', idField.value);
    //tslint:disable-next-line: await-promise
    const dbResult = await this.db(this.tableName).where(idField.name, '=', idField.value).del()
    if (dbResult && beforeDelete[0]) {
      return beforeDelete[0];
    }
    throw new NoDataError(`Cannot delete ${this.tableName} with ${JSON.stringify(data)}`);
  }

  public async findOne(args: Partial<Type>): Promise<Type> {
    let result: Type
    try {
      result = await this.db.select().from(this.tableName).where(args).first();
    } catch (err) {
      throw new NoDataError(`Cannot find a result for ${this.tableName} with filter: ${JSON.stringify(args)}`)
    }

    return result
  }

  public async findBy(filter?: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<Type[]> {
    let query = buildQuery(this.db, filter).from(this.tableName)

    if (orderBy) {
      query = query.orderBy(orderBy.field, orderBy.order)
    }

    //tslint:disable-next-line: await-promise
    const dbResult = await this.usePage(query, page);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`No results for ${this.tableName} query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(relationField: string, ids: string[], filter?: any): Promise<Type[][]> {
    //TODO: Use mapping when relationships are done
    //tslint:disable-next-line: await-promise
    const dbResult = await buildQuery(this.db, filter).from(this.tableName).whereIn(relationField, ids);

    if (dbResult) {

      const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
        return data[relationField].toString() === id.toString();
      }))

      return resultsById as [Type[]];
    }

    throw new NoDataError(`No results for ${this.tableName} and id: ${JSON.stringify(ids)}`);
  }

  private usePage(query: Knex.QueryBuilder, page?: GraphbackPage) {
    if (!page) {
      return query
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
      query = query.offset(offset)
    }

    return query;
  }
}
