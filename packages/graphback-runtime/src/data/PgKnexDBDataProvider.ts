import { getDatabaseArguments } from '@graphback/core';
import { GraphQLObjectType } from 'graphql';
import * as Knex from 'knex';
import { KnexDBDataProvider } from './KnexDBDataProvider';
import { NoDataError } from './NoDataError';

/**
 * Knex.js database data provider exposing basic CRUD operations.
 *
 * NOTE: This class implements Postgres specific implementaion that provides more performant object creation than generic `KnexDBDataProvider`
 * that works with the rest of the databases.
 */
// tslint:disable-next-line: no-any
export class PgKnexDBDataProvider<Type = any, GraphbackContext = any> extends KnexDBDataProvider<Type, GraphbackContext>{

    constructor(baseType: GraphQLObjectType, db: Knex) {
        super(baseType, db);
    }

    public async create(data: Type): Promise<Type> {
        const { data: createData } = getDatabaseArguments(this.tableMap, data);

        // tslint:disable-next-line: await-promise
        const dbResult = await this.db(this.tableName).insert(createData).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot create ${name}`);
    }
}
