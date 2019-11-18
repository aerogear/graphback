import { gql } from 'apollo-server-core';
import {
  GraphQLBackendCreator,
  InputModelProvider,
  PgKnexDBDataProvider,
  UpdateDatabaseIfChanges
} from 'graphback';
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
  const schemaProvider = new InputModelProvider(jsonConfig.folders.model);
  const backend = new GraphQLBackendCreator(schemaProvider, jsonConfig.graphqlCRUD);
  const dbClientProvider = new PgKnexDBDataProvider(client);

  const dbInitialization = new UpdateDatabaseIfChanges(client, jsonConfig.folders.migrations);

  await migrate(schemaProvider.getSchemaText(), dbInitialization);

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
