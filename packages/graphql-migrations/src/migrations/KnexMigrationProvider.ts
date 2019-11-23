import chalk from 'chalk';
import * as knex from 'knex';
import { logError } from '../utils/log';
import { KnexMigrationManager } from './KnexMigrationManager';
import { LocalMigrationManager } from './LocalMigrationManager';
import { MigrationProvider } from './MigrationProvider';
import { SchemaMigration } from './SchemaMigration';
import { findMigrationsToApply } from './utils';

/**
 * Fetch and apply remote migration using Knex as a database client
 *
 * @export
 * @class KnexMigrationProvider
 * @implements {MigrationProvider}
 */
export class KnexMigrationProvider implements MigrationProvider {
  private knexMigrationManager: KnexMigrationManager;
  private localMigrationManager: LocalMigrationManager;
  // tslint:disable-next-line: no-any
  constructor(db: knex<any, unknown[]>, migrationsDir: string) {
    this.knexMigrationManager = new KnexMigrationManager(db);
    this.localMigrationManager = new LocalMigrationManager(migrationsDir);
  }

  public async getMigrations(): Promise<SchemaMigration[]> {
    let remoteMigrations: SchemaMigration[] = await this.knexMigrationManager.getMigrations();
    const localMigrations: SchemaMigration[] = this.localMigrationManager.getMigrations();

    const unstagedMigrations = findMigrationsToApply(localMigrations, remoteMigrations);

    for (const migration of unstagedMigrations) {
      await this.createMigration(migration);
    }

    remoteMigrations = await this.knexMigrationManager.getMigrations();

    return Promise.resolve(remoteMigrations);
  }

  /**
   * Apply a migration by updating the database schema
   *
   * @param {SchemaMigration} migration
   * @returns {Promise<void>}
   * @memberof KnexMigrationProvider
   */
  public async applyMigration(migration: SchemaMigration): Promise<void> {
    try {
      await this.knexMigrationManager.applyMigration(migration);
    } catch (err) {
      logError(`Failed to execute migration ${chalk.cyan(migration.id.toString())} - ${err.message}`)
    }

    return Promise.resolve();
  }

  /**
   * Create a migration. Generates migration files
   * in the local project and in the remote database
   *
   * @param {SchemaMigration} migration
   * @returns {Promise<void>}
   * @memberof KnexMigrationProvider
   */
  public async createMigration(migration: SchemaMigration): Promise<void> {
    try {
      await this.knexMigrationManager.createMigration(migration);
    } catch (err) {
      logError(`Failed to create migration ${chalk.cyan(migration.id.toString())} - ${err.message}`)
    }
  }
}
