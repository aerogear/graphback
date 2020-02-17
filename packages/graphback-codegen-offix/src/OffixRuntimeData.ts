import { PgKnexDBDataProvider, NoDataError } from "@graphback/runtime"
import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments } from '@graphback/core';


export class OffixDataProvider extends PgKnexDBDataProvider {
    public constructor(baseType: GraphQLObjectType, db: any) {
        super(baseType, db);
    }

    public async update(data: any): Promise<any> {
        const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);
        //tslint:disable-next-line: await-promise
        const dbResult = await this.db.select().from(this.tableName).where(idField.name, '=', idField.value);
        if (dbResult && dbResult[0]) {
            if (data.version !== dbResult[0].version) {
                throw { conflictInfo: { serverState: dbResult, clientState: data } }
            }

            //tslint:disable-next-line: await-promise
            const updateResult = await this.db(this.tableName).update(updateData).where(idField.name, '=', idField.value);
            if (updateResult === 1) {
                return dbResult[0]
            }
        }
        throw new NoDataError(`Cannot update ${this.tableName}`);
    }
}