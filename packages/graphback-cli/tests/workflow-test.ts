import ava, { ExecutionContext } from 'ava';
// tslint:disable-next-line: no-var-requires
const execa = require('execa');
import { existsSync } from 'fs';
import { resolve } from 'path';
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
  const basePath = resolve(`${__dirname}/../../../templates/apollo-starter-ts`);
  process.chdir(basePath)
  console.info(`Starting tests in ${process.cwd()}`)
  await initConfig("testback ", { model, database: "sqlite3", client: true });
  await generate();
  await createDB();

  t.true(existsSync(`${basePath}/graphback.json`))
  t.true(existsSync(`${basePath}/db.sqlite`))
  t.true(existsSync(`${basePath}/client/src/graphql/fragments/Test.ts`))
  t.true(existsSync(`${basePath}/src/resolvers/generated/Test.ts`))
  t.true(existsSync(`${basePath}/src/schema/generated.ts`))
  try {
    await execa('npm', ['run', 'build']);
  } catch (error) {
    t.fail(`build failed with ${error}`);
  }
});

