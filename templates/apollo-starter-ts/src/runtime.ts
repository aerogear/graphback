import { gql } from 'apollo-server-core';
import { readFileSync } from "fs";
import { GraphQLBackendCreator, PgKnexDBDataProvider } from 'graphback';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import Knex = require('knex');
import { resolve } from "path";
import * as jsonConfig from '../graphback.json'

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex, pubSub: PubSub) => {
    const runtimeSchema = readFileSync(resolve(__dirname, "./runtime.graphql"), 'utf8');
    const backend = new GraphQLBackendCreator(runtimeSchema, jsonConfig.graphqlCRUD);
    const dbClientProvider = new PgKnexDBDataProvider(client);
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
