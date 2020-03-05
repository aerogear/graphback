import { existsSync } from 'fs';
import { join, resolve } from 'path';
import test, { ExecutionContext } from 'ava';
import { createDB, generateUsingPlugins, initConfig } from '../src';

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

test('Test cli workflow', async (t: ExecutionContext) => {
  const basePath = resolve(`${__dirname}/../../../templates/ts-apollo-fullstack`);
  process.chdir(basePath);
  await initConfig({ model, database: "sqlite3", client: true, skipInstall: true });
  await generateUsingPlugins({});

  await createDB();

  t.true(existsSync(join(basePath, "db.sqlite")));
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Note.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/NoteExpanded.graphql")))
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/Comment.graphql")))
  t.true(existsSync(join(basePath, "client/src/graphql/fragments/CommentExpanded.graphql")))
  t.true(existsSync(join(basePath, "client/src/graphql/queries/findAllNotes.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/queries/findComments.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/queries/findAllComments.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/queries/findNotes.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/createNote.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/createComment.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/deleteComment.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/deleteNote.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/updateComment.graphql")));
  t.true(existsSync(join(basePath, "client/src/graphql/mutations/updateNote.graphql")));
  t.true(existsSync(join(basePath, "src/schema/schema.graphql")));
  t.true(existsSync(join(basePath, "src/resolvers/resolvers.ts")));
});

