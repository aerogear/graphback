import { findModelTableMap, ModelTableMap } from '@graphback/core';
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

    constructor(db: Knex, modelTablesMap: ModelTableMap[]) {
        super(db, modelTablesMap);
    }

    public async create(name: string, data: Type): Promise<Type> {
        const { tableName } = findModelTableMap(name, this.modelMappings);

        // tslint:disable-next-line: await-promise
        const dbResult = await this.db(tableName).insert(data).returning('*');
        if (dbResult && dbResult[0]) {
            return dbResult[0]
        }
        throw new NoDataError(`Cannot create ${name}`);
    }
}
