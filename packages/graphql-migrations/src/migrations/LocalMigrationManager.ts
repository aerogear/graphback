import chalk from 'chalk';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ModelChange } from '../changes/ChangeTypes';
import { logError } from '../utils/log';
import { SchemaMigration } from './SchemaMigration';

const handleError = (err: { code: string; message: string; }, migrationId: string, fileName: string) => {
  if (err.code === 'ENOENT') {
    logError(`Directory for migration ${chalk.cyan(migrationId)} exists, but failed to execute. ${chalk.cyan(fileName)} file is missing.`)
  } else {
    logError(err.message)
  }
  process.exit(0)
}

/**
 * Manages migrations in the local file system
 *
 * @export
 * @class LocalMigrationManager
 */
export class LocalMigrationManager {
  private migrationsDir: string;
  constructor(migrationsDir: string) {
    this.migrationsDir = migrationsDir;
  }

  /**
   * Get all local migrations
   *
   * @returns {SchemaMigration[]}
   * @memberof LocalMigrationManager
   */
  public getMigrations(): SchemaMigration[] {
    if (!existsSync(this.migrationsDir)) {
      return [];
    }

    const subDirs = readdirSync(this.migrationsDir);

    return subDirs.map((migrationId: string) => {
      const migrationFolder = join(this.migrationsDir, migrationId);

      const sqlFile = `${migrationId}_up.sql`;
      const modelFile = 'model.graphql';
      const changesFile = 'changes.json';

      const sqlFilePath = join(migrationFolder, sqlFile);
      const modelFilePath = join(migrationFolder, modelFile);
      const changesFilePath = join(migrationFolder, changesFile);

      const schemaMigration: SchemaMigration = { id: migrationId };

      try {
        schemaMigration.sql_up = readFileSync(sqlFilePath, 'utf8');
      } catch (err) {
        handleError(err, migrationId, sqlFile);
      }

      try {
        schemaMigration.model = readFileSync(modelFilePath, 'utf8');
      } catch (err) {
        handleError(err, migrationId, modelFile);
      }

      try {
        const changes = readFileSync(changesFilePath, 'utf8');
        schemaMigration.changes = JSON.parse(changes);
      } catch (err) {
        handleError(err, migrationId, changesFile);
      }

      return schemaMigration;
    });
  }

  /**
   * Create a local migration, persisted as files in the migrations directory
   *
   * @param {SchemaMigration} migration
   * @memberof LocalMigrationManager
   */
  public createMigration(migration: SchemaMigration): void {
    const migrationPath = join(this.migrationsDir, migration.id.toString());

    if (!existsSync(migrationPath)) {
      mkdirSync(migrationPath, { recursive: true });
    }

    writeFileSync(join(migrationPath, `${migration.id}_up.sql`), migration.sql_up);
    writeFileSync(join(migrationPath, 'model.graphql'), migration.model);
    writeFileSync(join(migrationPath, 'changes.json'), migration.changes);
  }
}
