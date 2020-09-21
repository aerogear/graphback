import { getDatabaseArguments, NoDataError, ModelDefinition } from '@graphback/core';
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

  public async update(data: Partial<Type>, selectedFields?: string[]): Promise<Type> {
    const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const updateResult = await this.db(this.tableName).update(updateData).where(idField.name, '=', idField.value);
    if (updateResult === 1) {
      //tslint:disable-next-line: await-promise
      const dbResult = await this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(idField.name, '=', idField.value);
      if (dbResult && dbResult[0]) {
        return dbResult[0]
      }
    }
    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  public async delete(data: Partial<Type>, selectedFields?: string[]): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const beforeDelete = await this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(idField.name, '=', idField.value);
    //tslint:disable-next-line: await-promise
    const dbResult = await this.db(this.tableName).where(idField.name, '=', idField.value).del()
    if (dbResult && beforeDelete[0]) {
      return beforeDelete[0];
    }
    throw new NoDataError(`Cannot delete ${this.tableName} with ${JSON.stringify(data)}`);
  }
}
