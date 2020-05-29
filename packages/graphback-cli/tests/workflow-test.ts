import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { generateUsingPlugins, initConfig } from '../src';

const model = {
  modelName: "testSchema",
  content: `
  """ @model """
  type Note {
    id: ID!
    title: String!
    description: String!
    """
    @oneToMany field: 'noteComment'
    """
    comments: [Comment]!
  }

  """ @model """
  type Comment {
    id: ID!
    title: String!
    description: String!
  }`
};

test('Test cli workflow', async () => {
  const basePath = resolve(`${__dirname}/../../../templates/ts-apollo-postgres-backend`);
  process.chdir(basePath);
  await initConfig({ model, database: "sqlite3", client: true, skipInstall: true });
  await generateUsingPlugins({});

  expect(existsSync(join(basePath, "client/src/graphql/graphback.graphql"))).toBe(true);
  expect(existsSync(join(basePath, "src/schema/schema.graphql"))).toBe(true);
});

