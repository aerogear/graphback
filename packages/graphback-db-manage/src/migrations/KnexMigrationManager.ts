import { InputModelTypeContext, InputModelFieldContext } from '@graphback/core';
import { ModelChange } from '../changes/ChangeTypes';
import knex from 'knex';
import { SchemaMigration } from '../models';
import { logInfo, logError } from '../utils/log';
import chalk from 'chalk';

const handleError = (err: { code: string; message: string }) => {
  if (err.code === '42P07') {
    logError(err.message);
  }
  logError(err.message);
  process.exit(0);
}

// TODO: Document exported classes
export class KnexMigrationManager {
  // tslint:disable-next-line:typedef
  protected primitiveTypesMapping = {
    String: 'string',
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
        table.timestamps();
      },
    ).toQuery();

    return `${sqlStatement};`;
  }

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
            table[method](field.name);
          }
        }
      }
    ).toQuery();

    return `${sqlStatement};`;
  }

  public async createMigration(migration: SchemaMigration): Promise<void> {
    try {
      // tslint:disable-next-line: await-promise
      await this.db.table(this.tables.migrations).insert(migration);
    } catch (err) {
      handleError(err);
    }

    return Promise.resolve();
  }

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
          table.timestamp('rollback_at').nullable();

          logInfo('Created migrations table');
        });
      } catch (err) {
        logError(err.code);
      }

    }

    return Promise.resolve();
  }

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
      handleError(err.code);
    }

    return Promise.resolve();
  }

  public async getMigrations(): Promise<SchemaMigration[]> {
    let migrations: SchemaMigration[] = [];
    try {
      // tslint:disable-next-line: await-promise
      migrations = await this.db.select().from(this.tables.migrations);
    } catch (err) {
      handleError(err);
    }

    return Promise.resolve(migrations);
  }
}
