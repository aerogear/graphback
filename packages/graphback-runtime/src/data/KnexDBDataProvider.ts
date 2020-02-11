import * as Knex from 'knex';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';
import { GraphQLObjectType } from 'graphql';
import { lowerCaseFirstChar } from '@graphback/core';

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
    const [id] = await this.db(this.baseType.name).insert(data);
    const dbResult = await this.db.select().from(this.baseType.name).where('id', '=', id)
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${name}`);
  }

  public async update(data: Type): Promise<Type> {
    // TODO refactor to use id mapping
    const updateResult = await this.db(this.baseType.name).update(data).where('id', '=', id);
    if (updateResult === 1) {
      const dbResult = await this.db.select().from(this.baseType.name).where('id', '=', id);
      if (dbResult && dbResult[0]) {
        return dbResult[0]
      }
    }
    throw new NoDataError(`Cannot update ${name}`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(data: Type): Promise<Type> {
    // TODO refactor to use id mapping
    const dbResult = await this.db(this.baseType.name).where('id', '=', data.id).del()
    if (dbResult) {
      return {} as unknown as Type;
    }
    throw new NoDataError(`Cannot delete ${name}`);

  }

  public async read(id: string): Promise<Type> {
    const dbResult = await this.db.select().from(this.baseType.name).where('id', '=', id);
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot read ${name}`);
  }

  public async findAll(name: string): Promise<Type[]> {
    const dbResult = await this.db.select().from(this.baseType.name);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`Cannot find all results for ${name}`);
  }

  public async findBy(filter: Type | AdvancedFilter): Promise<Type[]> {
    const dbResult = await this.db.select().from(name).where(filter);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`No results for ${name} query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
    const dbResult = await this.db.select().from(name).whereIn(relationField, ids);

    if (dbResult) {

      const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
        return data[relationField].toString() === id.toString();
      }))

      return resultsById as [Type[]];
    }

    throw new NoDataError(`No results for ${name} and id: ${JSON.stringify(ids)}`);
  }

}
