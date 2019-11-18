import { Change } from '@graphql-inspector/core';
import { InputModelProvider } from '../src/database/migrations/schema/InputModelProvider';
import { KnexMigrationProvider } from '../src/migrations';
import { join } from 'path';
import Knex = require('knex');
import { DatabaseMigrater } from '../src/DatabaseMigrater';
import ava, { ExecutionContext } from 'ava';

const setup = () => {

  const modelDir = join(__dirname, 'model');
  const migrationsDir = join(__dirname, 'migrations');

  const schemaProvider = new InputModelProvider(modelDir);

  const dbConfig = {
    "client": "sqlite3",
    "connection": {
      "filename": ":memory:"
    }
  };

  const db = Knex(dbConfig);

  return new DatabaseMigrater(schemaProvider.getSchemaText(), db, migrationsDir);
}

ava('it should generate a SQL migration script', async (t: ExecutionContext) => {

  const databaseMigrater = setup();

  await databaseMigrater.createMetadataTables();
  const migration = await databaseMigrater.createMigration();

  const changes = JSON.parse(migration.changes);
  t.assert(changes.length === 3);
  t.assert(migration.sql_up !== undefined);
  t.snapshot(migration.sql_up);
});
