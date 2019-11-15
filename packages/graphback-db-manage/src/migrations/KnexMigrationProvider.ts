import { MigrationProvider } from './MigrationProvider';
import * as knex from 'knex';
import { SchemaMigration } from '../migrations/SchemaMigration';
import { KnexMigrationManager } from './KnexMigrationManager';
import { LocalMigrationManager } from './LocalMigrationManager';

export class KnexMigrationProvider implements MigrationProvider {
  private migrationsDir: string;
  private knexMigrationManager: KnexMigrationManager;
  private localMigrationManager: LocalMigrationManager;
  constructor(db: knex<any, unknown[]>, migrationsDir: string) {
    this.migrationsDir = migrationsDir;
    this.knexMigrationManager = new KnexMigrationManager(db);
    this.localMigrationManager = new LocalMigrationManager(migrationsDir);
  }

  public async getMigrations(): Promise<SchemaMigration[]> {
    const remoteMigrations: SchemaMigration[] = await this.knexMigrationManager.getMigrations();
    const localMigrations: SchemaMigration[] = this.localMigrationManager.getMigrations();

    const unstagedMigrations = localMigrations.filter((l: SchemaMigration) => !remoteMigrations.find((r: SchemaMigration) => r.id === l.id));

    for (const migration of unstagedMigrations) {
      await this.createMigration(migration);
    }

    return Promise.resolve(remoteMigrations);
  }

  public applyMigration(migration: SchemaMigration): Promise<void> {
    this.knexMigrationManager.applyMigration(migration);

    return Promise.resolve();
  }

  public async createMigration(migration: SchemaMigration): Promise<void> {
    this.localMigrationManager.createMigration(migration);
    await this.knexMigrationManager.createMigration(migration);
  }
}
