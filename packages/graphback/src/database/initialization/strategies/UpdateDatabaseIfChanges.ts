import { Change } from '@graphql-inspector/core';
import { InputModelTypeContext } from '../../../input/ContextTypes';
import { DatabaseConnectionOptions } from '../../DatabaseConnectionOptions';
import { DatabaseContextProvider } from '../../migrations/DatabaseContextProvider';
import { DatabaseSchemaManager } from '../../migrations/DataResourcesManager';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';

/**
 * Database initialization strategy to only update the database schema if there are changes in the schema
 *
 * @export
 * @class UpdateDatabaseIfChanges
 * @implements {DatabaseInitializationStrategy}
 */
export class UpdateDatabaseIfChanges implements DatabaseInitializationStrategy {
  private schemaManager: DatabaseSchemaManager;
  constructor(databaseOptions: DatabaseConnectionOptions) {
    this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(context: DatabaseContextProvider, types: InputModelTypeContext[], changes: Change[]): Promise<void> {
    await this.schemaManager.createDatabaseResources(context, types);
    await this.schemaManager.updateDatabaseResources(context, types, changes);
    await this.schemaManager.createDatabaseRelations(context, types);
  }
}
