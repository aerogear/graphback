import { getModelTableMap, getUpdateArgs, ModelTableMap } from '@graphback/core';
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
  protected modelMappings: ModelTableMap[];
  constructor(db: Knex, modelMappings: ModelTableMap[]) {
    this.db = db;
    this.modelMappings = modelMappings;
  }

  public async create(name: string, data: Type): Promise<Type> {
    const { tableName } = getModelTableMap(name, this.modelMappings);

    // tslint:disable-next-line: await-promise
    const [id] = await this.db(tableName).insert(data);
    // tslint:disable-next-line: await-promise
    const dbResult = await this.db.select().from(tableName).where('id', '=', id)
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${name}`);
  }

  public async update(name: string, data: Type): Promise<Type> {
    
    const { idField, tableName } = getModelTableMap(name, this.modelMappings);
    const { id, data: updateData } = getUpdateArgs(idField, data);

    // tslint:disable-next-line: await-promise
    const updateResult = await this.db(tableName).update(updateData).where(id.field, '=', id.value);

    if (updateResult === 1) {
      // tslint:disable-next-line: await-promise
      const dbResult = await this.db.select().from(tableName).where(id.field, '=', id.value);
      if (dbResult && dbResult[0]) {
        return dbResult[0]
      }
    }
    throw new NoDataError(`Cannot update ${name}`);
  }

  // tslint:disable-next-line: no-reserved-keywords
  public async delete(name: string, id: string, data?: Type): Promise<string> {
    const { tableName } = getModelTableMap(name, this.modelMappings);

    // tslint:disable-next-line: await-promise
    const dbResult = await this.db(tableName).where('id', '=', id).del()
    if (dbResult) {
      return id;
    }
    throw new NoDataError(`Cannot delete ${name}`);

  }

  public async read(name: string, id: string): Promise<Type> {
    const { tableName } = getModelTableMap(name, this.modelMappings);

    // tslint:disable-next-line: await-promise
    const dbResult = await this.db.select().from(tableName).where('id', '=', id);
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot read ${name}`);
  }

  public async findAll(name: string): Promise<Type[]> {
    const { tableName } = getModelTableMap(name, this.modelMappings);

    // tslint:disable-next-line: await-promise
    const dbResult = await this.db.select().from(tableName);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`Cannot find all results for ${name}`);
  }

  public async findBy(name: string, filter: Type | AdvancedFilter): Promise<Type[]> {
    const { tableName } = getModelTableMap(name, this.modelMappings);

    // tslint:disable-next-line: await-promise
    const dbResult = await this.db.select().from(tableName).where(filter);
    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`No results for ${name} query and filter: ${JSON.stringify(filter)}`);
  }

  public async batchRead(name: string, relationField: string, ids: string[]): Promise<Type[][]> {
    const { tableName } = getModelTableMap(name, this.modelMappings);

    // tslint:disable-next-line: await-promise
    const dbResult = await this.db.select().from(tableName).whereIn(relationField, ids);

    if (dbResult) {

      const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
        return data[relationField].toString() === id.toString();
      }))

      return resultsById as [Type[]];
    }

    throw new NoDataError(`No results for ${name} and id: ${JSON.stringify(ids)}`);
  }

}
