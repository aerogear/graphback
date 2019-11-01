import { gql } from 'apollo-server-core';
import {
  DatabaseConnectionOptions,
  DatabaseInitializationStrategy,
  DropCreateDatabaseIfChanges,
  GraphQLBackendCreator,
  InputModelProvider,
  PgKnexDBDataProvider,
  UpdateDatabaseIfChanges
} from 'graphback';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import * as Knex from 'knex';
import * as jsonConfig from '../graphback.json.js'

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {
  const schemaContext = new InputModelProvider(jsonConfig.folders.migrations, jsonConfig.folders.model);
  const backend = new GraphQLBackendCreator(schemaContext, jsonConfig.graphqlCRUD);
  const dbClientProvider = new PgKnexDBDataProvider(client);

  const databaseInitializationStrategy = new UpdateDatabaseIfChanges({
    client: jsonConfig.db.database,
    connectionOptions: jsonConfig.db.dbConfig
  });

  const pubSub = new PubSub();
  const runtime = await backend.createRuntime(dbClientProvider, pubSub, databaseInitializationStrategy);
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
