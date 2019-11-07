import { InputModelTypeContext, InputModelFieldContext } from '@graphback/core';
import { SchemaMigrationProvider } from './SchemaMigrationProvider';
import { GraphbackChange } from '../changes/ChangeTypes';
import knex from 'knex';
import { connect } from '../utils/knexUtils';
import { SchemaMigration } from '../models';

export class KnexMigrationManager implements SchemaMigrationProvider {
  // tslint:disable-next-line:typedef
  private primitiveTypesMapping = {
    String: 'string',
    Int: 'integer',
    Float: 'float',
    Boolean: 'boolean',
  };

  // tslint:disable-next-line: no-any
  private tables: any = {
    migrations: 'pg_schema_migrations',
    tables: 'pg_tables'
  };

  // tslint:disable-next-line: no-any
  private db: knex<any, unknown[]>;
  // tslint:disable-next-line: no-any
  constructor(client: string, connectionOptions: any) {
    this.db = connect(client, connectionOptions)
  }

  public addTable(t: InputModelTypeContext): string {
    // TODO: Don't hard code table name conversion
    const tableName = t.name.toLowerCase();

    return this.db.schema.createTable(
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
  }

  public alterTable(t: InputModelTypeContext, changes: GraphbackChange[]): string {
    const tableName = t.name.toLowerCase();
    // TODO: Should this be filtered before passed as an arg??
    const typeChanges = changes.filter((c: GraphbackChange) => c.path.type === t.name);

    return this.db.schema.alterTable(
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
  }

  public async getMigrations(): Promise<SchemaMigration[]> {
    const migrations: SchemaMigration[] = await this.db.select().from(this.tables.migrations);

    return Promise.resolve(migrations);
  }

  public async createMigration(migration: SchemaMigration): Promise<void> {
    await this.db.table(this.tables.migrations).insert(migration);

    return Promise.resolve();
  }

  public async createMetadataTables(): Promise<void> {
    if (!await this.db.schema.hasTable(this.tables.migrations)) {
      await this.db.schema.createTable(this.tables.migrations, (table: knex.TableBuilder) => {
        table.increments('id').primary();
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
}
