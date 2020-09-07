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
import { loadDocuments } from '@graphql-tools/load'
import { GraphbackAPI } from "graphback";
import { DocumentNode } from 'graphql';
import { MongoClient, Db } from 'mongodb';
import { getDeltaTableName, DataSyncFieldNames, createDataSyncAPI } from "../../packages/graphback-datasync";
import { SchemaCRUDPlugin } from '../../packages/graphback-codegen-schema';
import { ClientCRUDPlugin } from '../../packages/graphback-codegen-client';
import { MONGO_DB_URL } from '../__util__/mongoUtil';

/** global config */
let db: Db;
let mongoClient: MongoClient;
let server: ApolloServer;
let client: ApolloServerTestClient;
let graphbackApi: GraphbackAPI;

let documents: DocumentNode;

const SYNC_NOTES = gql`
query syncNotes($lastSync: GraphbackTimestamp!, $filter: NoteFilter, $limit: Int) {
    syncNotes(lastSync: $lastSync, filter: $filter, limit: $limit) {
        items {
          _id
          title
          description
          ${DataSyncFieldNames.lastUpdatedAt}
          ${DataSyncFieldNames.deleted}
          ${DataSyncFieldNames.version}
        },
        lastSync
    }
}
`

const notesId = [];

const modelText = readFileSync("./datasync-mongodb-model.graphql").toString();
const startTS = new Date(1596622318448);

