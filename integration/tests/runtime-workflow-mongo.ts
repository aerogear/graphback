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
import { buildGraphbackAPI, GraphbackAPI } from "graphback";
import { DocumentNode } from 'graphql';
import { createMongoDbProvider } from "../../packages/graphback-runtime-mongodb"
import { MongoClient, Db } from 'mongodb';
import { SchemaCRUDPlugin } from '../../packages/graphback-codegen-schema';
import { ClientCRUDPlugin } from '../../packages/graphback-codegen-client';

/** global config */
let db: Db;
let mongoClient: MongoClient;
let server: ApolloServer;
let client: ApolloServerTestClient;
let graphbackApi: GraphbackAPI;

let documents: DocumentNode;

let notesId = [];
let commentId = [];
let metadataId = [];

const modelText = readFileSync("./mock.graphql").toString();

beforeAll(async () => {
  try {
    mkdirSync("./output-mongo");
    mkdirSync("./output-mongo/client")

    mongoClient = new MongoClient('mongodb://mongodb:mongo@localhost:27017/users?authSource=admin', { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db('users');
    graphbackApi = buildGraphbackAPI(modelText, {
      dataProviderCreator: createMongoDbProvider(db),
      plugins: [
        new SchemaCRUDPlugin({ outputPath: "./output-mongo/schema/schema.graphql" }),
        new ClientCRUDPlugin({ format: 'graphql', outputFile: './output-mongo/client/graphback.graphql' })
      ]
    });

    await seedDatabase(db);

    const source = await loadDocuments(path.resolve(`./output-mongo/client/**/*.graphql`), {
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
  rmdirSync(path.resolve('./output-mongo'), { recursive: true });
  const dropCollections = ["note", "comment", "commentmetadata"].map((name: string) => db.dropCollection(name));
  await Promise.all(dropCollections);
  return mongoClient.close();
});

async function seedDatabase(db: Db) {
  const notes = [
    {
      title: 'Note A',
      description: 'Note A Description',
      tasks: []
    },
    {
      title: 'Note B',
      description: 'Note B Description',
      tasks: [
        {
          title: 'Task 1'
        },
        {
          title: 'Task 2'
        }
      ]
    }
  ]

  for (const note of notes) {
    const { ops } = await db.collection("note").insertOne(note);
    notesId.push(ops[0]._id.toString());
  }

  const commentMetadata = [
    {
      opened: true
    },
    {
      opened: false
    }
  ]

  for (const metadata of commentMetadata) {
    const { ops } = await db.collection('commentmetadata').insertOne(metadata);
    metadataId.push(ops[0]._id.toString());
  }

  const comments = [
    {
      text: 'Note A Comment',
      description: 'Note A Comment Description',
      noteId: notesId[0],
      metadataId: metadataId[0]
    },
    {
      text: 'Note A Comment 2',
      description: 'Note A Comment Description',
      noteId: notesId[0],
      metadataId: metadataId[1]
    }
  ]

  for (const comment of comments) {
    const { ops } = await db.collection('comment').insertOne(comment);
    commentId.push(ops[0]._id.toString())
  }
}

test('Find all notes', async () => {
  const { data } = await client.query({ operationName: 'findNotes', query: documents });
  expect(data).toBeDefined();
  expect(data.findNotes).toEqual({
    items: [
      {
        id: notesId[0],
        title: 'Note A',
        description: 'Note A Description',
        tasks: [],
        comments: [
          {
            id: commentId[0],
            text: 'Note A Comment',
            description: 'Note A Comment Description'
          },
          {
            id: commentId[1],
            text: 'Note A Comment 2',
            description: 'Note A Comment Description'
          }
        ]
      },
      {
        id: notesId[1],
        title: 'Note B',
        description: 'Note B Description',
        comments: [],
        tasks: [
          {
            title: 'Task 1'
          },
          {
            title: 'Task 2'
          }
        ]
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
        id: notesId[1],
        title: 'Note B',
        description: 'Note B Description',
        comments: [],
        tasks: [
          {
            title: 'Task 1'
          },
          {
            title: 'Task 2'
          }
        ]
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
        id: notesId[0],
        title: 'Note A',
        description: 'Note A Description',
        tasks: [],
        comments: [
          {
            id: commentId[0],
            text: 'Note A Comment',
            description: 'Note A Comment Description'
          },
          {
            id: commentId[1],
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
        id: commentId[0],
        text: 'Note A Comment',
        description: 'Note A Comment Description',
        note: {
          id: notesId[0],
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          id: metadataId[0],
          opened: true
        }
      },
      {
        id: commentId[1],
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        note: {
          id: notesId[0],
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          id: metadataId[1],
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
  const response = await getNote(notesId[0], client);
  expect(response.data).toBeDefined();
  const notes = response.data.getNote;
  expect(notes).toEqual({
    id: notesId[0],
    title: 'Note A',
    description: 'Note A Description',
    tasks: [],
    comments: [
      {
        id: commentId[0],
        text: 'Note A Comment',
        description: 'Note A Comment Description'
      },
      {
        id: commentId[1],
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
    variables: { filter: { noteId: { eq: notesId[0] } }, page: { limit: 1 } }
  });

  expect(response.data).toBeDefined()
  const comments = response.data.findComments
  expect(comments.items).toHaveLength(1);
  expect(comments.items).toEqual([
    {
      id: commentId[0],
      text: 'Note A Comment',
      description: 'Note A Comment Description',
      metadata: {
        id: metadataId[0],
        opened: true,
      },
      note: {
        description: "Note A Description",
        id: notesId[0],
        title: "Note A",
      },
    }
  ])
})

test('Find comments on Note 1 except first', async () => {
  const response = await client.query({
    operationName: "findComments",
    query: documents,
    variables: { filter: { noteId: { eq: notesId[0] } }, page: { offset: 1 } }
  });

  expect(response.data).toBeDefined()
  const notes = response.data.findComments
  expect(notes.items).toHaveLength(1);
  expect(notes).toEqual({
    items: [
      {
        id: commentId[1],
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        metadata: {
          "id": metadataId[1],
          "opened": false,
        },
        note: {
          "description": "Note A Description",
          "id": notesId[0],
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
  const response = await updateNote({ id: notesId[0], title: 'Note 1 New Title' }, client);
  expect(response.data).toBeDefined();
  expect(response.data.updateNote.title).toBe('Note 1 New Title');
});

test('Should create a new Note', async () => {
  const response = await createNote(client, { title: 'New note', description: 'New note description', tasks: [{ title: "new task title" }] });
  expect(response.data).toBeDefined();
  expect(response.data.createNote).toEqual({ id: response.data.createNote.id, title: 'New note', description: 'New note description' });

  const { data } = await getNote(response.data.createNote.id, client);
  expect(data.getNote.tasks).toEqual([{ title: "new task title" }]);
})

test('Delete Note 1', async () => {
  const response = await deleteNote(client, notesId[1]);
  expect(response.data).toBeDefined();
  expect(response.data.deleteNote).toEqual({ id: notesId[1], description: 'Note B Description', title: 'Note B' });
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
