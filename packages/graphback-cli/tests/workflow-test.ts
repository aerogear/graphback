// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
// tslint:disable-next-line: no-var-requires no-require-imports
const execa = require('execa');
import { existsSync } from 'fs';
import { DropCreateDatabaseAlways } from 'graphback';
import { join, resolve } from 'path';
import { createDB, generate, initConfig } from '../src';

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
  const basePath = resolve(`${__dirname}/../../../examples/generator-full-stack-example`);
  process.chdir(basePath)
  await generate();

  const databaseInitializationStrategy = new DropCreateDatabaseAlways({
    connectionOptions: {
      filename: "./db.sqlite"
    }, client: "sqlite3"
  })

  await createDB(databaseInitializationStrategy);

  t.true(existsSync(join(basePath, "graphback.json")))
  t.true(existsSync(join(basePath, "db.sqlite")))
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Note.ts")))
  t.true(existsSync(join(basePath, "server/src/schema/generated.ts")))
  t.true(existsSync(join(basePath, "server/src/resolvers/generated/test.ts")))

  process.chdir(resolve(basePath, './server'))
  
  try {
    await execa('npm', ['run', 'build']);
  } catch (error) {
    t.fail(`build failed with ${error}`);
  }

  // Test init config 
  await initConfig("testback ", { model, database: "sqlite3", client: true });
});

