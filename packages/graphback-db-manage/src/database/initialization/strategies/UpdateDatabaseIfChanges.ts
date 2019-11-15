import { DatabaseManager } from '../../../DatabaseManager';
import { DatabaseStrategyOptions } from '../../DatabaseConnectionOptions';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';

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
