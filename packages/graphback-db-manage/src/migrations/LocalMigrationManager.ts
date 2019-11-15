import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { SchemaMigration } from '../migrations/SchemaMigration';
import { join } from 'path';
import { logError } from '../utils/log';
import chalk from 'chalk';

const handleError = (err: { code: string; message: string; }, migrationId: string, fileName: string) => {
  if (err.code === 'ENOENT') {
    logError(`Directory for migration ${chalk.cyan(migrationId)} exists, but failed to execute. ${chalk.cyan(fileName)} file is missing.`)
  } else {
    logError(err.message)
  }
  process.exit(0)
}

export class LocalMigrationManager {
  private migrationsDir: string;
  constructor(migrationsDir: string) {
    this.migrationsDir = join(process.cwd(), migrationsDir);
  }

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
        schemaMigration.changes = readFileSync(changesFilePath, 'utf8');
      } catch (err) {
        handleError(err, migrationId, changesFile);
      }

      return schemaMigration;
    });
  }

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
