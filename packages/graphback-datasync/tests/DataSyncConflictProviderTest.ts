/* eslint-disable max-lines */
import { NoDataError } from '@graphback/core';
import { Context, createTestingContext } from './__util__';
import { ConflictError, DataSyncFieldNames, ServerSideWins, ConflictResolutionStrategy, ConflictMetadata, getDeltaTableName } from '../src';

describe('DataSyncConflictMongoDBDataProvider', () => {
  let context: Context;
  afterEach(async () => context.server.stop());
  const fields = ["_id", "title"];
  const postSchema = `
  """
  @model
  @datasync(
    ttl: 5184000
  )
  """
  type Post {
    _id: GraphbackObjectID!
    title: String!
    content: String
  }

  scalar GraphbackObjectID
  `;

  test('conflict does not occur when changes can be merged', async () => {
    const resolveUpdate = jest.fn((_: ConflictMetadata) => {return {}});
    const resolveDelete = jest.fn((_: ConflictMetadata) => {return {}});
    const mockConflictStrategy:ConflictResolutionStrategy = {
      resolveUpdate,
      resolveDelete
    }
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true, conflictResolution: mockConflictStrategy } }} });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updatedContent = "Post 1 content v2";
    await Post.update({ _id, content: updatedContent, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}})

    const updateTitle = "Post 1 v2";
    await Post.update({ _id, title: updateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}});

    expect(resolveUpdate.mock.calls.length).toEqual(0);
    expect(resolveDelete.mock.calls.length).toEqual(0);
  })

  it('creates TTL Indexes', async () => {
    context = await createTestingContext(`
      """
      @model
      @datasync(
        ttl: 5184000
      )
      """
      type Note {
        _id: GraphbackObjectID!
        text: String
      }

      scalar GraphbackObjectID
      `, {conflictConfig: { models: { Note: { enabled: true }}}});


    const index = await context.findIndex('note', DataSyncFieldNames.ttl);

    expect(index).toMatchObject(
      {
        "key": {
          [DataSyncFieldNames.ttl]: 1
        },
        "name": `${DataSyncFieldNames.ttl}_1`,
        "ns": "test.note",
        "expireAfterSeconds": 0
      }
    )

    const deltaCollectionName = getDeltaTableName("note");

    const deltaIndex = await context.findIndex(deltaCollectionName, DataSyncFieldNames.ttl);
    expect(deltaIndex).toMatchObject(
      {
        "key": {
          [DataSyncFieldNames.ttl]: 1
        },
        "name": `${DataSyncFieldNames.ttl}_1`,
        "ns": `test.${deltaCollectionName}`,
        "expireAfterSeconds": 0
      }
    )
  })

  test('throws conflict error when base cannot be found', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updatedContent = "Post 1 content v2";
    await expect(Post.update({ _id, content: updatedContent, [DataSyncFieldNames.version]: 0.5 },{graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(ConflictError);
  });

  test('throws NoDataError when serverData cannot be found', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const updatedContent = "Post 1 content v2";
    await expect(Post.update({ _id: "NotAValidObjectId", content: updatedContent, [DataSyncFieldNames.version]: 1 },{graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(NoDataError);
  });
})


describe('Client Side wins Conflict resolution', () => {
  let context: Context;
  afterEach(async () => context.server.stop());
  const fields = ["_id", "title"];
  const postSchema = `
  """
  @model
  @datasync(
    ttl: 5184000
  )
  """
  type Post {
    _id: GraphbackObjectID!
    title: String!
    content: String
  }

  scalar GraphbackObjectID
  `;

  it ('updates successfully when correct version passed', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updateTitle = "Post 1 v2";
    const { title, [DataSyncFieldNames.version]: updatedVersion } = await Post.update({ _id, title: updateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.version] }}})

    expect(title).toEqual(updateTitle);
    expect(updatedVersion).toEqual(version + 1);
  });

  it ('client data wins when conflict occurs', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    await Post.update({ _id, title: "Post 1 v2", [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}})

    const finalUpdateTitle = "Post 1 v3";
    const updatedPost = await Post.update({ _id, title: finalUpdateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}});

    expect(updatedPost.title).toEqual(finalUpdateTitle);
  });

  it('restore document on update when server-side deleted', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    await Post.delete({ _id, [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: fields}}});

    const updatedTitle = "Post 1 v2";
    const updatedPost = await Post.update({ _id, title: updatedTitle,  [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.deleted]}}})

    expect(updatedPost.title).toEqual(updatedTitle);
    expect(updatedPost[DataSyncFieldNames.deleted]).toEqual(false);
  });

  it ('merges changes when no conflict', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updatedContent = "Post 1 content v2";
    await Post.update({ _id, content: updatedContent, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}})

    const updateTitle = "Post 1 v2";
    const updatedPost = await Post.update({ _id, title: updateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}});

    expect(updatedPost.title).toEqual(updateTitle);
    expect(updatedPost.content).toEqual(updatedContent);
  });

  it ('force deletes if conflict occurs', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } } } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updatedTitle = "Post 1 v2";
    await Post.update({ _id, title: updatedTitle,  [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.deleted]}}});

    const deletedPost = await Post.delete({ _id, [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.deleted]}}});

    expect(deletedPost[DataSyncFieldNames.deleted]).toEqual(true);
  });
});

