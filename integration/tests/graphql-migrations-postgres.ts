import * as Knex from "knex";

import { buildSchema } from 'graphql';
import { migrateDB } from "../../packages/graphql-migrations/src";
import { Operation } from "../../packages/graphql-migrations/src/diff/Operation";


const dbConfig: Knex.Config = {
  client: "pg",
  connection: {
    user: "postgresql",
    password: "postgres",
    database: "users",
    host: "localhost",
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432
  }
}

const db = Knex(dbConfig);

beforeEach(async () => {
  await db.raw(`DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgresql;
GRANT ALL ON SCHEMA public TO public;`);
})

afterAll(() => db.destroy());

test('consecutive migrations', async () => {
  const model = buildSchema(`
  """@model"""
  type User {
    """@id"""
    _id: ID
    name: String
  }
`)

  let ops = await migrateDB(dbConfig, model)
  expect(ops.results).toHaveLength(3);
  const opsResults = ops.results.map((op: Operation) => op.type);
  expect(opsResults).toEqual(['table.create', 'table.primary.set', 'column.create'])

  ops = await migrateDB(dbConfig, model)
  expect(ops.results).toHaveLength(0);
})