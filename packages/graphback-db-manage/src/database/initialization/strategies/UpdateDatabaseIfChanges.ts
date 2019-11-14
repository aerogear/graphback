import { InputModelTypeContext } from '@graphback/core';
import { Change } from '@graphql-inspector/core';
import { DatabaseStrategyOptions } from '../../DatabaseConnectionOptions';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';
import { DatabaseManager } from '../../../DatabaseManager';
import { MetadataProvider } from '../../../MetadataProvider';

/**
 * Database initialization strategy to only update the database schema if there are changes in the schema
 *
 * @export
 * @class UpdateDatabaseIfChanges
 * @implements {DatabaseInitializationStrategy}
 */
export class UpdateDatabaseIfChanges implements DatabaseInitializationStrategy {
  private databaseManager: DatabaseManager;
  constructor(databaseOptions: DatabaseStrategyOptions) {
    this.databaseManager = new DatabaseManager(databaseOptions)
  }

  public async init(): Promise<void> {
    await this.databaseManager.init();
  }
}
