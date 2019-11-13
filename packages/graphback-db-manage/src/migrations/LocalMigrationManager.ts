import { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { SchemaMigration } from '../models';
import { join } from 'path';

export class LocalMigrationManager {
  private migrationsDir: string;
  constructor(migrationsDir: string) {
    this.migrationsDir = migrationsDir;
  }

  public getMigrations(): SchemaMigration[] {
    if (!existsSync(this.migrationsDir)) {
      return [];
    }

    const subDirs = readdirSync(this.migrationsDir);

    return subDirs.map((dir: string) => {
      const migrationFolder = join(this.migrationsDir, dir);

      const sqlUp = readFileSync(join(migrationFolder, `${dir}_up.sql`), 'utf8');
      const model = readFileSync(join(migrationFolder, 'model.graphql'), 'utf8');
      const changes = readFileSync(join(migrationFolder, 'changes.json'), 'utf8');

      return {
        id: dir,
        model,
        changes,
        sql_up: sqlUp
      }
    });
  }

  public createMigration(migration: SchemaMigration): void {
    const migrationPath = join(this.migrationsDir, migration.id);

    if (!existsSync(migrationPath)) {
      mkdirSync(migrationPath, { recursive: true });
    }

    writeFileSync(join(migrationPath, `${migration.id}_up.sql`), migration.sql_up);
    writeFileSync(join(migrationPath, 'model.graphql'), migration.model);
    writeFileSync(join(migrationPath, 'changes.json'), migration.changes);
  }
}
