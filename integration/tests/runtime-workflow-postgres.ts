/* eslint-disable import/no-internal-modules */
/* eslint-disable max-lines */
/* eslint-disable no-null/no-null */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import * as path from 'path';
import { ApolloServer, gql } from "apollo-server";
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadDocuments } from '@graphql-tools/load';
import * as Knex from 'knex';
import { buildGraphbackAPI, GraphbackAPI } from "graphback/src";
import { DocumentNode } from 'graphql';
import { ObjectID } from 'mongodb';
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

const modelText = readFileSync('./postgres-model.graphql').toString();
const createdAt = new Date();
const objectId = new ObjectID("507f191e810c19729de860ea");

const customNoteWithFullDataSet = {
  id: Date.now().toString(),
  title: "title",
  description: "description",
  tasks: [{
    title: "mambo"
  }],
  comments: [{
    id: Date.now().toString(),
    text: "text",
    description: "comment-description",
    metadata: {
      id: Date.now().toString(),
      opened: true
    },
    ratings: [3, 9, 10]
  },
  {
    id: "1",
    text: "text",
    description: "second-comment-description",
    metadata: null, // this should resolve to null
    ratings: [3, 9, 10]
  },
  {
    id: "2",
    text: "text",
    description: "third-comment-description",
    metadata: undefined, // this should resolve to null
    ratings: [3, 9, 10]
  }]
};

const customResolvers = {
  Query: {
    getNoteWithFullDataSet: () => customNoteWithFullDataSet
  }
};

const GET_COMMENTS = gql`
query getCommentDetailsAtOnce($id: ID!) {
    firstQuery: getComment(id: $id) {
        id,
        note {
          id,
          comments {
            text
          }
        }
    },
    secondQuery: getComment(id: $id) {
        id,
        note {
          title,
          comments {
            id
          }
        }
    }
}
`;

const GET_NOTE_WITH_CUSTOM_QUERY = gql`
query getNoteWithFullDataSet {
  getNoteWithFullDataSet {
      id,
      title,
      description,
      tasks {
        title
      },
      comments {
        id,
        text,
        description,
        metadata {
          id,
          opened
        },
        ratings
      }
    }
}`;

const FIND_NOTES_WITH_COUNT = gql`
query findNotes {
  findNotes {
    items {
      id
    }
    count
  }
}`;

const FIND_NOTES_WITHOUT_COUNT = gql`
query findNotes {
  findNotes {
    items {
      id
    }
  }
}`;

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
        port: process.env.POSTGRES_PORT || 5432
      }
    }
    db = Knex(dbMigrationsConfig);

    graphbackApi = buildGraphbackAPI(modelText, {
      dataProviderCreator: createKnexDbProvider(db),
      plugins: [
        new SchemaCRUDPlugin({ outputPath: "./output-postgres/schema/schema.graphql" }),
        new ClientCRUDPlugin({ outputFile: './output-postgres/client/graphback.graphql' })
      ]
    });

    const { newDB } = await migrateDB(dbMigrationsConfig, graphbackApi.schema);

    await seedDatabase(db);

    expect(newDB).toMatchSnapshot();

    const source = await loadDocuments(path.resolve(`./output-postgres/client/graphback.graphql`), {
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
    context: contextCreator,
    resolvers: [resolvers, customResolvers]
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
      createdAt,
      description: 'Note A Description',
      tasks: JSON.stringify([])
    },
    {
      title: 'Note B',
      createdAt,
      description: 'Note B Description',
      tasks: JSON.stringify([
        {
          title: 'Task 1'
        },
        {
          title: 'Task 2'
        }
      ])
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
      createdAt,
      description: 'Note A Comment Description',
      noteId: 1,
      objectId: objectId.toString(),
      metadataId: 1,
      ratings: JSON.stringify([4, 4, 3, 2])
    },
    {
      text: 'Note A Comment 2',
      createdAt,
      objectId: objectId.toString(),
      description: 'Note A Comment Description',
      noteId: 1,
      metadataId: 2,
    }
  ]);
}

