import { getDatabaseArguments, GraphbackContext, NoDataError } from '@graphback/core';
import * as Knex from 'knex';
import { GraphQLObjectType } from 'graphql';
import { KnexDBDataProvider } from './KnexDBDataProvider';

/**
 * Knex.js database data provider exposing basic CRUD operations.
 *
 * NOTE: This class implements Postgres specific implementaion that provides more performant object creation than generic `KnexDBDataProvider`
 * that works with the rest of the databases.
 */
//tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<Type = any> extends KnexDBDataProvider<Type> {

  public constructor(baseType: GraphQLObjectType, db: Knex) {
    super(baseType, db);
  }

  public async create(data: Type, context: GraphbackContext): Promise<Type> {
    const { data: createData } = getDatabaseArguments(this.tableMap, data);

    //tslint:disable-next-line: await-promise
    const dbResult = await this.db(this.tableName).insert(createData).returning(this.getSelectedFields(context));
    if (dbResult && dbResult[0]) {
      return dbResult[0]
    }
    throw new NoDataError(`Cannot create ${this.tableName}`);
  }
}
