import { gql } from 'apollo-server-core';
import {
  GraphQLBackendCreator,
  PgKnexDBDataProvider,
} from 'graphback';
import { migrate } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import * as Knex from 'knex';
import * as jsonConfig from '../graphback.json'
import { readFileSync } from 'fs';
import { join } from 'path';
import { sync } from 'glob';
import { loadConfig } from 'graphql-config';
import { printSchema } from 'graphql';

// TODO: use graphql-config
const buildSchemaText = (schemaDir: string): string => {
  const schemaPath = join(schemaDir, '*.graphql');
  const files = sync(schemaPath);

  if (files.length === 0) {
    return '';
  }

  const schemaText = files
    // tslint:disable-next-line: no-unnecessary-callback-wrapper
    .map((f: string) => readFileSync(f))
    .join('\n');

  return schemaText.length ? schemaText : '';
}

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createRuntime = async (client: Knex) => {

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
