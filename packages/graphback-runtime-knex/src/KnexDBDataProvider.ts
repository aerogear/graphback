import { buildModelTableMap, getDatabaseArguments, ModelTableMap, GraphbackContext, GraphbackDataProvider, GraphbackOrderBy, GraphbackPage, NoDataError, QueryFilter, ModelDefinition, FindByArgs } from '@graphback/core';
import * as Knex from 'knex';
import { buildQuery } from './knexQueryMapper';

/**
 * Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.
 * Layer is tested with following databases:
 *
 * - SQLite (by `SQLiteKnexDBDataProvider`)
 * - MySQL (MariaDB)
 * - Postgres
 *
 * NOTE: For SQLite use dedicated `SQLiteKnexDBDataProvider` that implements more speficic creation method to avoid the not supported `returning()`
 * statement.
 */
//tslint:disable-next-line: no-any
export class KnexDBDataProvider<Type = any> implements GraphbackDataProvider<Type> {
  protected db: Knex;
  protected tableName: string;
  protected tableMap: ModelTableMap;

  public constructor(model: ModelDefinition, db: Knex) {
    this.db = db;
    this.tableMap = buildModelTableMap(model.graphqlType);
    this.tableName = this.tableMap.tableName;
  }

  public async create(data: Type, selectedFields?: string[]): Promise<Type> {
    const { data: createData } = getDatabaseArguments(this.tableMap, data);
    //tslint:disable-next-line: await-promise
    const dbResult = await this.db(this.tableName).insert(createData).returning(this.getSelectedFields(selectedFields));
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${this.tableName}`);
  }

  public async update(data: Partial<Type>, selectedFields?: string[]): Promise<Type> {
    const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const updateResult = await this.db(this.tableName).update(updateData, this.getSelectedFields(selectedFields)).where(idField.name, '=', idField.value);
    if (updateResult && updateResult[0]) {
      return updateResult[0];
    }

    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  public async delete(data: Partial<Type>, selectedFields?: string[]): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const dbResult = await this.db(this.tableName).where(idField.name, '=', idField.value).delete(this.getSelectedFields(selectedFields));
    if (dbResult && dbResult[0]) {
      return dbResult[0];
    }
    throw new NoDataError(`Cannot delete ${this.tableName} with ${JSON.stringify(data)}`);
  }

  public async findOne(args: Partial<Type>, selectedFields?: string[]): Promise<Type> {
    let result: Type
    try {
      result = await this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(args).first();
    } catch (err) {
      throw new NoDataError(`Cannot find a result for ${this.tableName} with filter: ${JSON.stringify(args)}`)
    }

    return result
  }

  public async findBy(args?: FindByArgs, selectedFields?: string[]): Promise<Type[]> {
    let query = buildQuery(this.db, args?.filter).select(this.getSelectedFields(selectedFields)).from(this.tableName)

    if (args?.orderBy) {
      query = query.orderBy(args.orderBy.field, args.orderBy.order)
    }

    //tslint:disable-next-line: await-promise
    const dbResult = await this.usePage(query, args?.page);

    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(`No results for ${this.tableName} query and filter: ${JSON.stringify(args?.filter)}`);
  }

  public async count(filter?: QueryFilter): Promise<number> {
    const dbResult = await buildQuery(this.db, filter).from(this.tableName).count();
    const count: any = Object.values(dbResult[0])[0];

    return parseInt(count, 10);
  }

  public async batchRead(relationField: string, ids: string[], filter?: QueryFilter, selectedFields?: string[]): Promise<Type[][]> {
    const dbResult = await buildQuery(this.db, filter).select(this.getSelectedFields(selectedFields)).from(this.tableName).whereIn(relationField, ids);

    if (dbResult) {
      const resultsById = ids.map((id: string) => dbResult.filter((data: any) => {
        return data[relationField].toString() === id.toString();
      }))

      return resultsById as [Type[]];
    }

    throw new NoDataError(`No results for ${this.tableName} and id: ${JSON.stringify(ids)}`);
  }

  protected getSelectedFields(selectedFields: string[]) {
    return selectedFields?.length ? selectedFields : "*";
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
