import { graphQLInputContext, InputModelTypeContext } from '@graphback/core';
import * as knex from 'knex';
import { DatabaseContextProvider, DefaultDataContextProvider } from '../../migrations/DatabaseContextProvider';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';

/**
 * Database initialization strategy that will drop and recreate the database on every initialization.
 *
 * @export
 * @class DropCreateDatabaseAlways
 * @implements {DatabaseInitializationStrategy}
 */
export class DropCreateDatabaseAlways implements DatabaseInitializationStrategy {
  private schemaManager: DatabaseSchemaManager;
  private context: DatabaseContextProvider;
  // tslint:disable-next-line: no-any
  constructor(client: string, db: knex<any, unknown[]>) {
    this.schemaManager = new DatabaseSchemaManager(client, db);
    this.context = new DefaultDataContextProvider();
  }

  public async init(schemaText: string): Promise<void> {
    const types = graphQLInputContext.createModelContext(schemaText, {});
    const inputContext = types.filter((t: InputModelTypeContext) => t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

    await this.schemaManager.dropDatabaseSchema();
    await this.schemaManager.createDatabaseResources(this.context, inputContext);
    await this.schemaManager.createDatabaseRelations(this.context, inputContext);
  }
}