describe('Server Side wins Conflict resolution', () => {
  let context: Context;
  afterEach(async () => context.server.stop());
  const fields = ["_id", "title"];
  const postSchema = `
  """
  @model
  @datasync(
    ttl: 5184000
  )
  """
  type Post {
    _id: GraphbackObjectID!
    title: String!
    content: String
  }

  scalar GraphbackObjectID
  `;

  it ('updates successfully when correct version passed', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true, } }, conflictResolution: ServerSideWins }});

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updateTitle = "Post 1 v2";
    const { title, [DataSyncFieldNames.version]: updatedVersion } = await Post.update({ _id, title: updateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.version] }}})

    expect(title).toEqual(updateTitle);
    expect(updatedVersion).toEqual(version + 1);
  });

  it ('server data wins when conflict occurs', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } }, conflictResolution: ServerSideWins } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updateTitle = "Post 1 v2";
    await Post.update({ _id, title: updateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}})

    const finalUpdateTitle = "Post 1 v3";
    const updatedPost = await Post.update({ _id, title: finalUpdateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}});

    expect(updatedPost.title).toEqual(updateTitle);
  });

  it('throws error on update when server-side deleted', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } }, conflictResolution: ServerSideWins } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    await Post.delete({ _id, [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: fields}}});

    const updatedTitle = "Post 1 v2";
    await expect(Post.update({ _id, title: updatedTitle,  [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.deleted]}}})).rejects.toThrowError(ConflictError);
  });

  it ('merges changes when no conflict', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } }, conflictResolution: ServerSideWins } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updatedContent = "Post 1 content v2";
    await Post.update({ _id, content: updatedContent, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}})

    const updateTitle = "Post 1 v2";
    const updatedPost = await Post.update({ _id, title: updateTitle, [DataSyncFieldNames.version]: version },{graphback: {services: {}, options: { selectedFields: fields}}});

    expect(updatedPost.title).toEqual(updateTitle);
    expect(updatedPost.content).toEqual(updatedContent);
  });

  it ('throw error on deletes if conflict occurs', async () => {
    context = await createTestingContext(postSchema, { conflictConfig: { models: { Post: { enabled: true } }, conflictResolution: ServerSideWins } });

    const { Post } = context.providers;

    const { _id, [DataSyncFieldNames.version]: version } = await Post.create({ title: "Post 1", content: "Post 1 content" }, {graphback: {services: {}, options: { selectedFields: ["_id", DataSyncFieldNames.version]}}});

    const updatedTitle = "Post 1 v2";
    await Post.update({ _id, title: updatedTitle,  [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: [...fields, DataSyncFieldNames.deleted]}}})

    await expect(Post.delete({ _id, [DataSyncFieldNames.version]: version }, {graphback: {services: {}, options: { selectedFields: fields}}})).rejects.toThrowError(ConflictError);
  });
});
