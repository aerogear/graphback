
import { migrateDB } from "graphql-migrations"

export interface MigrateConfig {
  knexdb: { database: string; dbConfig: any; };
}

export async function createDatabaseMigration(schema: string, config: MigrateConfig) {
  const dbConfig = {
    client: config.knexdb.database,
    connection: config.knexdb.dbConfig,
  };

  await migrateDB(dbConfig, schema);
}