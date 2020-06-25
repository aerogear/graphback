/* eslint-disable no-null/no-null */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import * as path from 'path';
import { ApolloServer } from "apollo-server";
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { loadConfig } from 'graphql-config';
import { loadDocuments } from '@graphql-toolkit/core';
import { GraphQLFileLoader } from '@graphql-toolkit/graphql-file-loader';
import * as Knex from 'knex';
import { buildGraphbackAPI, GraphbackAPI } from "graphback/src";
import { DocumentNode } from 'graphql';
import { migrateDB } from '../../packages/graphql-migrations/src';
import { createKnexDbProvider } from "../../packages/graphback-runtime-knex";
import { SchemaCRUDPlugin } from '../../packages/graphback-codegen-schema';
import { ClientCRUDPlugin } from '../../packages/graphback-codegen-client';

/** global config */
let db: Knex;
let server: ApolloServer;
let client: ApolloServerTestClient;
let graphbackApi: GraphbackAPI;

let documents: DocumentNode;

const modelText = readFileSync('./mock.graphql').toString();

beforeAll(async () => {
  try {
    mkdirSync("./output-postgres");
    mkdirSync("./output-postgres/client")
    const dbMigrationsConfig = {
      client: "pg",
      connection: {
        user: "postgresql",
        password: "postgres",
        database: "users",
        host: "localhost",
        port: process.env.PORT || 5432
      }
    }
    db = Knex(dbMigrationsConfig);

    graphbackApi = buildGraphbackAPI(modelText, {
      dataProviderCreator: createKnexDbProvider(db),
      plugins: [
        new SchemaCRUDPlugin({outputPath: "./output-postgres/schema/schema.graphql"}),
        new ClientCRUDPlugin({format: 'graphql', outputFile: './output-postgres/client/graphback.graphql'})
      ]
    });

    const { newDB } = await migrateDB(dbMigrationsConfig, graphbackApi.schema);

    await seedDatabase(db);

    expect(newDB).toMatchSnapshot();

    const source = await loadDocuments(path.resolve(`./output-postgres/client/**/*.graphql`), {
      loaders: [
        new GraphQLFileLoader()
      ]
    });
    documents = source[0].document;
  } catch (e) {
    console.log(e);
    throw e;
  }
})

beforeEach(() => {
  const { typeDefs, resolvers, contextCreator } = graphbackApi;
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextCreator
  });

  client = createTestClient(server);
})

afterEach(() => server.stop())

afterAll(async () => {
  rmdirSync(path.resolve('./output-postgres'), { recursive: true });
  await db.schema.dropTableIfExists('comment').dropTableIfExists('commentmetadata').dropTableIfExists('note');
  return db.destroy();
});

async function seedDatabase(db: Knex) {
  await db('note').insert([
    {
      title: 'Note A',
      description: 'Note A Description'
    },
    {
      title: 'Note B',
      description: 'Note B Description'
    }
  ]);

  await db('commentmetadata').insert([
    {
      opened: true
    },
    {
      opened: false
    }
  ])

  await db('comment').insert([
    {
      text: 'Note A Comment',
      description: 'Note A Comment Description',
      noteId: 1,
      metadataId: 1
    },
    {
      text: 'Note A Comment 2',
      description: 'Note A Comment Description',
      noteId: 1,
      metadataId: 2
    }
  ]);
}

const getConfig = async () => {
  const config = await loadConfig({
    rootDir: process.cwd(),
    extensions: [
      () => ({ name: 'graphback' })
    ]
  });

  const projectConfig = config.getDefault();
  const graphbackConfig = projectConfig.extension('graphback');

  return { projectConfig, graphbackConfig };
}

test('Find all notes', async () => {
  const { data } = await client.query({ operationName: 'findNotes', query: documents });

  expect(data).toBeDefined();
  expect(data.findNotes).toEqual({
    items: [
      {
        id: '1',
        title: 'Note A',
        description: 'Note A Description',
        comments: [
          {
            id: '1',
            text: 'Note A Comment',
            description: 'Note A Comment Description'
          },
          {
            id: '2',
            text: 'Note A Comment 2',
            description: 'Note A Comment Description'
          }
        ]
      },
      {
        id: '2',
        title: 'Note B',
        description: 'Note B Description',
        comments: []
      }
    ],
    limit: null,
    offset: 0,
    count: 2
  })
})

test('Find all notes except the first', async () => {
  const { data } = await client.query({
    operationName: 'findNotes',
    query: documents,
    variables: { page: { offset: 1 } }
  });

  expect(data).toBeDefined();
  expect(data.findNotes).toEqual({
    items: [
      {
        id: '2',
        title: 'Note B',
        description: 'Note B Description',
        comments: []
      }
    ],
    limit: null,
    offset: 1,
    count: 2
  })
})

