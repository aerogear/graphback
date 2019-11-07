
import {
  DatabaseConnectionOptions,
  DatabaseInitializationStrategy,
  DropCreateDatabaseIfChanges,
  GraphQLBackendCreator,
  InputModelProvider,
  PgKnexDBDataProvider,
  UpdateDatabaseIfChanges,
  DefaultCRUDService
} from 'graphback';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import * as Knex from 'knex';
import * as jsonConfig from '../graphback.json'

/**
 * Method used to create runtime schema
 * It will be part of of the integration tests
 */
export const createContext = async (client: Knex) => {
  const schemaContext = new InputModelProvider(jsonConfig.folders.migrations, jsonConfig.folders.model);
  const backend = new GraphQLBackendCreator(schemaContext, jsonConfig.graphqlCRUD);
  const crudDb = new PgKnexDBDataProvider(client);

  const databaseInitializationStrategy = new UpdateDatabaseIfChanges({
    client: jsonConfig.db.database,
    connectionOptions: jsonConfig.db.dbConfig
  });
  await backend.initializeDatabase(databaseInitializationStrategy);
  const pubSub = new PubSub();
  const crudService = new DefaultCRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb
  };
}