import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db, Collection } from 'mongodb';
import { buildSchema, GraphQLSchema } from 'graphql';
import { GraphbackCoreMetadata, GraphbackPluginEngine } from '@graphback/core';
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { createDataSyncConflictProviderCreator, DataSyncPlugin, DataSyncProvider, GlobalConflictConfig } from '../src';

export interface Context {
  metadata: GraphbackCoreMetadata;
  providers: { [modelname: string]: DataSyncProvider };
  server: MongoMemoryServer,
  db: Db,
  findIndex(collectionName: string, indexName: string): Promise<any>;
}

export async function createTestingContext(schemaStr: string, config?: { seedData?: { [collection: string]: any[] }, conflictConfig?: GlobalConflictConfig }): Promise<Context> {
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

  const schemaGenerator = new SchemaCRUDPlugin();
  const DataSyncGenerator = new DataSyncPlugin({ conflictConfig: config?.conflictConfig });
  const pluginEngine = new GraphbackPluginEngine({ schema, config: { crudMethods: defautConfig }, plugins: [schemaGenerator, DataSyncGenerator] })
  const metadata = pluginEngine.createResources()

  const createProvider = createDataSyncConflictProviderCreator(db, config?.conflictConfig);

  const providers: { [name: string]: DataSyncProvider } = {}
  const models = metadata.getModelDefinitions();
  for (const model of models) {
    providers[model.graphqlType.name] = createProvider(model) as DataSyncProvider;
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
        const foundIndex = indexes.find((index: any) => index.key[indexName]);
        if (foundIndex) { return foundIndex };
      };
    } while (Date.now() - startTime < waitTime)

  }

  return { server, providers, db, findIndex, metadata }
}
