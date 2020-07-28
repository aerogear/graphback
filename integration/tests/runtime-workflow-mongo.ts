/* eslint-disable max-lines */
/* eslint-disable no-null/no-null */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import * as path from 'path';
import { ApolloServer } from "apollo-server";
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadDocuments } from '@graphql-tools/load'
import { buildGraphbackAPI, GraphbackAPI } from "graphback";
import { DocumentNode } from 'graphql';
import { MongoClient, Db, ObjectID } from 'mongodb';
import { createMongoDbProvider } from "../../packages/graphback-runtime-mongodb"
import { SchemaCRUDPlugin } from '../../packages/graphback-codegen-schema';
import { ClientCRUDPlugin } from '../../packages/graphback-codegen-client';

/** global config */
let db: Db;
let mongoClient: MongoClient;
let server: ApolloServer;
let client: ApolloServerTestClient;
let graphbackApi: GraphbackAPI;

let documents: DocumentNode;

const notesId = [];
const commentId = [];
const metadataId = [];

const modelText = readFileSync("./mongodb-model.graphql").toString();
const createdAt = new Date();
const objectId = new ObjectID("507f191e810c19729de860ea");

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
        new ClientCRUDPlugin({ outputFile: './output-mongo/client/graphback.graphql' })
      ]
    });

    await seedDatabase(db);

    const source = await loadDocuments(path.resolve(`./output-mongo/client/graphback.graphql`), {
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
      createdAt,
      description: 'Note A Description',
      tasks: []
    },
    {
      title: 'Note B',
      createdAt,
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
    notesId.push(ops[0]._id);
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
    metadataId.push(ops[0]._id);
  }

  const comments = [
    {
      text: 'Note A Comment',
      description: 'Note A Comment Description',
      createdAt,
      objectId,
      noteId:  notesId[0],
      metadataId:  metadataId[0],
      ratings: [4, 4, 5, 2]
    },
    {
      text: 'Note A Comment 2',
      description: 'Note A Comment Description',
      createdAt,
      objectId,
      ratings: null,
      noteId:  notesId[0],
      metadataId:  metadataId[1]
    }
  ]

  for (const comment of comments) {
    const { ops } = await db.collection('comment').insertOne(comment);
    commentId.push(ops[0]._id);
  }
}

