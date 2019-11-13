import { gql } from 'apollo-server-core';
import {
  GraphQLBackendCreator,
  InputModelProvider,
  PgKnexDBDataProvider,
  UpdateDatabaseIfChanges,
  KnexMigrationProvider
} from 'graphback';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import * as jsonConfig from '../graphback.json'
import * as Knex from 'knex';

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {
  const schemaProvider = new InputModelProvider(jsonConfig.folders.model);
  const backend = new GraphQLBackendCreator(schemaProvider, jsonConfig.graphqlCRUD);
  const dbClientProvider = new PgKnexDBDataProvider(client);

  const migrationProvider = new KnexMigrationProvider(client, jsonConfig.folders.migrations);

  const databaseInitializationStrategy = new UpdateDatabaseIfChanges({
    db: client,
    schemaProvider,
    migrationProvider
  });

  await backend.initializeDatabase(databaseInitializationStrategy);
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
