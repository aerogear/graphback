import { Change } from '@graphql-inspector/core';
import { InputModelTypeContext } from '../../../input/ContextTypes';
import { DatabaseConnectionOptions } from '../../DatabaseConnectionOptions';
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
  constructor(databaseOptions: DatabaseConnectionOptions) {
    this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(context: DatabaseContextProvider, types: InputModelTypeContext[], changes: Change[]): Promise<void> {
    if (changes.length > 0) {
      await this.schemaManager.dropDatabaseSchema();
      await this.schemaManager.createDatabaseResources(context, types);
      await this.schemaManager.createDatabaseRelations(context, types);
    }
  }
}