test('Find all notes', async () => {
  const { data } = await client.query({ operationName: 'findNotes', query: documents });
  expect(data).toBeDefined();
  expect(data.findNotes).toEqual({
    items: [
      {
        _id:  notesId[0],
        createdAt,
        title: 'Note A',
        description: 'Note A Description',
        tasks: [],
        comments: [
          {
            _id:  commentId[0],
            objectId,
            createdAt: createdAt.getTime(),
            text: 'Note A Comment',
            description: 'Note A Comment Description',
            ratings: [4, 4, 5, 2]
          },
          {
            _id:  commentId[1],
            objectId,
            createdAt: createdAt.getTime(),
            text: 'Note A Comment 2',
            ratings: null,
            description: 'Note A Comment Description'
          }
        ]
      },
      {
        _id:  notesId[1],
        title: 'Note B',
        createdAt,
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
        _id:  notesId[1],
        createdAt,
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
        _id:  notesId[0],
        createdAt,
        title: 'Note A',
        description: 'Note A Description',
        tasks: [],
        comments: [
          {
            _id:  commentId[0],
            objectId,
            createdAt: createdAt.getTime(),
            text: 'Note A Comment',
            description: 'Note A Comment Description',
            ratings: [4, 4, 5, 2]
          },
          {
            _id:  commentId[1],
            objectId,
            createdAt: createdAt.getTime(),
            text: 'Note A Comment 2',
            description: 'Note A Comment Description',
            ratings: null
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
        _id:  commentId[0],
        objectId,
        createdAt: createdAt.getTime(),
        text: 'Note A Comment',
        description: 'Note A Comment Description',
        ratings: [4, 4, 5, 2],
        note: {
          _id:  notesId[0],
          createdAt,
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          _id:  metadataId[0],
          opened: true
        }
      },
      {
        _id:  commentId[1],
        objectId,
        createdAt: createdAt.getTime(),
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        ratings: null,
        note: {
          _id:  notesId[0],
          createdAt,
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          _id:  metadataId[1],
          opened: false
        }
      }
    ],
    limit: null,
    offset: 0,
    count: 2
  })
})

test('filter comments using built in scalars', async () => {
  const { data } = await client.query({ operationName: "findComments", query: documents,
  variables: {
    filter: {
      createdAt: {
        eq: createdAt.getTime()
      }
    }
  } });

  expect(data).toBeDefined();
  expect(data.findComments).toEqual({
    items: [
      {
        _id:  commentId[0],
        createdAt: createdAt.getTime(),
        objectId,
        text: 'Note A Comment',
        description: 'Note A Comment Description',
        ratings: [4, 4, 5, 2],
        note: {
          _id:  notesId[0],
          createdAt,
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          _id:  metadataId[0],
          opened: true
        }
      },
      {
        _id:  commentId[1],
        createdAt: createdAt.getTime(),
        objectId,
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        ratings: null,
        note: {
          _id:  notesId[0],
          createdAt,
          title: 'Note A',
          description: 'Note A Description'
        },
        metadata: {
          _id:  metadataId[1],
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
    _id:  notesId[0],
    title: 'Note A',
    createdAt,
    description: 'Note A Description',
    tasks: [],
    comments: [
      {
        _id:  commentId[0],
        createdAt: createdAt.getTime(),
        objectId,
        text: 'Note A Comment',
        description: 'Note A Comment Description',
        ratings: [4, 4, 5, 2]
      },
      {
        _id:  commentId[1],
        createdAt: createdAt.getTime(),
        objectId,
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        ratings: null
      }
    ]
  });
})

test('Find at most one comment on Note 1', async () => {
  const response = await client.query({
    operationName: "findComments",
    query: documents,
    variables: { filter: { noteId:  { eq: notesId[0] } }, page: { limit: 1 } }
  });

  expect(response.data).toBeDefined()
  const comments = response.data.findComments
  expect(comments.items).toHaveLength(1);
  expect(comments.items).toEqual([
    {
      _id:  commentId[0],
      createdAt: createdAt.getTime(),
      objectId,
      text: 'Note A Comment',
      description: 'Note A Comment Description',
      ratings: [4, 4, 5, 2],
      metadata: {
        _id:  metadataId[0],
        opened: true,
      },
      note: {
        description: "Note A Description",
        _id:  notesId[0],
        createdAt,
        title: "Note A",
      },
    }
  ])
})

test('Find comments on Note 1 except first', async () => {
  const response = await client.query({
    operationName: "findComments",
    query: documents,
    variables: { filter: { noteId:  { eq: notesId[0] } }, page: { offset: 1 } }
  });

  expect(response.data).toBeDefined()
  const notes = response.data.findComments
  expect(notes.items).toHaveLength(1);
  expect(notes).toEqual({
    items: [
      {
        _id:  commentId[1],
        createdAt: createdAt.getTime(),
        objectId,
        text: 'Note A Comment 2',
        description: 'Note A Comment Description',
        ratings: null,
        metadata: {
          _id: metadataId[1],
          opened: false,
        },
        note: {
          description: "Note A Description",
          _id: notesId[0],
          createdAt,
          title: "Note A",
        },
      }
    ],
    limit: null,
    offset: 1,
    count: 2
  })
})

test('Should update Note 1 title', async () => {
  const response = await updateNote({ _id:  notesId[0], title: 'Note 1 New Title' }, client);
  expect(response.data).toBeDefined();
  expect(response.data.updateNote.title).toBe('Note 1 New Title');
});

test('Should create a new Note', async () => {
  const createdAt = new Date();
  const response = await createNote(client, { title: 'New note', createdAt: createdAt.toJSON(), description: 'New note description', tasks: [{ title: "new task title" }] });
  expect(response.data).toBeDefined();
  expect(response.data.createNote).toEqual({ _id:  response.data.createNote._id, createdAt, title: 'New note', description: 'New note description' });

  const { data } = await getNote(response.data.createNote._id, client);
  expect(data.getNote.tasks).toEqual([{ title: "new task title" }]);
})

test('Delete Note 1', async () => {
  const response = await deleteNote(client, notesId[1]);
  expect(response.data).toBeDefined();
  expect(response.data.deleteNote).toEqual({ _id:  notesId[1], createdAt, description: 'Note B Description', title: 'Note B' });
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

async function deleteNote(client: ApolloServerTestClient, _id:  string | number) {
  const response = await client.mutate({
    operationName: "deleteNote",
    mutation: documents,
    variables: { input: { _id } }
  });

  return response;
}

async function getNote(id:  string | number, client: ApolloServerTestClient) {
  const response = await client.query({
    operationName: "getNote",
    query: documents,
    variables: { id }
  });

  return response;
}
