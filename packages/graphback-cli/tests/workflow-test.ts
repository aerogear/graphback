// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
// tslint:disable-next-line: no-var-requires no-require-imports
const execa = require('execa');
import { existsSync } from 'fs';
import { DropCreateDatabaseAlways } from 'graphql-migrations-bk';
import { join, resolve } from 'path';
import { connect, createDB, generate } from '../src';

const model = {
  modelName: "testSchema",
  content: `
  type Test {
    id: ID!
    title: String!
    description: String!
  }
`
}

ava('Test cli workflow', async (t: ExecutionContext) => {
  const basePath = resolve(`${__dirname}/../../../examples/generator-fullstack`);
  process.chdir(basePath)
  await generate();

  const db = await connect("sqlite3", { filename: "./db.sqlite" })

  const databaseInitializationStrategy = new DropCreateDatabaseAlways("sqlite3", db);

  await createDB(databaseInitializationStrategy);

  t.true(existsSync(join(basePath, "graphback.json")))
  t.true(existsSync(join(basePath, "db.sqlite")))
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Note.ts")))
  t.true(existsSync(join(basePath, "server/src/schema/generated.ts")))
  t.true(existsSync(join(basePath, "server/src/resolvers/generated/note.ts")))


});

