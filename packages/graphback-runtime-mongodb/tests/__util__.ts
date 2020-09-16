import { MongoMemoryServer } from 'mongodb-memory-server-global';
import { MongoClient, Db, Collection } from 'mongodb';
import { buildSchema } from 'graphql';
import { GraphbackPluginEngine } from '@graphback/core';
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';

export interface Context {
  providers: { [modelname: string]: MongoDBDataProvider };
  server: MongoMemoryServer,
  db: Db,
  findIndex(collectionName: string, indexName: string): Promise<any>;
}

export async function createTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
  // Setup graphback
  const schema = buildSchema(schemaStr);

  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('test');

  const defautConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const pluginEngine = new GraphbackPluginEngine({ schema, plugins: [new SchemaCRUDPlugin()] })
  const metadata = pluginEngine.createResources();

  const providers: { [name: string]: MongoDBDataProvider } = {}
  const models = metadata.getModelDefinitions()
  for (const model of models) {
    providers[model.graphqlType.name] = new MongoDBDataProvider(model, db);
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

  const waitTime = 2000;
  const findIndex = async (collectionName: string, indexName: string) => {
    const startTime = Date.now();

    do {
      const collections = await db.collections();
      const collectionFound = collections.find((collection: Collection) => collection.collectionName === collectionName);
      if (collectionFound) {
        const indexes = await collectionFound.indexes();
        const foundIndex = await indexes.find((index: any) => index.key[indexName]);
        if (foundIndex) {
          return foundIndex
        }
      };
    } while (Date.now() - startTime < waitTime)

  }

  return { server, providers, db, findIndex }
}
