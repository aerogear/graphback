// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import * as Knex from 'knex';
import { join } from 'path';
import { DatabaseMigrater } from '../src/DatabaseMigrater';

const setup = () => {

  const schemaText = `
type User {
  name: String
  age: Int
}

type City {
    id: String
    location: String
}

type Note {
    name: String
}
  `;

  const migrationsDir = join(__dirname, 'migrations');

  const dbConfig = {
    "client": "sqlite3",
    "connection": {
      "filename": ":memory:"
    }
  };

  const db = Knex(dbConfig);

  return new DatabaseMigrater(schemaText, db, migrationsDir);
}

ava('it should generate a SQL migration script', async (t: ExecutionContext) => {

  const databaseMigrater = setup();

  await databaseMigrater.createMetadataTables();
  const migration = await databaseMigrater.generateMigration();

  const changes = JSON.parse(migration.changes);
  t.assert(changes.length === 3);
  t.assert(migration.sql_up !== undefined);
  t.snapshot(migration.sql_up);
});
