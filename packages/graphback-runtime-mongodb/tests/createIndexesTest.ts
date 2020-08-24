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
        _id: GraphbackObjectID!
        """
        @index
        """
        text: String
      }

      scalar GraphbackObjectID
      `);


    const index = await context.findIndex('note', 'text');

    expect(index).toMatchObject(
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
        _id: GraphbackObjectID!
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

      scalar GraphbackObjectID
      `);

    const index = await context.findIndex('note', 'meta');

    expect(index).toMatchObject(
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
        _id: GraphbackObjectID!
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
        _id: GraphbackObjectID!
        text: String
      }

      scalar GraphbackObjectID
      `);

    const index = await context.findIndex('comment', 'noteId');

    expect(index).toMatchObject(
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
