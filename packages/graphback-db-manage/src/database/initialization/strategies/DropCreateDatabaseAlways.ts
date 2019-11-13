import { InputModelTypeContext } from '@graphback/core';
import { DatabaseStrategyOptions } from '../../DatabaseConnectionOptions';
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
  constructor(databaseOptions: DatabaseStrategyOptions) {
    // this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(): Promise<void> {
  }
}
