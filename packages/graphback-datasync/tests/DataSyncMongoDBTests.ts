/* eslint-disable max-lines */
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { buildSchema } from 'graphql';
import { GraphbackCoreMetadata, metadataMap, NoDataError, defaultTableNameTransform } from '@graphback/core';
import { advanceTo } from "jest-date-mock";
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { DataSyncMongoDBDataProvider, DataSyncPlugin, DataSyncFieldNames } from '../src';

const {fieldNames} = metadataMap;
export interface Context {
  providers: { [modelname: string]: DataSyncMongoDBDataProvider };
  server: MongoMemoryServer,
  db: Db
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

  const schemaGenerator = new SchemaCRUDPlugin();
  const DataSyncGenerator = new DataSyncPlugin();
  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautConfig
  }, schema)
  metadata.setSchema(schemaGenerator.transformSchema(metadata));
  metadata.setSchema(DataSyncGenerator.transformSchema(metadata));

  const providers: { [name: string]: DataSyncMongoDBDataProvider } = {}
  const models = metadata.getModelDefinitions();
  for (const model of models) {
    providers[model.graphqlType.name] = new DataSyncMongoDBDataProvider(model, db);
  }

  // if seed data is supplied, insert it into collections
  if (config?.seedData) {
    const collectionNames = Object.keys(config.seedData);
    for (const collectionName of collectionNames) {
      for (const element of config.seedData[collectionName]) {
        await providers[collectionName].create(element, {graphback: {services: {}, options: { selectedFields: ["_id"]}}});
      }
    };
  }

  return { server, providers, db }
}

const fields = ["_id", "text"];
const postSchema = `
"""
@model
@datasync(
  ttl: 604800
)
"""
type Post {
  _id: GraphbackObjectID!
  text: String!
}

scalar GraphbackObjectID
`;

