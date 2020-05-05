import { graphback } from 'graphback'
import { CRUDService as service } from '@graphback/runtime'
import { PgKnexDBDataProvider as provider } from '@graphback/runtime-knex'
import { migrateDB, MigrateOptions, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { PubSub } from 'graphql-subscriptions';
import { connectDB } from './db'
import { loadConfigSync } from 'graphql-config';

/**
 * Method used to create runtime schema
 */
export const createRuntime = () => {
  const db = connectDB();
  const pubSub = new PubSub();

  const projectConfig = loadConfigSync({
    extensions: [
      () => ({ name: 'dbmigrations' })
    ]
  }).getDefault()

  const dbMigrationsConfig = projectConfig.extension('dbmigrations');

  const migrateOptions: MigrateOptions = {
    //Do not perform delete operations on tables
    operationFilter: removeNonSafeOperationsFilter
  };

  const graphbackOptions = {
    db,
    pubSub,
    service,
    provider,
  }

  const runtime = graphback(graphbackOptions)

  // NOTE: For SQLite db should be always recreated
  migrateDB(dbMigrationsConfig, runtime.schema, migrateOptions)
    .then((ops) => {
      console.log("Migrated database", ops);
    });

  return runtime;
}