beforeAll(async () => {
  try {
    mkdirSync("./output-datasync-conflict-mongo");
    mkdirSync("./output-datasync-conflict-mongo/client")

    mongoClient = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db('users');
    graphbackApi = createDataSyncAPI(modelText, { db, conflictConfig: { models: { Note: { enabled: true } } }, graphbackAPIConfig: {
      plugins: [
        new SchemaCRUDPlugin({ outputPath: "./output-datasync-conflict-mongo/schema/schema.graphql" }),
        new ClientCRUDPlugin({ outputFile: './output-datasync-conflict-mongo/client/graphback.graphql' }),
      ]
    } });

    await seedDatabase(db);

    const source = await loadDocuments(path.resolve(`./output-datasync-conflict-mongo/client/graphback.graphql`), {
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
  rmdirSync(path.resolve('./output-datasync-conflict-mongo'), { recursive: true });
  const dropCollections = ["note", getDeltaTableName("note")].map((name: string) => db.dropCollection(name));
  await Promise.all(dropCollections);

  return mongoClient.close();
});

async function seedDatabase(db: Db) {
  const notes = [
    {
      title: 'Note A',
      description: 'Note A Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false,
      [DataSyncFieldNames.version]: 1
    },
    {
      title: 'Note B',
      description: 'Note B Description',
      [DataSyncFieldNames.lastUpdatedAt]: startTS.valueOf(),
      [DataSyncFieldNames.deleted]: false,
      [DataSyncFieldNames.version]: 1
    }
  ]

  for (const note of notes) {
    const { ops } = await db.collection("note").insertOne(note);
    notesId.push(ops[0]._id);
    await db.collection(getDeltaTableName('note')).insertOne({
      docId: ops[0]._id,
      [DataSyncFieldNames.version]: 1,
      document: ops[0]
    })
  }
}


test('Should update successfully when no conflict', async () => {
  const updatedTitle = 'Note A v2';
  const firstUpdateResponse = await updateNote({ _id: notesId[0], title: updatedTitle, [DataSyncFieldNames.version]: 1 }, client);

  expect(firstUpdateResponse.data?.updateNote).toBeDefined();
  expect(firstUpdateResponse.data.updateNote.title).toEqual(updatedTitle);

  const updatedDescription = "Note A Description v2";
  const secondUpdateResponse = await updateNote({ _id: notesId[0], description: updatedDescription, [DataSyncFieldNames.version]: 1 }, client);

  expect(secondUpdateResponse.data?.updateNote).toBeDefined();
  expect(secondUpdateResponse.data.updateNote.description).toEqual(updatedDescription);
})

test('Client side should win when conflict occurs', async () => {
  const updatedTitle = 'Note B v2';
  const firstUpdateResponse = await updateNote({ _id: notesId[0], title: updatedTitle, [DataSyncFieldNames.version]: 1 }, client);

  expect(firstUpdateResponse.data?.updateNote).toBeDefined();
  expect(firstUpdateResponse.data.updateNote.title).toEqual(updatedTitle);


  const secondUpdateTitle = "Note B v3";
  const secondUpdateResponse = await updateNote({ _id: notesId[0], title: secondUpdateTitle, [DataSyncFieldNames.version]: 1 }, client);

  expect(secondUpdateResponse.data?.updateNote).toBeDefined();
  expect(secondUpdateResponse.data.updateNote.title).toEqual(secondUpdateTitle);
})

test('force deletes on delete conflicts', async () => {
  const noteTitle = 'Note C';
  const noteDescription = "Note C Description";
  const createResponse = await createNote(client, { title: noteTitle, description: noteDescription });

  expect(createResponse.data?.createNote).toBeDefined();
  expect(createResponse.data.createNote.title).toEqual(noteTitle);

  const {_id} = createResponse.data.createNote;

  const updatedTitle = "Note C v2";
  await updateNote({ _id, title: updatedTitle, [DataSyncFieldNames.version]: 1 }, client);

  await deleteNote(client, { _id, [DataSyncFieldNames.version]: 1 })

  const { data } = await client.query({ query: SYNC_NOTES , variables: {
    lastSync: 0,
    filter: {
      title: {
        eq: updatedTitle
      }
    }
  }});
  expect(data.syncNotes.items).toBeDefined();
  expect(data.syncNotes.items[0]._id).toEqual(_id);
  expect(data.syncNotes.items[0][DataSyncFieldNames.deleted]).toEqual(true);
});

test('deletes document when no conflicts occur', async () => {
  const noteTitle = 'Note D';
  const noteDescription = "Note D Description";
  const createResponse = await createNote(client, { title: noteTitle, description: noteDescription });

  expect(createResponse.data?.createNote).toBeDefined();
  expect(createResponse.data.createNote.title).toEqual(noteTitle);

  const { _id, [DataSyncFieldNames.version]: version } = createResponse.data.createNote;

  const updatedTitle = "Note D v2";
  const updateResponse = await updateNote({ _id, title: updatedTitle, [DataSyncFieldNames.version]: version }, client);

  expect(updateResponse.data?.updateNote).toBeDefined();

  const {[DataSyncFieldNames.version]: updatedVersion} = updateResponse.data.updateNote;

  await deleteNote(client, { _id, [DataSyncFieldNames.version]: updatedVersion })

  const { data } = await client.query({ query: SYNC_NOTES , variables: {
    lastSync: 0,
    filter: {
      title: {
        eq: updatedTitle
      }
    }
  }});

  expect(data.syncNotes.items).toBeDefined();
  expect(data.syncNotes.items[0]._id).toEqual(_id);
  expect(data.syncNotes.items[0][DataSyncFieldNames.deleted]).toEqual(true);

});

test('restores document when server-side deleted', async () => {
  const noteTitle = 'Note E';
  const noteDescription = "Note E Description";
  const createResponse = await createNote(client, { title: noteTitle, description: noteDescription });

  expect(createResponse.data?.createNote).toBeDefined();
  expect(createResponse.data.createNote.title).toEqual(noteTitle);

  const { _id, [DataSyncFieldNames.version]: version } = createResponse.data.createNote;

  const deleteResponse = await deleteNote(client, { _id, [DataSyncFieldNames.version]: version })
  expect(deleteResponse.data.deleteNote).toBeDefined();

  const updatedTitle = "Note E v2";
  const updateResponse = await updateNote({ _id, title: updatedTitle, [DataSyncFieldNames.version]: version }, client);

  expect(updateResponse.data?.updateNote).toBeDefined();

  const { data } = await client.query({ query: SYNC_NOTES , variables: {
    lastSync: 0,
    filter: {
      title: {
        eq: updatedTitle
      }
    }
  }});

  expect(data.syncNotes.items).toBeDefined();
  expect(data.syncNotes.items[0]._id).toEqual(_id);
  expect(data.syncNotes.items[0].title).toEqual(updatedTitle);
  expect(data.syncNotes.items[0][DataSyncFieldNames.deleted]).toEqual(false);

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

async function deleteNote(client: ApolloServerTestClient, input: any) {
  const response = await client.mutate({
    operationName: "deleteNote",
    mutation: documents,
    variables: { input }
  });

  return response;
}
