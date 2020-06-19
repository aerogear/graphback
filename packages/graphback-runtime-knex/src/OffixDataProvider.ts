import { getDatabaseArguments, GraphbackContext } from '@graphback/core';
import { NoDataError } from '@graphback/runtime'
import { GraphQLObjectType } from 'graphql';
import Knex from 'knex'
import { KnexDBDataProvider } from './KnexDBDataProvider';


/**
 * Data provider for offix that can throw conflict for edits
 * Note: this provider is still experimental not fully functional
 */
export class OffixDataProvider extends KnexDBDataProvider {
  public constructor(modelType: GraphQLObjectType, dbConfig: Knex) {
    super(modelType, dbConfig);
  }

  /**
   * @param data
   */
  public async update(data: any, context: GraphbackContext): Promise<any> {
    const { idField, data: updateData } = getDatabaseArguments(this.tableMap, data);
    //tslint:disable-next-line: await-promise
    const dbResult = await this.db.select([...context.graphback.options.selectedFields, 'version']).from(this.tableName).where(idField.name, '=', idField.value);
    if (dbResult && dbResult[0]) {
      if (data.version !== dbResult[0].version) {
        const conflictError: any = new Error();
        conflictError.conflictInfo = { serverState: dbResult, clientState: data };
        throw conflictError
      }

      //tslint:disable-next-line: await-promise
      const updateResult = await this.db(this.tableName).update(updateData).where(idField.name, '=', idField.value);
      if (updateResult === 1) {
        return dbResult[0]
      } else {
        throw new Error(`Update failed${this.tableName}`)
      }
    }
    throw new NoDataError(`Cannot update ${this.tableName}`);
  }

  // TODO Support for deletes
}
