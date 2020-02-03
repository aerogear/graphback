// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { createDB, generate, initConfig } from '../src';

const model = {
  modelName: "testSchema",
  content: `
    type Test {
      id: ID
      name: String
    }
`
}

ava('Test cli workflow', async (t: ExecutionContext) => {
  const basePath = resolve(`${__dirname}/../../../examples/generator-fullstack`);
  process.chdir(basePath)
  await initConfig("testback ", { model, database: "sqlite3", client: true }, true);
  await generate();

  await createDB();

  t.true(existsSync(join(basePath, "graphback.json")))
  t.true(existsSync(join(basePath, "db.sqlite")))
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Note.ts")))
  t.true(existsSync(join(basePath, "src/schema/generated.ts")))
  t.true(existsSync(join(basePath, "src/resolvers/generated/note.ts")))
});

