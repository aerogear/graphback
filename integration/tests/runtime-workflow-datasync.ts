/* eslint-disable max-lines */
/* eslint-disable no-null/no-null */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { mkdirSync, readFileSync, rmdirSync } from 'fs';
import * as path from 'path';
import { ApolloServer, gql } from "apollo-server";
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadDocuments } from '@graphql-tools/load'
import { buildGraphbackAPI, GraphbackAPI } from "graphback";
import { DocumentNode } from 'graphql';
import { MongoClient, Db } from 'mongodb';
import { PubSub } from "graphql-subscriptions";
import { createDataSyncMongoDbProvider, createDataSyncCRUDService, DataSyncPlugin, DataSyncFieldNames } from "../../packages/graphback-datasync";
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

const modelText = readFileSync("./datasync-mongodb-model.graphql").toString();
const startTS = new Date(1596622318448);

const SYNC_NOTES = gql`
query syncNotes($lastSync: GraphbackTimestamp!, $filter: NoteFilter, $limit: Int) {
    syncNotes(lastSync: $lastSync, filter: $filter, limit: $limit) {
        items {
          _id
          title
          description
          _lastUpdatedAt
          _deleted
        },
        lastSync
    }
}
`

beforeAll(async () => {
  try {
    mkdirSync("./output-datasync-mongo");
    mkdirSync("./output-datasync-mongo/client")

    mongoClient = new MongoClient('mongodb://mongodb:mongo@localhost:27017/users?authSource=admin', { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db('users');
    graphbackApi = buildGraphbackAPI(modelText, {
      dataProviderCreator: createDataSyncMongoDbProvider(db),
      serviceCreator: createDataSyncCRUDService({ pubSub: new PubSub() }),
      plugins: [
        new SchemaCRUDPlugin({ outputPath: "./output-datasync-mongo/schema/schema.graphql" }),
        new ClientCRUDPlugin({ outputFile: './output-datasync-mongo/client/graphback.graphql' }),
        new DataSyncPlugin()
      ]
    });

    await seedDatabase(db);

    const source = await loadDocuments(path.resolve(`./output-datasync-mongo/client/graphback.graphql`), {
      loaders: [
        new GraphQLFileLoader()
      ]
    });
    documents = source[0].document;
  } catch (e) {
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
  rmdirSync(path.resolve('./output-datasync-mongo'), { recursive: true });
  await db.dropCollection('note');

  return mongoClient.close();
});

async function seedDatabase(db: Db) {
  const notes = [
    {
      title: 'Note A',
      description: 'Note A Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false
    },
    {
      title: 'Note B',
      description: 'Note B Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false
    }
  ]

  for (const note of notes) {
    const { ops } = await db.collection("note").insertOne(note);
    notesId.push(ops[0]._id);
  }


}

test('Sync all notes', async () => {

  const { data, errors, extensions } = await client.query({ operationName:"syncNotes", query: SYNC_NOTES , variables: {
    lastSync: 0,
    filter: {}
  }});
  expect(data).toBeDefined();
  expect(data.syncNotes?.items).toEqual([
    {
      _id: notesId[0],
      title: 'Note A',
      description: 'Note A Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false
    },
    {
      _id: notesId[1],
      title: 'Note B',
      description: 'Note B Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false
    }
  ])
})

test('Sync all notes with filtering', async () => {

  const { data } = await client.query({ query: SYNC_NOTES , variables: {
    lastSync: 0,
    filter: {
      title: {
        eq: 'Note A'
      }
    }
  }});

  expect(data).toBeDefined();
  expect(data.syncNotes.items).toHaveLength(1);
  expect(data.syncNotes.items).toEqual([
    {
      _id: notesId[0],
      title: 'Note A',
      description: 'Note A Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false
    }
  ])
  expect(typeof data.syncNotes.lastSync).toEqual('number')
})

test('Sync all notes with limit', async () => {

  const { data } = await client.query({ query: SYNC_NOTES , variables: {
    lastSync: 0,
    limit: 1
  }});

  expect(data).toBeDefined();
  expect(data.syncNotes.items).toHaveLength(1);
  expect(data.syncNotes.items).toEqual([
    {
      _id: notesId[0],
      title: 'Note A',
      description: 'Note A Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false
    }
  ])
  expect(typeof data.syncNotes.lastSync).toEqual('number')
})

test('Should update lastUpdatedAt field on create', async () => {
  const createResponse = await createNote(client, { title: 'Note C'});

  expect(createResponse.data).toBeDefined();
  expect(typeof createResponse.data.createNote[DataSyncFieldNames.lastUpdatedAt]).toEqual('number')
})

test('Should update lastUpdatedAt field on update', async () => {
  const updateResponse = await updateNote({ _id: notesId[1], description: 'Note B Description'}, client);

  expect(updateResponse.data).toBeDefined();
  expect(typeof updateResponse.data.updateNote[DataSyncFieldNames.lastUpdatedAt]).toEqual('number');
  expect(updateResponse.data.updateNote[DataSyncFieldNames.lastUpdatedAt]).not.toEqual(startTS.valueOf());
})

test('Should update lastUpdatedAt and deleted on delete', async () => {
  const createResponse = await createNote(client, { title: 'Note X'});
  const noteId = createResponse.data?.createNote._id;

  const deleteResponse = await deleteNote(client, noteId.toString())
  expect(deleteResponse.data).toBeDefined();
  expect(typeof deleteResponse.data.deleteNote[DataSyncFieldNames.lastUpdatedAt]).toEqual('number');
  expect(deleteResponse.data.deleteNote[DataSyncFieldNames.lastUpdatedAt]).not.toEqual(createResponse.data[DataSyncFieldNames.lastUpdatedAt]);

  const syncResponse = await client.query({ query: SYNC_NOTES , variables: {
    lastSync: createResponse.data.createNote[DataSyncFieldNames.lastUpdatedAt],
    filter: {
      title: {
        eq: 'Note X'
      }
    }
  }});

  expect(syncResponse.data).toBeDefined();
  const { data } = syncResponse;
  expect(data.syncNotes.items).toHaveLength(1);
  expect(data.syncNotes.items[0][DataSyncFieldNames.deleted]).toEqual(true);
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

async function deleteNote(client: ApolloServerTestClient, _id:  string | number) {
  const response = await client.mutate({
    operationName: "deleteNote",
    mutation: documents,
    variables: { input: { _id } }
  });

  return response;
}
