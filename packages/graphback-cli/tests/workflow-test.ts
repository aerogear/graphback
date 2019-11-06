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
  type Note {
    id: ID!
    title: String!
    description: String!
    ## Relationship
    comment: [Comment]! @OneToMany(field: "noteComment")
  }
  
  type Comment {
    id: ID!
    title: String!
    description: String!
  }
  
  type Query {
    getLikedNotes(id: ID!, names: [String]!): Note!
  }
  
  type Mutation {
    likeNote(id: ID!): Note!
  }
`
}

ava('Test cli workflow', async (t: ExecutionContext) => {
  const basePath = resolve(`${__dirname}/../../../examples/generator-example`);
  process.chdir(basePath)
  console.info(`Starting tests in ${process.cwd()}`)
  await initConfig("testback ", { model, database: "sqlite3", client: true });
  await generate();

  const databaseInitializationStrategy = new DropCreateDatabaseAlways({
    connectionOptions: {
      filename: "./db.sqlite"
    }, client: "sqlite3"
  })

  await createDB(databaseInitializationStrategy);

  t.true(existsSync(join(basePath, "graphback.json")))
  t.true(existsSync(join(basePath, "db.sqlite")))
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Test.ts")))
  t.true(existsSync(join(basePath, "src/schema/generated.ts")))
  t.true(existsSync(join(basePath, "src/resolvers/generated/test.ts")))

  try {
    await execa('npm', ['run', 'build']);
  } catch (error) {
    t.fail(`build failed with ${error}`);
  }

});

