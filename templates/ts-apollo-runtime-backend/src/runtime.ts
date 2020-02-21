
import { GraphbackRuntime, ModelDefinition, GraphbackGeneratorConfig } from 'graphback'
import { PgKnexDBDataProvider } from '@graphback/runtime-knex'
import { migrateDB } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { createDB, getGraphbackConfig, getMigrateConfig } from './db'
import { loadSchema } from './loadSchema';


/**
 * Override default runtime db to use Postgress
 */
class PGRuntime extends GraphbackRuntime {
  db: Knex<any, any[]>;

  constructor(schema: string, config: GraphbackGeneratorConfig, db: Knex) {
    super(schema, config);
    this.db = db;
  }

  protected createDBProvider(model: ModelDefinition) {
    return new PgKnexDBDataProvider(model.graphqlType, this.db);
  }
}

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async () => {
  const db = await createDB();
  const graphbackConfig = await getGraphbackConfig();
  const dbmigrationsConfig = await getMigrateConfig();
  const schemaText = loadSchema(graphbackConfig.model);

  // NOTE: For SQLite db should be always recreated
  const ops = await migrateDB(dbmigrationsConfig, schemaText);

  console.log("Migrated database", ops);

  const pubSub = new PubSub();
  const runtimeEngine = new PGRuntime(schemaText, graphbackConfig, db);
  // We use default datasource for everything
  const serviceOverrides = {};
  const runtime = runtimeEngine.buildRuntime(pubSub, serviceOverrides);

  return runtime;
}
