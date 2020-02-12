import { makeExecutableSchema } from 'apollo-server-express';
import { GraphbackRuntime, ModelDefinition, PgKnexDBDataProvider } from 'graphback'
import { printSchema } from 'graphql';
import { migrateDB } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { createDB, getConfig } from './db'
import { loadSchema } from './loadSchema';
import Knex = require('knex');


/**
 * Override default runtime db to use Postgress
 */
class PGRuntime extends GraphbackRuntime{
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

  const dbConfig = {
    client: graphbackConfig.dbmigrations.database,
    connection: graphbackConfig.dbmigrations.dbConfig,
  }

  migrateDB(dbConfig, schemaText).then((ops) => {
    console.log("Migrated database", ops);
  });

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
