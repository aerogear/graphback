import { SchemaMigration } from './SchemaMigration';

/**
 * Map values to their true types
 *
 * @export
 * @param {SchemaMigration[]} migrations
 * @returns
 */
export function mapSchemaMigrationTypes(migrations: SchemaMigration[]) {
  return migrations.map((m: SchemaMigration) => {
    return {
      ...m,
      id: Number(m.id)
    };
  });
}

/**
 * For each local migration, find the ones that do not exist in the database
 *
 * @export
 * @param {SchemaMigration[]} localMigrations
 * @param {SchemaMigration[]} remoteMigrations
 * @returns {SchemaMigration[]}
 */
export function findMigrationsToApply(localMigrations: SchemaMigration[], remoteMigrations: SchemaMigration[]): SchemaMigration[] {
  return localMigrations.filter((l: SchemaMigration) => {
    return !remoteMigrations.find((r: SchemaMigration) => r.id === l.id);
  });
}

/**
 * Get the changes from schema migrations
 *
 * @export
 * @param {SchemaMigration[]} migrations
 * @returns {string[]}
 */
export function getChanges(migrations: SchemaMigration[]): string[] {
  return [].concat(...migrations.map((m: SchemaMigration) => m.changes));
}
