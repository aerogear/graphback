import { MongoClient } from 'mongodb';
import { Context, createTestingContext } from "./__util__";

describe('MongoDB indexing', () => {
  let context: Context;

  afterEach(() => context.server.stop())

  it('can create default indexes', async () => {
    context = await createTestingContext(`
      """
      @model
      @versioned
      """
      type Note {
        id: ID!
        """
        @index
        """
        text: String
      }
      `);

    const client = new MongoClient(await context.server.getConnectionString(), { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test');

    const indexes = await db.collection('note').indexes();

    expect(indexes[1]).toMatchObject(
      {
        "key": {
          "text": 1
        },
        "name": "text_1",
        "ns": "test.note"
      }
    )
  })

  it('can create indexes with options', async () => {
    context = await createTestingContext(`
      """
      @model
      @versioned
      """
      type Note {
        id: ID!
        text: String
        """
        @index(
          name: 'compound_index',
          key: {
            meta: 1,
            pages: 1
          }
        )
        """
        meta: String
        pages: Int
      }
      `);

    const client = new MongoClient(await context.server.getConnectionString(), { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test');

    const indexes = await db.collection('note').indexes();

    expect(indexes[1]).toMatchObject(
      {
        "key": {
          "meta": 1,
          "pages": 1
        },
        "name": "compound_index",
        "ns": "test.note"
      }
    )
  })

  it('can create relation indexes', async () => {
    context = await createTestingContext(`
      """
      @model
      """
      type Note {
        id: ID!
        text: String
        """
        @oneToMany(field: 'note')
        """
        comments: [Comment]
      }

      """
      @model
      """
      type Comment {
        id: ID!
        text: String
      }
      `);

    const client = new MongoClient(await context.server.getConnectionString(), { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test');

    const indexes = await db.collection('comment').indexes();

    expect(indexes[1]).toMatchObject(
      {
        "key": {
          "noteId": 1,
        },
        "name": "noteId_1",
        "ns": "test.comment"
      }
    )
  })
})
