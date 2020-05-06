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
  const basePath = resolve(`${__dirname}/../../../templates/ts-apollo-fullstack`);
  process.chdir(basePath);
  await initConfig({ model, database: "sqlite3", client: true, skipInstall: true });
  await generateUsingPlugins({});

  expect(existsSync(join(basePath, "client/src/graphql/fragments/Note.graphql"))).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/fragments/NoteExpanded.graphql"))
  ).toBe(true)
  expect(existsSync(join(basePath, "client/src/graphql/fragments/Comment.graphql"))).toBe(true)
  expect(
    existsSync(join(basePath, "client/src/graphql/fragments/CommentExpanded.graphql"))
  ).toBe(true)
  expect(
    existsSync(join(basePath, "client/src/graphql/queries/findAllNotes.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/queries/findComments.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/queries/findAllComments.graphql"))
  ).toBe(true);
  expect(existsSync(join(basePath, "client/src/graphql/queries/findNotes.graphql"))).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/mutations/createNote.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/mutations/createComment.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/mutations/deleteComment.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/mutations/deleteNote.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/mutations/updateComment.graphql"))
  ).toBe(true);
  expect(
    existsSync(join(basePath, "client/src/graphql/mutations/updateNote.graphql"))
  ).toBe(true);
  expect(existsSync(join(basePath, "src/schema/schema.graphql"))).toBe(true);
  expect(existsSync(join(basePath, "src/resolvers/resolvers.ts"))).toBe(true);
});

