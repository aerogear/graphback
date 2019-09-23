import ava, { ExecutionContext } from 'ava';
import { initConfig, generate, createDB } from '../src';
import { resolve } from 'path';
import { existsSync } from 'fs';


ava.before((t: ExecutionContext) => {
})

const model = {
  modelName: "testSchema",
  content: `
    type Test {
      id: ID
      name: String
    }
  `
}

ava('Test Command line workflow', async (t: ExecutionContext) => {
  const basePath = resolve(`${__dirname}/../../../templates/apollo-starter-ts`);
  process.chdir(basePath)
  console.info(`Starting tests in ${process.cwd()}`)
  await initConfig("testback", { model, database: "sqlite3", client: true });
  await generate();
  await createDB();
  t.true(existsSync(`${basePath}/graphback.json`))
  t.true(existsSync(`${basePath}/db.sqllite`))
  t.true(existsSync(`${basePath}./client/src/graphql/fragments/Test.ts`))
  t.true(existsSync(`${basePath}./src/resolvers/generated/Test.ts`))
  t.true(existsSync(`${basePath}./src/schema/generated.ts`))
});

