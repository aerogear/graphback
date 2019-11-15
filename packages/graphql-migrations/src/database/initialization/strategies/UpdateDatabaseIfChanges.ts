import { DatabaseMigrater } from '../../../DatabaseMigrater';
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
  private databaseMigrater: DatabaseMigrater;
  constructor(databaseOptions: DatabaseStrategyOptions) {
    this.databaseMigrater = new DatabaseMigrater(databaseOptions)
  }

  public async init(): Promise<void> {
    await this.databaseMigrater.init();
  }
}
