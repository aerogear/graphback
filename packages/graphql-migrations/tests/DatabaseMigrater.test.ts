import { Change } from '@graphql-inspector/core';
import { InputModelProvider } from '../src/database/migrations/schema/InputModelProvider';
import { KnexMigrationProvider } from '../src/migrations';
import { join } from 'path';
import Knex = require('knex');
import { DatabaseMigrater } from '../src/DatabaseMigrater';
import ava, { ExecutionContext } from 'ava';
import { ModelChange, ModelChangeType } from '../src/changes/ChangeTypes';

const oldSchemaDefault = `
type User {
  id: ID!
  name: String!
}

type Note {
  id: ID!
  title: String!
}
`;

const currentSchemaDefault = `
type User {
  id: ID!
  age: Int
}

type Test {
  id: ID!
  name: String
}
`;


// TODO: Fix tests

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

  const migrationProvider = new KnexMigrationProvider(db, migrationsDir)

  return new DatabaseMigrater({ db, schemaProvider, migrationProvider });
}


ava('it should generate a SQL migration script', async (t: ExecutionContext) => {

  const databaseMigrater = setup();

  await databaseMigrater.createMetadataTables();
  const migration = await databaseMigrater.createMigration();

  t.assert(migration.changes.length === 3);
  t.snapshot(migration.sql_up);
});
