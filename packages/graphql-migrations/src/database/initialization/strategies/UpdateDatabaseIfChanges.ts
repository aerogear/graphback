import * as knex from 'knex';
import { DatabaseMigrater } from '../../../DatabaseMigrater';
import { DatabaseInitializationStrategy } from '../DatabaseInitializationStrategy';

/**
 * Database initialization strategy to only update the database schema if there are changes in the schema
 *
 * @export
 * @class UpdateDatabaseIfChanges
 * @implements {DatabaseInitializationStrategy}
 */
export class UpdateDatabaseIfChanges implements DatabaseInitializationStrategy {
  // tslint:disable-next-line: no-any
  private db: knex<any, unknown[]>;
  private migrationsDir: string;
  // tslint:disable-next-line: no-any
  constructor(db: knex<any, unknown[]>, migrationsDir?: string) {
    this.db = db;
    this.migrationsDir = migrationsDir;
  }

  public async init(schemaText: string): Promise<void> {
    const migrater = new DatabaseMigrater(schemaText, this.db, this.migrationsDir)
    await migrater.init();
  }
}
