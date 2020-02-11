import { lowerCaseFirstChar } from '@graphback/core';
import { GraphQLObjectType } from 'graphql';
import * as Knex from 'knex';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';

/**
 * Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.
 * Layer is tested with following databases:
 *
 * - Sqlite
 * - MySQL (MariaDB)
 * - Postgress (by `PgKnexDBDataProvider`)
 *
 * NOTE: For Postgres use dedicated `PgKnexDBDataProvider` that implements more performant creation method.
 */
// tslint:disable-next-line: no-any
export class KnexDBDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

  protected db: Knex;
  protected baseType: GraphQLObjectType;
  protected tableName: string;

  constructor(baseType: GraphQLObjectType, db: Knex) {
    this.db = db;
    this.baseType = baseType;
    // TODO build and use mapping here
    this.tableName = lowerCaseFirstChar(baseType.name);
  }

  public async create(data: Type): Promise<Type> {
    // TODO refactor to use new knex api
    const [id] = await this.db(this.tableName).insert(data);
    const dbResult = await this.db.select().from(this.tableName).where('id', '=', id)
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${this.tableName}`);
  }

  public async update(data: Type): Promise<Type> {
    // TODO refactor to use id mapping
    const updateResult = await this.db(this.tableName).update(data).where('id', '=', (data as any).id);
    if (updateResult === 1) {
      const dbResult = await this.db.select().from(this.tableName).where('id', '=', (data as any).id);
      if (dbResult && dbResult[0]) {
        return dbResult[0]
      }
    }
    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(data: Type): Promise<Type> {
    // TODO refactor to use id mapping
    const beforeDelete = await this.db.select().from(this.tableName).where('id', '=', (data as any).id);
    // TODO refactor to use id mapping
    // tslint:disable-next-line: await-promise
    const dbResult = await this.db(this.tableName).where('id', '=', (data as any).id).del()
    if (dbResult && beforeDelete[0]) {
      return beforeDelete[0];
    }
    throw new NoDataError(`Cannot delete ${this.tableName} with ${JSON.stringify(data)}`);

  }

  public async read(id: string): Promise<Type> {
    const dbResult = await this.db.select().from(this.tableName).where('id', '=', id);
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot read ${this.tableName}`);
  }

  public async findAll(): Promise<Type[]> {
    const dbResult = await this.db.select().from(this.tableName);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`Cannot find all results for ${this.tableName}`);
  }

  public async findBy(filter: Type | AdvancedFilter): Promise<Type[]> {
    const dbResult = await this.db.select().from(this.tableName).where(filter);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`No results for ${this.tableName} query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
    const dbResult = await this.db.select().from(this.tableName).whereIn(relationField, ids);

    if (dbResult) {

      const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
        return data[relationField].toString() === id.toString();
      }))

      return resultsById as [Type[]];
    }

    throw new NoDataError(`No results for ${this.tableName} and id: ${JSON.stringify(ids)}`);
  }

}
