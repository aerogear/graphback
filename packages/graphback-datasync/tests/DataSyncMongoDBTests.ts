import { MongoMemoryServer } from 'mongodb-memory-server';
import { ObjectID, MongoClient } from 'mongodb';
import { buildSchema } from 'graphql';
import { filterModelTypes, GraphbackCoreMetadata } from '@graphback/core';
import { advanceTo, advanceBy } from "jest-date-mock";
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { DataSyncMongoDBDataProvider, DataSyncPlugin } from '../src';

export interface Context {
    providers: { [modelname: string]: DataSyncMongoDBDataProvider };
    server: MongoMemoryServer
  }

  export async function createTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
      // Setup graphback
      let schema = buildSchema(schemaStr);

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

      const schemaGenerator = new SchemaCRUDPlugin({ outputPath: './tmp', format: 'graphql'})
      const DataSyncGenerator = new DataSyncPlugin()
      const metadata = new GraphbackCoreMetadata({
        crudMethods: defautConfig
      }, schema)
      metadata.setSchema(schemaGenerator.transformSchema(metadata))
      metadata.setSchema(DataSyncGenerator.transformSchema(metadata));
      schema = metadata.getSchema();

      const providers: { [name: string]: DataSyncMongoDBDataProvider } = {}
      const models = filterModelTypes(schema)
      for (const modelType of models) {
        providers[modelType.name] = new DataSyncMongoDBDataProvider(modelType, db);
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

describe('Soft deletion test', () => {
  let context: Context;
  afterEach(() => context.server.stop());

  it('sets deleted to false on creation', async () => {
    context = await createTestingContext(`
    """
    @model
    @versioned
    @delta
    """
    type Post {
      id: ID!
      text: String!
    }
    `);

    const { Post }  = context.providers;

    const first = await Post.create({ text: 'TestPost' });
    expect(first._deleted).toEqual(false)
  })

  it('sets deleted to true on deletion', async () => {
    context = await createTestingContext(`
    """
    @model
    @versioned
    @delta
    """
    type Post {
      id: ID!
      text: String!
    }
    `);

    const { Post }  = context.providers;
    const startTime = 1590679886048;
    const deleteTime = 1590679887032;
    advanceTo(startTime);
    const { id } = await Post.create({ text: 'TestPost' });
    advanceTo(deleteTime);
    const deletedPost = await Post.delete({ id });
    expect(deletedPost._deleted).toEqual(true);
    expect(deletedPost.updatedAt).toEqual(deleteTime);

    // Tests that we cannot find it anymore
    expect(Post.findOne({id})).rejects.toThrow();
  })

  it('can filter sync queries', async () => {
    context = await createTestingContext(`
    """
    @model
    @versioned
    @delta
    """
    type Post {
      id: ID!
      text: String!
    }
    `);

    const { Post }  = context.providers;

    // Create some posts
    for (const postTitle of ["post", "post2", "trains"]) {
      await Post.create({ text: postTitle });
    }

    // Sync query
    const deltaPosts = await Post.sync("0", {
      text: {
        startsWith: 'post'
      }
    });

    expect(deltaPosts.length).toEqual(2);

    for (const p of deltaPosts) {
      expect(p.text).toMatch(/^post/g);
    }

  })
})
