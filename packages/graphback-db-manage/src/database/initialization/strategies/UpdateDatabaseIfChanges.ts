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
  private DatabaseMigrater: DatabaseMigrater;
  constructor(databaseOptions: DatabaseStrategyOptions) {
    this.DatabaseMigrater = new DatabaseMigrater(databaseOptions)
  }

  public async init(): Promise<void> {
    await this.DatabaseMigrater.init();
  }
}
