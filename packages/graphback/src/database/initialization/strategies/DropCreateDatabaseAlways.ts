import { InputModelTypeContext } from '../../../input/ContextTypes';
import { DatabaseConnectionOptions } from '../../DatabaseConnectionOptions';
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
  constructor(databaseOptions: DatabaseConnectionOptions) {
    this.schemaManager = new DatabaseSchemaManager(databaseOptions.client, databaseOptions.connectionOptions);
  }

  public async init(context: DatabaseContextProvider, types: InputModelTypeContext[]): Promise<void> {
    await this.schemaManager.dropDatabaseSchema();
    await this.schemaManager.createDatabaseResources(context, types);
    await this.schemaManager.createDatabaseRelations(context, types);
  }
}
