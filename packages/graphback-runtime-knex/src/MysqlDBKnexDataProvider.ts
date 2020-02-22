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
//tslint:disable-next-line: no-any
export class MysqlDBKnexDBDataProvider<Type = any, GraphbackContext = any> extends KnexDBDataProvider<Type, GraphbackContext>{


    public constructor(baseType: GraphQLObjectType, db: Knex) {
        super(baseType, db);
    }

    public async create(data: Type): Promise<Type> {

        const { data: createData } = getDatabaseArguments(this.tableMap, data);

        // check availability of the table
        const result = await this.db(this.tableName).columnInfo().then();

        if(Object.keys(result).length == 0){
            //creating table
            const tableRes:any = await this.db.schema.createTable(this.tableName, function (table) {
                table.increments();
                Object.keys(createData).forEach(colomn => {
                    table.string(colomn);
                });
              }).then();

            if(!tableRes){
               throw new NoDataError(`Cannot create ${this.tableName}`);
            }
        }
    
        //tslint:disable-next-line: await-promise
        const [id] = await this.db.insert(data).into(this.tableName)
        const dbResult = await this.db.select().from(this.tableName).where(this.tableMap.idField, '=', id)
        if (dbResult && dbResult[0]) {
           return dbResult[0]
        }
        throw new NoDataError(`Cannot create ${this.tableName}`);
    }
}
