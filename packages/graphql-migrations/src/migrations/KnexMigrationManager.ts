import { InputModelFieldContext, InputModelTypeContext } from '@graphback/core';
import chalk from 'chalk';
// tslint:disable-next-line: match-default-export-name
import knex from 'knex';
import { ModelChange } from '../changes/ChangeTypes';
import { logError, logInfo } from '../utils/log';
import { SchemaMigration } from './SchemaMigration';
import { mapSchemaMigrationTypes } from './utils';

const handleError = (err: { code: string; message: string }) => {
  if (err.code === '42P07') {
    logError(err.message);
  }
  logError(err.message);
  process.exit(0);
}

/**
 * Manages remote migrations with Knex. Creates and applies migrations,
 * generates SQL scripts and creates metadata table
 *
 * @export
 * @class KnexMigrationManager
 */
export class KnexMigrationManager {
  // tslint:disable-next-line:typedef
  protected primitiveTypesMapping = {
    String: 'text',
    Int: 'integer',
    Float: 'float',
    Boolean: 'boolean',
  };

  // tslint:disable-next-line: no-any
  protected tables: any = {
    migrations: 'gb_schema_migrations',
    tables: 'gb_tables'
  };

  // tslint:disable-next-line: no-any
  protected db: knex<any, unknown[]>;
  // tslint:disable-next-line: no-any
  constructor(db: knex<any, unknown[]>) {
    this.db = db;
  }

  /**
   * Generates a SQL statement for creating a table
   *
   * @param {InputModelTypeContext} t
   * @returns {string}
   * @memberof KnexMigrationManager
   */
  public addTable(t: InputModelTypeContext): string {
    const tableName = t.name.toLowerCase();

    const sqlStatement = this.db.schema.createTable(
      tableName,
      (table: knex.TableBuilder) => {
        table.increments();
        for (const field of t.fields) {
          const method = this.primitiveTypesMapping[field.type];
          if (method) {
            table[method](field.name);
          }
        }
      }
    ).toQuery();

    return `${sqlStatement};`;
  }

  /**
   * Generates a SQL statement for altering a table
   *
   * @param {InputModelTypeContext}
   * @param {ModelChange[]} changes
   * @returns {string}
   * @memberof KnexMigrationManager
   */
  public alterTable(t: InputModelTypeContext, changes: ModelChange[]): string {
    const tableName = t.name.toLowerCase();
    const typeChanges = changes.filter((c: ModelChange) => c.path.type === t.name);

    const sqlStatement = this.db.schema.alterTable(
      tableName,
      (table: knex.TableBuilder) => {
        for (const change of typeChanges) {
          const field = t.fields.find((f: InputModelFieldContext) => f.name === change.path.field);
          const method = this.primitiveTypesMapping[field.type];

          if (method) {
            table[method](field.name)
              ;
          }
        }
      }
    ).toQuery();

    return `${sqlStatement};`;
  }

  /**
   * Saves a migration to the database
   *
   * @param {SchemaMigration} migration
   * @returns {Promise<void>}
   * @memberof KnexMigrationManager
   */
  public async createMigration(migration: SchemaMigration): Promise<void> {
    try {
      // tslint:disable-next-line: await-promise
      await this.db.table(this.tables.migrations).insert(migration);
    } catch (err) {
      handleError(err);
    }

    return Promise.resolve();
  }

  /**
   * Create migration metadata table(s)
   *
   * @returns {Promise<void>}
   * @memberof KnexMigrationManager
   */
  public async createMetadataTables(): Promise<void> {
    const hasTable = await this.db.schema.hasTable(this.tables.migrations);

    if (!hasTable) {
      try {
        // tslint:disable-next-line: await-promise
        await this.db.schema.createTable(this.tables.migrations, (table: knex.TableBuilder) => {
          table.bigInteger('id').primary();
          table.timestamp('applied_at').nullable();
          table.text('model').notNullable();
          table.json('changes').nullable();
          table.text('sql_up').nullable();
        });

        logInfo('Created migrations table');
      } catch (err) {
        logError(err);
      }
    }

    return Promise.resolve();
  }

  /**
   * Applies a migration to the database
   *
   * @param {SchemaMigration} migration
   * @returns {Promise<void>}
   * @memberof KnexMigrationManager
   */
  public async applyMigration(migration: SchemaMigration): Promise<void> {
    try {
      // tslint:disable-next-line: await-promise
      await this.db.raw(migration.sql_up);

      logInfo(`Executed migration ${chalk.cyan(migration.id.toString())}`)
    } catch (err) {
      handleError(err);
    }

    const now = new Date();

    try {
      // tslint:disable-next-line: await-promise
      await this.db(this.tables.migrations).where({ id: migration.id }).update({ applied_at: now });
    } catch (err) {
      handleError(err);
    }

    return Promise.resolve();
  }

  /**
   * Fetch all migrations from the database
   *
   * @returns {Promise<SchemaMigration[]>}
   * @memberof KnexMigrationManager
   */
  public async getMigrations(): Promise<SchemaMigration[]> {
    let migrations: SchemaMigration[] = [];
    try {
      // tslint:disable-next-line: await-promise
      migrations = await this.db.select().from(this.tables.migrations);
    } catch (err) {
      handleError(err);
    }

    const mappedValues = mapSchemaMigrationTypes(migrations);

    return Promise.resolve(mappedValues);
  }
}
