import { graphQLInputContext, InputModelTypeContext } from '@graphback/core';
import * as Knex from 'knex';
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
  constructor(client: string, connectionOptions: Knex.ConnectionConfig | Knex.Sqlite3ConnectionConfig) {
    this.schemaManager = new DatabaseSchemaManager(client, connectionOptions);
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