test('Find at most one note', async () => {
  const { data } = await client.query({
    operationName: 'findNotes',
    query: documents,
    variables: { page: { limit: 1 } }
  });

  expect(data).toBeDefined();
  expect(data.findNotes).toEqual({
    items: [
      {
        id: '1',
        title: 'Note A',
        description: 'Note A Description',
        comments: [
          {
            id: '1',
            text: 'Note A Comment',
            description: 'Note A Comment Description'
          },
          {
            id: '2',
            text: 'Note A Comment 2',
            description: 'Note A Comment Description'
          }
        ]
      },
    ],
    limit: 1,
    offset: 0,
    count: 2
  })
})

test('Find all comments', async () => {
  const { data } = await client.query({ operationName: "findComments", query: documents });

  expect(data).toBeDefined();
  expect(data.findComments).toEqual({
    items: [
      {
        id: '1',
        text: 'Note A Comment',
        description: 'Note A Comment Description',
        note: {
          id: '1',
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          id: '1',
          opened: true
        }
      },
      {
        id: '2',
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        note: {
          id: '1',
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          id: '2',
          opened: false
        }
      }
    ],
    limit: null,
    offset: 0,
    count: 2
  })
})

test('Note 1 should be defined', async () => {
  const response = await getNote('1', client);
  expect(response.data).toBeDefined();
  const notes = response.data.getNote;
  expect(notes).toEqual({
    id: '1',
    title: 'Note A',
    description: 'Note A Description',
    comments: [
      {
        id: '1',
        text: 'Note A Comment',
        description: 'Note A Comment Description'
      },
      {
        id: '2',
        text: 'Note A Comment 2',
        description: 'Note A Comment Description'
      }
    ]
  });
})

test('Find at most one comment on Note 1', async () => {
  const response = await client.query({
    operationName: "findComments",
    query: documents,
    variables: { filter: { noteId: { eq: 1 } }, page: { limit: 1 } }
  });

  expect(response.data).toBeDefined()
  const comments = response.data.findComments
  expect(comments.items).toHaveLength(1);
  expect(comments.items).toEqual([
    {
      id: '1',
      text: 'Note A Comment',
      description: 'Note A Comment Description',
      metadata: {
        id: "1",
        opened: true,
      },
      note: {
        description: "Note A Description",
        id: "1",
        title: "Note A",
      },
    }
  ])
})

test('Find comments on Note 1 except first', async () => {
  const response = await client.query({
    operationName: "findComments",
    query: documents,
    variables: { filter: { noteId: { eq: 1 } }, page: { offset: 1 } }
  });

  expect(response.data).toBeDefined()
  const notes = response.data.findComments
  expect(notes.items).toHaveLength(1);
  expect(notes).toEqual({
    items: [
      {
        id: '2',
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        metadata: {
          "id": "2",
          "opened": false,
        },
        note: {
          "description": "Note A Description",
          "id": "1",
          "title": "Note A",
        },
      }
    ],
    limit: null,
    offset: 1,
    count: 2
  })
})

test('Should update Note 1 title', async () => {
  const response = await updateNote({ id: '1', title: 'Note 1 New Title' }, client);
  expect(response.data).toBeDefined();
  expect(response.data.updateNote.title).toBe('Note 1 New Title');
});

test('Should create a new Note', async () => {
  const response = await createNote(client, { title: 'New note', description: 'New note description' });
  expect(response.data).toBeDefined();
  expect(response.data.createNote).toEqual({ id: '3', title: 'New note', description: 'New note description' });
})

test('Delete Note 1', async () => {
  const response = await deleteNote(client, '2');
  expect(response.data).toBeDefined();
  expect(response.data.deleteNote).toEqual({ id: '2', description: 'Note B Description', title: 'Note B' });
});

async function updateNote(input: any, client: ApolloServerTestClient) {
  const response = await client.mutate({
    operationName: "updateNote",
    mutation: documents,
    variables: { input }
  });

  return response;
}

async function createNote(client: ApolloServerTestClient, input: any) {
  const response = await client.mutate({
    operationName: "createNote",
    mutation: documents, variables: { input }
  });

  return response;
}

async function deleteNote(client: ApolloServerTestClient, id: string | number) {
  const response = await client.mutate({
    operationName: "deleteNote",
    mutation: documents,
    variables: { input: { id } }
  });

  return response;
}

async function getNote(id: string | number, client: ApolloServerTestClient) {
  const response = await client.query({
    operationName: "getNote",
    query: documents,
    variables: { id }
  });

  return response;
}

async function findNoteComments(noteId: string, client: ApolloServerTestClient) {
  const response = await client.query({
    operationName: "findComments",
    query: documents,
    variables: { filter: { noteId } }
  });

  return response;
}

