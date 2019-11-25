import { gql } from 'apollo-server-core';
import {
  GraphQLBackendCreator,
  PgKnexDBDataProvider,
} from 'graphback';
import { migrate, UpdateDatabaseIfChanges } from 'graphql-migrations-bk';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import * as Knex from 'knex';
import * as jsonConfig from '../graphback.json'
import { loadSchema } from './loadSchema';

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {
  const schemaText = loadSchema(jsonConfig.folders.model);

  const backend = new GraphQLBackendCreator(schemaText, jsonConfig.graphqlCRUD);
  const dbClientProvider = new PgKnexDBDataProvider(client);

  const dbInitialization = new UpdateDatabaseIfChanges(client, jsonConfig.folders.migrations);

  await migrate(schemaText, dbInitialization);

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
