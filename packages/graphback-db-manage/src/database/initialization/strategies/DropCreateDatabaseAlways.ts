import { InputModelTypeContext, filterObjectTypes } from '@graphback/core';
import * as Knex from 'knex';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
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
  constructor(client: string, connectionOptions: Knex.ConnectionConfig | Knex.Sqlite3ConnectionConfig) {
    this.schemaManager = new DatabaseSchemaManager(client, connectionOptions);
  }

  public async init(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void> {
    const inputContext = types.filter((t: InputModelTypeContext) => t.name !== 'Query' && t.name !== 'Mutation' && t.name !== 'Subscription')

    await this.schemaManager.dropDatabaseSchema();
    await this.schemaManager.createDatabaseResources(context, inputContext);
    await this.schemaManager.createDatabaseRelations(context, inputContext);
  }
}
