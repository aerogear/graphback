import knex from 'knex';
import { MetadataProvider } from './MetadataProvider';
import { SchemaMigration } from './models';

interface TableDefinitions {
  migrations: 'pg_schema_migrations',
  tables: 'pg_tables'
}

export class KnexMetadataProvider implements MetadataProvider {
  // tslint:disable-next-line: no-any
  private db: knex<any, unknown[]>;
  private prefix: string;
  // tslint:disable-next-line: no-any
  private tables: any = {
    migrations: 'pg_schema_migrations',
    tables: 'pg_tables'
  };

  // tslint:disable-next-line: no-any
  constructor(db: knex<any, unknown[]>) {
    this.db = db;
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
