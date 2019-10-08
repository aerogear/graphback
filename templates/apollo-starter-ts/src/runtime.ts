import { gql } from 'apollo-server-core';
import { GraphQLBackendCreator, PgKnexDBDataProvider } from 'graphback';
import { makeExecutableSchema } from 'graphql-tools';

// Runtime test
import Knex = require('knex');
import * as jsonConfig from '../graphback.json'

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {
    const runtimeSchema = `
    type User {
      id: ID!
      name: String
    }`
    const backend = new GraphQLBackendCreator(runtimeSchema, jsonConfig.graphqlCRUD);
    const dbClientProvider = new PgKnexDBDataProvider(client);
    const runtime = await backend.createRuntime(dbClientProvider);
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