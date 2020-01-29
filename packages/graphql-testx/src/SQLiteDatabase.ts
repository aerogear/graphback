import Knex from "knex";
import { KnexDBDataProvider, GraphbackDataProvider } from "@graphback/runtime";
import {
  DropCreateDatabaseAlways,
  migrateDBUsingSchema
} from "graphql-migrations";
import knexCleaner from "knex-cleaner";
import { DatabaseSchema, Database, DatabaseImportData } from "./Database";

/**
 * The default implementation for the Database interface.
 *
 * This object is compatible only with sqlite.
 */
export class SQLiteDatabase implements Database {
  protected readonly knex: Knex;
  protected readonly provider: KnexDBDataProvider;

  constructor(knex: Knex) {
    this.knex = knex;
    knex();
    this.provider = new KnexDBDataProvider(knex);
  }

  public getProvider(): GraphbackDataProvider {
    return this.provider;
  }

  public getKnex(): Knex {
    return this.knex;
  }

  public async clean(): Promise<void> {
    await knexCleaner.clean(this.knex);
  }

  public async getSchema(): Promise<DatabaseSchema> {
    const tables = await this.getTables();
    const schema: DatabaseSchema = {};
    for (const table of tables) {
      schema[table] = Object.keys(await this.knex(table).columnInfo());
    }
    return schema;
  }

  public async importData(data: DatabaseImportData): Promise<void> {
    await this.clean();
    const tables = await this.getTables();
    for (const table of tables) {
      if (data[table]) {
        await this.knex(table).insert(data[table]);
      }
    }
  }

  public async close(): Promise<void> {
    await this.knex.destroy();
  }

  protected async getTables(): Promise<string[]> {
    return (await this.knex("sqlite_master").where("type", "table"))
      .map(x => x.name)
      .filter(x => !x.includes("sqlite"));
  }
}

export async function sqliteInMemoryDatabaseBuilder(
  schema: string
): Promise<SQLiteDatabase> {
  // initialize the knex db
  const knex = Knex({
    client: "sqlite3",
    connection: { filename: ":memory:" }
  });

  // migrate the schema
  const strategy = new DropCreateDatabaseAlways("sqlite3", knex);
  await migrateDBUsingSchema(schema, strategy);

  return new SQLiteDatabase(knex);
}
