import { getDatabaseArguments, GraphbackContext, NoDataError, ModelDefinition } from '@graphback/core';
import * as Knex from 'knex';
import { KnexDBDataProvider } from './KnexDBDataProvider';

/**
 * Knex.js database data provider exposing basic CRUD operations.
 *
 * NOTE: This class implements SQLite specific implementaion
 */
//tslint:disable-next-line: no-any
export class SQLiteKnexDBDataProvider<Type = any> extends KnexDBDataProvider<Type>{

  public constructor(model: ModelDefinition, db: Knex) {
    super(model, db);
  }

  public async create(data: Type, selectedFields?: string[]): Promise<Type> {
    const { data: createData } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const [id] = await this.db(this.tableName).insert(createData);
    //tslint:disable-next-line: await-promise
    const dbResult = await this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(this.tableMap.idField, '=', id)
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${this.tableName}`);
  }
}
