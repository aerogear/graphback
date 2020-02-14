import { makeExecutableSchema } from 'apollo-server-express';
import { GraphbackRuntime, ModelDefinition, PgKnexDBDataProvider } from 'graphback'
import { printSchema } from 'graphql';
import { migrateDB } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { createDB, getConfig } from './db'
import { loadSchema } from './loadSchema';


/**
 * Override default runtime db to use Postgress
 */
class PGRuntime extends GraphbackRuntime {
  protected createDBProvider(model: ModelDefinition, db: Knex) {
    return new PgKnexDBDataProvider(model.graphqlType, db);
  }
}

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async () => {
  const db = await createDB();
  const graphbackConfig = await getConfig();
  const schemaText = loadSchema(graphbackConfig.model);

  // NOTE: For SQLite db should be always recreated
  const ops = await migrateDB(graphbackConfig.dbmigrations, schemaText);

  console.log("Migrated database", ops);

  const pubSub = new PubSub();
  const runtimeEngine = new PGRuntime(schemaText, graphbackConfig);
  const runtime = runtimeEngine.buildRuntime(db, pubSub, {});

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(runtime.schema),
    resolvers: runtime.resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  return executableSchema;
}
