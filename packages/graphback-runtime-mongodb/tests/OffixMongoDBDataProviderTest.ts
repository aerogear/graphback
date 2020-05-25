import { MongoMemoryServer } from 'mongodb-memory-server';
import { ObjectID, MongoClient } from 'mongodb';
import { buildSchema } from 'graphql';
import { filterModelTypes } from '@graphback/core';
import { OffixMongoDBDataProvider } from "../src/OffixMongoDBDataProvider";

export interface Context {
    providers: { [modelname: string]: OffixMongoDBDataProvider };
    server: MongoMemoryServer
  }

async function createOffixTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
    // Setup graphback
    const schema = buildSchema(schemaStr);

    const server = new MongoMemoryServer();
    const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test');

    const providers: { [name: string]: OffixMongoDBDataProvider } = {}
    const models = filterModelTypes(schema)
    for (const modelType of models) {
        providers[modelType.name] = new OffixMongoDBDataProvider(modelType, db);
    }

    // if seed data is supplied, insert it into collections
    if (config?.seedData) {
        const collectionNames = Object.keys(config.seedData);
        for (const collectionName of collectionNames) {
            for (const element of config.seedData[collectionName]) {
                await providers[collectionName].create(element);
            }
        };
    }

    return { server, providers }
}

describe('OffixMongoDBDataProvider', () => {
    interface Todo {
        id: ObjectID;
        text: string;
    }
    let context: Context;

    const noteSchema = `
directive @createdAt on FIELD_DEFINITION
directive @updatedAt on FIELD_DEFINITION

"""@model"""
type Note {
  id: ID!
  text: String
  created: String @createdAt
  lastModified: String @updatedAt
  version: Int 
}
      `;

    const defaultNoteSeed = [
        {
            text: 'note'
        },
        {
            text: 'note2'
        }
    ]

    afterEach(() => context.server.stop());

    it.only('can maintain createdAt timestamp', async () => {
        context = await createOffixTestingContext(noteSchema);
        const res = await context.providers.Note.create({ text: "asdfxyz"});
        
        expect(res.text).toEqual('asdfxyz');
        expect(res.created.getTime()).toBeGreaterThanOrEqual(0);
    });

    it.only('can maintain createdAt timestamp', async () => {
        context = await createOffixTestingContext(noteSchema);
        const res = await context.providers.Note.create({ text: "asdfxyz"});
        
        expect(res.lastModified.getTime()).toBeGreaterThanOrEqual(0);
        expect(res.lastModified.getTime()).toEqual(res.created.getTime());

        const mRes = await context.providers.Note.update({
            id: res.id,
            text: "asdfsoap",
            version: 1
        });

        expect(mRes.lastModified.getTime()).toBeGreaterThan(mRes.created.getTime());
    });
});
