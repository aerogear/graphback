import { InputModelTypeContext } from '@graphback/core';
import { Change } from '@graphql-inspector/core';
import { DatabaseStrategyOptions } from '../../DatabaseConnectionOptions';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';

/**
 * Database initialization strategy to drop and recreate the database if there are changes to the schema
 *
 * @export
 * @class DropCreateDatabaseIfChanges
 * @implements {DatabaseInitializationStrategy}
 */
export class DropCreateDatabaseIfChanges implements DatabaseInitializationStrategy {
  private schemaManager: DatabaseSchemaManager;
  constructor(databaseOptions: DatabaseStrategyOptions) {
    // this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(): Promise<void> {
  }
}
