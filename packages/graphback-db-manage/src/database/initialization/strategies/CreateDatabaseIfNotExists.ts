import { InputModelTypeContext } from '@graphback/core';
import { DatabaseConnectionOptions } from '../../DatabaseConnectionOptions';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';

/**
 * Database initialization strategy that will create a database on initialization - if one does not exist.
 *
 * @export
 * @class CreateDatabaseIfNotExists
 * @implements {DatabaseInitializationStrategy}
 */
export class CreateDatabaseIfNotExists implements DatabaseInitializationStrategy {
  private schemaManager: DatabaseSchemaManager;
  constructor(databaseOptions: DatabaseConnectionOptions) {
    this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(): Promise<void> {
    return Promise.resolve();
  }
}