describe('Soft deletion test', () => {
  let context: Context;
  afterEach(async () => context.server.stop());

  it('sets deleted to false on creation', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    const first = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [DataSyncFieldNames.deleted]}}});
    expect(first[DataSyncFieldNames.deleted]).toEqual(false)
  })

  it('sets deleted to true on deletion', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;
    const createdPost = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt]}}});

    // check count
    let count = await Post.count({});
    expect(count).toEqual(1);

    // delete the Post
    const deletedPost = await Post.delete({ _id: createdPost._id }, {graphback: {services: {}, options: { selectedFields: [DataSyncFieldNames.deleted]}}});
    expect(deletedPost[DataSyncFieldNames.deleted]).toEqual(true);

    // re check count after deletion
    count = await Post.count({});
    expect(count).toEqual(0);

    // Tests that we cannot find, update or delete it anymore
    // This test fails if we can still can
    await expect(Post.findOne({ _id: createdPost._id }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(NoDataError);
  })

  it('sets ttl field on deletion', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;
    const createdPost = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt]}}});

    // check count
    const count = await Post.count({});
    expect(count).toEqual(1);

    // delete the Post
    const deletedPost = await Post.delete({ _id: createdPost._id }, {graphback: {services: {}, options: { selectedFields: [DataSyncFieldNames.deleted, DataSyncFieldNames.ttl]}}});
    expect(deletedPost[DataSyncFieldNames.deleted]).toEqual(true);
    expect(deletedPost[DataSyncFieldNames.ttl] instanceof Date).toEqual(true);
  })

  it('cannot update a deleted document', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;
    const createdPost = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt]}}});

    // check count
    let count = await Post.count({});
    expect(count).toEqual(1);

    // delete the Post
    const deletedPost = await Post.delete({ _id: createdPost._id }, {graphback: {services: {}, options: { selectedFields: [DataSyncFieldNames.deleted]}}});
    expect(deletedPost[DataSyncFieldNames.deleted]).toEqual(true);

    // re check count after deletion
    count = await Post.count({});
    expect(count).toEqual(0);

    await expect(Post.update({ _id: createdPost._id, text: 'an update too late' }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(NoDataError);
  })

  it('cannot delete a deleted document', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;
    const createdPost = await Post.create({ text: 'TestPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt]}}});

    // check count
    let count = await Post.count({});
    expect(count).toEqual(1);

    // delete the Post
    const deletedPost = await Post.delete({ _id: createdPost._id }, {graphback: {services: {}, options: { selectedFields: [DataSyncFieldNames.deleted]}}});
    expect(deletedPost[DataSyncFieldNames.deleted]).toEqual(true);

    // re check count after deletion
    count = await Post.count({});
    expect(count).toEqual(0);

    await expect(Post.delete({ _id: createdPost._id }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(NoDataError);
  })

  it('sets _deleted when field absent', async () => {
    context = await createTestingContext(postSchema);

    const { db, providers } = context;
    const { Post } = providers;

    const postid = await (await db.collection(defaultTableNameTransform('Post', 'to-db')).insertOne({ text: 'TestPost'})).insertedId

    const updateTime = 1593263130987
    advanceTo(updateTime);
    const deletedPost = await Post.delete({ _id: postid, text: 'SeriousPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt, DataSyncFieldNames.deleted]}}});
    expect(deletedPost[DataSyncFieldNames.lastUpdatedAt]).toEqual(updateTime)
    expect(deletedPost[DataSyncFieldNames.deleted]).toEqual(true);
  })
})

describe('Delta Queries', () => {
  let context: Context;
  afterEach(async () => context.server.stop());

  it('creates index for the lastUpdateAt field', async () => {

    context = await createTestingContext(postSchema);

    const indexes = await context.db.collection('post').indexes();

    expect(indexes[1]).toMatchObject(
      {
        "key": {
          [DataSyncFieldNames.lastUpdatedAt]: 1
        },
        "name": "Datasync_lastUpdatedAt",
        "ns": "test.post"
      }
    )
  })

  it('creates index for the deleted field', async () => {

    context = await createTestingContext(postSchema);

    const indexes = await context.db.collection('post').indexes();

    expect(indexes[2]).toMatchObject(
      {
        "key": {
          [DataSyncFieldNames.deleted]: 1
        },
        "name": `${DataSyncFieldNames.deleted}_1`,
        "ns": "test.post"
      }
    )
  })

  it('creates index for the ttl field', async () => {

    context = await createTestingContext(postSchema);

    const indexes = await context.db.collection('post').indexes();

    expect(indexes[3]).toMatchObject(
      {
        "key": {
          [DataSyncFieldNames.ttl]: 1
        },
        "name": `${DataSyncFieldNames.ttl}_1`,
        "ns": "test.post",
        "expireAfterSeconds": 0
      }
    )
  })

  it('sets lastUpdatedAt on creation', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    const startTime = 1596124093173;
    advanceTo(startTime);
    // Create some posts

    const createdPost = await Post.create({ text: 'Test Post' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt]}}});

    expect(createdPost[DataSyncFieldNames.lastUpdatedAt]).toEqual(startTime);
  });

  it('sets lastUpdatedAt on update', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    const startTime = 1596124093173;
    advanceTo(startTime);
    // Create a posts

    const createdPost = await Post.create({ text: 'Test Post' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt]}}});

    const updateTime = 1593263130987
    advanceTo(updateTime);

    // Update the post
    const updatedPost = await Post.update({ _id: createdPost._id, text: 'Test Post' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt, DataSyncFieldNames.deleted]}}});
    expect(updatedPost[DataSyncFieldNames.lastUpdatedAt]).toEqual(updateTime)
  });

  it('sets lastUpdatedAt field when absent', async () => {
    context = await createTestingContext(postSchema);

    const { db, providers } = context;
    const { Post } = providers;

    const postid = await (await db.collection(defaultTableNameTransform('Post', 'to-db')).insertOne({ text: 'TestPost'})).insertedId

    const updateTime = 1593263130987
    advanceTo(updateTime);
    const updatedPost = await Post.update({ _id: postid, text: 'SeriousPost' }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.lastUpdatedAt, DataSyncFieldNames.deleted]}}});
    expect(updatedPost[DataSyncFieldNames.lastUpdatedAt]).toEqual(updateTime)
  })

  it('can sync', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    const startTime = 1596124093173;
    advanceTo(startTime);
    // Create some posts

    await Post.create({ text: 'the first post' }, {graphback: {services: {}, options: { selectedFields: fields}}});

    const t1 = 1596124171069
    advanceTo(t1)

    await Post.create({ text: 'the second post' }, {graphback: {services: {}, options: { selectedFields: fields}}});

    // Sync query
    const deltaPosts = await Post.sync(new Date(t1), {graphback: {services: {}, options: { selectedFields: fields}}});

    expect(deltaPosts.length).toEqual(1);
  });

  it('can filter sync queries', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    // Create some posts
    for (const postTitle of ["post", "post2", "trains"]) {
      await Post.create({ text: postTitle }, {graphback: {services: {}, options: { selectedFields: fields}}});
    }

    // Sync query
    const deltaPosts = await Post.sync(new Date(0), {graphback: {services: {}, options: { selectedFields: fields}}}, {
      text: {
        startsWith: 'post'
      }
    });

    expect(deltaPosts.length).toEqual(2);

    for (const p of deltaPosts) {
      expect(p.text).toMatch(/^post/g);
    }

    // check count
    const count = await Post.count({
      text: {
        startsWith: 'post'
      }
    });
    expect(count).toEqual(2);
  })

  it('can limit sync queries', async () => {
    context = await createTestingContext(postSchema);

    const { Post } = context.providers;

    // Create some posts
    for (const postTitle of ["post", "post2", "trains"]) {
      await Post.create({ text: postTitle }, {graphback: {services: {}, options: { selectedFields: fields}}});
    }

    // Sync query
    const deltaPosts = await Post.sync(new Date(0), {graphback: {services: {}, options: { selectedFields: fields}}}, undefined, 1);

    expect(deltaPosts.length).toEqual(1);
  })
})
