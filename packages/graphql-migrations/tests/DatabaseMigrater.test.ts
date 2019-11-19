import { join } from 'path';
import Knex = require('knex');
import { DatabaseMigrater } from '../src/DatabaseMigrater';
import ava, { ExecutionContext } from 'ava';

const schemaText = `
type User {
  id: ID!
  name: String
}
`;

const setup = () => {

  const migrationsDir = join(__dirname, 'migrations');

  const dbConfig = {
    "client": "sqlite3",
    "connection": {
      "filename": ":memory:"
    }
  };

  const db = Knex(dbConfig);

  return new DatabaseMigrater(schemaText, db, { migrationsDir });
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
