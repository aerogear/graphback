import { gql } from 'apollo-server-core';
import {
  GraphQLBackendCreator,
  PgKnexDBDataProvider,
} from 'graphback';
import { printSchema } from 'graphql';
import { loadConfig } from 'graphql-config';
import { migrate } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import * as Knex from 'knex';
import * as jsonConfig from '../graphback.json'

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {

  // load input schema from config
  const config = await loadConfig({});
  const schema = await config!.getDefault().getSchema();

  const schemaText = printSchema(schema);

  const backend = new GraphQLBackendCreator(schemaText, jsonConfig.graphqlCRUD);
  const dbClientProvider = new PgKnexDBDataProvider(client);

  await migrate(schemaText, client, { migrationsDir: jsonConfig.folders.migrations });

  const pubSub = new PubSub();
  const runtime = await backend.createRuntime(dbClientProvider, pubSub);
  const generatedSchema = runtime.schema;

  const executableSchema = makeExecutableSchema({
    typeDefs: gql`${generatedSchema}`,
    resolvers: runtime.resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
  return executableSchema;
}
