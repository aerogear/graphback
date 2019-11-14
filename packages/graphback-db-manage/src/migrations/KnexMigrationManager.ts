import { InputModelTypeContext, InputModelFieldContext } from '@graphback/core';
import { MigrationProvider } from '../providers/MigrationProvider';
import { ModelChange } from '../changes/ChangeTypes';
import knex from 'knex';
import { connect } from '../utils/knexUtils';
import { SchemaMigration } from '../models';

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
    // TODO: Don't hard code table name conversion
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
    // TODO: Should this be filtered before passed as an arg??
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
    await this.db.table(this.tables.migrations).insert(migration);

    return Promise.resolve();
  }

  public async createMetadataTables(): Promise<void> {
    if (!await this.db.schema.hasTable(this.tables.migrations)) {
      await this.db.schema.createTable(this.tables.migrations, (table: knex.TableBuilder) => {
        table.string('id').primary();
        table.timestamp('applied_at').nullable();
        table.text('model').notNullable();
        table.json('changes').nullable();
        table.text('sql_up').nullable();
        table.text('sql_down').nullable();
        table.timestamp('rollback_at').nullable();
      });
    }

    if (!await this.db.schema.hasTable(this.tables.tables)) {
      await this.db.schema.createTable(this.tables.tables, (table: knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('schema');
        table.string('name');
        table.json('fields');
      });
    }

    return Promise.resolve();
  }

  public async applyMigration(migration: SchemaMigration): Promise<void> {
    await this.db.raw(migration.sql_up);

    await this.db(this.tables.migrations).where({ id: migration.id }).update({ applied_at: new Date() });

    return Promise.resolve();
  }

   public async getMigrations(): Promise<SchemaMigration[]> {
    const migrations: SchemaMigration[] = await this.db.select().from(this.tables.migrations);

    return Promise.resolve(migrations);
  }
}