test('Find all notes', async () => {
  const { data } = await client.query({ operationName: 'findNotes', query: documents });

  expect(data).toBeDefined();
  expect(data.findNotes).toEqual({
    items: [
      {
        id: '1',
        title: 'Note A',
        createdAt,
        description: 'Note A Description',
        tasks: [],
        comments: [
          {
            id: '1',
            text: 'Note A Comment',
            objectId: objectId.toString(),
            createdAt: createdAt.getTime(),
            description: 'Note A Comment Description',
            ratings: [4, 4, 3, 2]
          },
          {
            id: '2',
            text: 'Note A Comment 2',
            objectId: objectId.toString(),
            createdAt: createdAt.getTime(),
            description: 'Note A Comment Description',
            ratings: null
          }
        ]
      },
      {
        id: '2',
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

test('Find all notes with count', async () => {
  const { data } = await client.query({
    operationName: 'findNotes',
    query: FIND_NOTES_WITH_COUNT
  })

  expect(data).toBeDefined()
  expect(data.findNotes.count).toEqual(2)
})

test('Find all notes without count', async () => {
  const { data } = await client.query({
    operationName: 'findNotes',
    query: FIND_NOTES_WITHOUT_COUNT
  })

  expect(data).toBeDefined()
  expect(data.findNotes.count).toBeUndefined()
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
        createdAt,
        description: 'Note A Description',
        tasks: [],
        comments: [
          {
            id: '1',
            text: 'Note A Comment',
            objectId: objectId.toString(),
            createdAt: createdAt.getTime(),
            description: 'Note A Comment Description',
            ratings: [4, 4, 3, 2]
          },
          {
            id: '2',
            text: 'Note A Comment 2',
            objectId: objectId.toString(),
            createdAt: createdAt.getTime(),
            description: 'Note A Comment Description',
            ratings: null,
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
        objectId: objectId.toString(),
        createdAt: createdAt.getTime(),
        description: 'Note A Comment Description',
        ratings: [4, 4, 3, 2],
        note: {
          id: '1',
          title: 'Note A',
          createdAt,
          description: 'Note A Description'
        },
        metadata: {
          id: '1',
          opened: true
        }
      },
      {
        id: '2',
        createdAt: createdAt.getTime(),
        text: 'Note A Comment 2',
        objectId: objectId.toString(),
        description: 'Note A Comment Description',
        ratings: null,
        note: {
          id: '1',
          title: 'Note A',
          createdAt,
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

test('filter comments using built in scalars', async () => {
  const { data } = await client.query({
    operationName: "findComments", query: documents,
    variables: {
      filter: {
        createdAt: {
          eq: createdAt.getTime()
        }
      }
    }
  });

  expect(data).toBeDefined();
  expect(data.findComments).toEqual({
    items: [
      {
        id: '1',
        text: 'Note A Comment',
        objectId: objectId.toString(),
        createdAt: createdAt.getTime(),
        description: 'Note A Comment Description',
        ratings: [4, 4, 3, 2],
        note: {
          id: '1',
          title: 'Note A',
          createdAt,
          description: 'Note A Description'
        },
        metadata: {
          id: '1',
          opened: true
        }
      },
      {
        id: '2',
        createdAt: createdAt.getTime(),
        text: 'Note A Comment 2',
        objectId: objectId.toString(),
        description: 'Note A Comment Description',
        ratings: null,
        note: {
          id: '1',
          title: 'Note A',
          createdAt,
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
  const note = response.data.getNote;
  expect(note).toEqual({
    id: '1',
    title: 'Note A',
    createdAt,
    description: 'Note A Description',
    tasks: [],
    comments: [
      {
        id: '1',
        text: 'Note A Comment',
        objectId: objectId.toString(),
        createdAt: createdAt.getTime(),
        description: 'Note A Comment Description',
        ratings: [4, 4, 3, 2]
      },
      {
        id: '2',
        text: 'Note A Comment 2',
        objectId: objectId.toString(),
        createdAt: createdAt.getTime(),
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
    variables: { filter: { noteId: { eq: 1 } }, page: { limit: 1 } }
  });

  expect(response.data).toBeDefined()
  const comments = response.data.findComments
  expect(comments.items).toHaveLength(1);
  expect(comments.items).toEqual([
    {
      id: '1',
      text: 'Note A Comment',
      objectId: objectId.toString(),
      createdAt: createdAt.getTime(),
      description: 'Note A Comment Description',
      ratings: [4, 4, 3, 2],
      metadata: {
        id: "1",
        opened: true,
      },
      note: {
        description: "Note A Description",
        id: "1",
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
    variables: { filter: { noteId: { eq: 1 } }, page: { offset: 1 } }
  });

  expect(response.data).toBeDefined()
  const comments = response.data.findComments
  expect(comments.items).toHaveLength(1);
  expect(comments).toEqual({
    items: [
      {
        id: '2',
        text: 'Note A Comment 2',
        objectId: objectId.toString(),
        createdAt: createdAt.getTime(),
        description: 'Note A Comment Description',
        ratings: null,
        metadata: {
          "id": "2",
          "opened": false,
        },
        note: {
          "description": "Note A Description",
          "id": "1",
          createdAt,
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
  const createdAt = new Date();
  const response = await createNote(client, { title: 'New note', createdAt: createdAt.toJSON(), description: 'New note description', tasks: [{ title: "new task title" }] });
  expect(response.data).toBeDefined();
  expect(response.data.createNote).toEqual({ id: '3', title: 'New note', createdAt, description: 'New note description' });

  const { data } = await getNote('3', client);
  expect(data.getNote.tasks).toEqual([{ title: "new task title" }]);
})

test('Delete Note 1', async () => {
  const response = await deleteNote(client, '2');
  expect(response.data).toBeDefined();
  expect(response.data.deleteNote).toEqual({ id: '2', createdAt, description: 'Note B Description', title: 'Note B' });
});

test('getComment in simultaneous with different resolvers pinfo', async () => {
  const { data } = await client.query({
    operationName: "getCommentDetailsAtOnce", query: GET_COMMENTS, variables: {
      id: 1
    }
  });

  expect(data).toEqual({
    firstQuery: {
      id: "1",
      note: {
        id: "1",
        comments: [
          {
            text: "Note A Comment"
          },
          {
            text: "Note A Comment 2"
          }
        ]
      }
    },
    secondQuery: {
      id: "1",
      note: {
        title: "Note 1 New Title",
        comments: [
          {
            id: "1"
          },
          {
            id: "2"
          }
        ]
      }
    }
  });
})

test('get full dataset from custom query without querying the database again', async () => {
  const { data } = await client.query({ operationName: "getNoteWithFullDataSet", query: GET_NOTE_WITH_CUSTOM_QUERY });
  customNoteWithFullDataSet.comments[2].metadata = null;
  expect(data.getNoteWithFullDataSet).toEqual(customNoteWithFullDataSet);
})

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

