import { existsSync } from 'fs';
import { join, resolve } from 'path';
import test, { ExecutionContext } from 'ava';
import { createDB, generateUsingPlugins, initConfig } from '../src';

const model = {
  modelName: "testSchema",
  content: `
    type Test {
      id: ID
      name: String
    }
`
};

test('Test cli workflow', async (t: ExecutionContext) => {
  const basePath = resolve(`${__dirname}/../../../templates/ts-apollo-fullstack`);
  process.chdir(basePath);
  await initConfig({ model, database: "sqlite3", client: true, skipInstall: true });
  await generateUsingPlugins({});

  await createDB();

  t.true(existsSync(join(basePath, "db.sqlite")));
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Note.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/queries/findAllNotes.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/createNote.graphql")));
  t.true(existsSync(join(basePath, "src/schema/schema.graphql")));
  t.true(existsSync(join(basePath, "src/resolvers/resolvers.ts")));
});

