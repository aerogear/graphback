//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { unlinkSync, existsSync } from 'fs';
import { buildSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { CRUDService, filterModelTypes } from '@graphback/core';
import { migrateDB, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { SQLiteKnexDBDataProvider } from '../../src/SQLiteKnexDBDataProvider';

const dbPath = `${__dirname}/db.sqlite`;

afterEach(() => {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath)
  }
})
const fields = ["id", "title"];
const setup = async ({ schemaSDL, seedData }: { schemaSDL?: string, seedData?: { [tableName: string]: any | any[] } } = {}) => {
  if (!schemaSDL) {
    schemaSDL =
      `"""
@model
"""
type Todo {
 id: ID!
 text: String
}`
  }

  const dbConfig: Knex.Config = {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
  }

  const schema = buildSchema(schemaSDL)

  await migrateDB(dbConfig, schema, {
    operationFilter: removeNonSafeOperationsFilter
  })

  const db = Knex(dbConfig)
  if (seedData) {
    for (const [tableName, data] of Object.entries(seedData)) {
      await db(tableName).insert(data)
    }
  }

  const services: { [name: string]: CRUDService } = {}
  const models = filterModelTypes(schema)
  for (const modelType of models) {
    const modelProvider = new SQLiteKnexDBDataProvider(modelType, db);

    const pubSub = new PubSub();
    const publishConfig = {
      subCreate: true,
      subDelete: true,
      subUpdate: true
    }

    services[modelType.name] = new CRUDService(modelType.name, modelProvider, { pubSub, crudOptions: publishConfig })
  }

  return { schema, services }
}

test('create Todo', async () => {
  const { services } = await setup()
  const todo = await services.Todo.create({
    text: 'create a todo',
  }, { graphback: { services: {}, options: { selectedFields: ["id", "text"] } } });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('create a todo');
});

test('update Todo', async () => {
  const { services } = await setup({ seedData: { todo: { text: 'my first todo' } } })
  const todo = await services.Todo.update({
    id: 1,
    text: 'my updated first todo',
  }, {
    graphback: {
      services: {},
      options: {
        selectedFields: ["id", "text"]
      }
    }
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async () => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'my second todo' }] } })
  const data = await services.Todo.delete({
    id: 2,
    text: 'my second todo',
  }, {
    graphback: {
      services: {},
      options: {
        selectedFields: ["id"]
      }
    }
  });

  expect(data.id).toEqual(2);
});

test('find Todo by text', async () => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'the second todo' }] } })

  const todoResults = await services.Todo.findBy({
    text: { eq: 'the second todo' },
  }, { graphback: { services: {}, options: { selectedFields: ["id"] } } });

  expect(todoResults.items.length).toEqual(1);
  expect(todoResults.items[0].id).toEqual(2);
});

test('delete User by custom ID field', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      """
      @id
      """
      email: String
      name: String
    }
    `,
    seedData: { user: [{ email: 'johndoe@email.com' }, { email: 'test@test.com' }] }
  })

  const result = await services.User.delete({ email: 'test@test.com' }, {
    graphback: {
      services: {},
      options: {
        selectedFields: ["email"]
      }
    }
  });

  expect(result.email).toEqual('test@test.com')
});

test('insertion of User with same custom ID field more than once should fail', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      """
      @id
      """
      email: String
      name: String
    }
    `,
    seedData: { user: [{ email: 'johndoe@email.com', name: 'John Doe' }] }
  });

  try {
    const result = await services.User.create({ email: 'johndoe@email.com', name: 'John doe' }, { graphback: { services: {}, options: { selectedFields: ["id"] } } });
    expect(result).toBeFalsy(); // should not reach here because an error should have been thrown by line above
  } catch (e) {
    expect(e.code).toBe("SQLITE_CONSTRAINT");
    expect(e.message).toBe("insert into `user` (`email`, `name`) values ('johndoe@email.com', 'John doe') - SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email");
  }
});

test('update User by custom ID field', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      """
      @id
      """
      email: String
      name: String
    }
    `,
    seedData: { user: [{ email: 'johndoe@email.com' }] }
  })

  const result = await services.User.update({ email: 'johndoe@email.com', name: 'John Doe' }, { graphback: { services: {}, options: { selectedFields: ["name"] } } })

  expect(result.name).toEqual('John Doe')
});

test('find users where name starts with "John"', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
    }
    `,
    seedData: {
      user: [
        { name: 'John Doe' },
        { name: 'Johnny Doe' },
        { name: 'James Doe' }
      ]
    }
  })

  const result = await services.User.findBy({ name: { startsWith: 'John' } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(2)
})

test('find and count all users', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
    }
    `,
    seedData: {
      user: [
        { name: 'John Doe' },
        { name: 'John Paul' },
        { name: 'James Doe' },
        { name: 'Johnny Doe' },
        { name: 'John Luke' }
      ]
    }
  })

  const resultWithCount = await services.User.findBy({ name: { startsWith: 'John' } }, {graphback: {services: {}, options: { selectedFields: ["id"], aggregations: {
    count: true
  }}}})

  expect(resultWithCount.count).toEqual(4);
  expect(resultWithCount.items).toHaveLength(4);


  const resultWithoutCount = await services.User.findBy({ name: { startsWith: 'John' } }, {graphback: {services: {}, options: { selectedFields: ["id"], aggregations: {
    count: false
  }}}})


  expect(resultWithoutCount.count).toBeUndefined();
  expect(resultWithoutCount.items).toHaveLength(4);

  const resultWithoutItems = await services.User.findBy({ name: { startsWith: 'John' } }, {graphback: {services: {}, options: { selectedFields: [], aggregations: {
    count: true
  }}}})


  expect(resultWithoutItems.items).toBeUndefined();
  expect(resultWithoutItems.count).toEqual(4);

  // count with limit and offset

  let resultWithLimitAndOffset = await services.User.findBy({ name: { startsWith: 'John' } }, {graphback: {services: {}, options: { selectedFields: ["id"], aggregations: {
    count: true
  }}}}, {offset: 0, limit: 1})


  expect(resultWithLimitAndOffset.items).toHaveLength(1);
  expect(resultWithLimitAndOffset.count).toEqual(4);
  expect(resultWithLimitAndOffset.limit).toEqual(1);
  expect(resultWithLimitAndOffset.offset).toEqual(0);
})

test('find users where name ends with "Jones"', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
    }
    `,
    seedData: {
      user: [
        { name: 'John Doe' },
        { name: 'Johnny Jones' },
        { name: 'James Doe' }
      ]
    }
  })

  const result = await services.User.findBy({ name: { endsWith: 'Jones' } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(1)
})

test('find users where name not eq "John"', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
    }
    `,
    seedData: {
      user: [
        { name: 'John' },
        { name: 'John' },
        { name: 'James' }
      ]
    }
  })

  const result = await services.User.findBy({ name: { ne: 'John' } }, { graphback: { services: {}, options: { selectedFields: ["name"] } } })

  expect(result.items).toHaveLength(1)
  expect(result.items[0].name).toBe('James')
})

test('find users where name in array', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
    }
    `,
    seedData: {
      user: [
        { name: 'John' },
        { name: 'Sarah' },
        { name: 'James' }
      ]
    }
  })

  const result = await services.User.findBy({ name: { in: ['Sarah', 'John'] } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(2)
})

test('find users where name contains "John"', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
    }
    `,
    seedData: {
      user: [
        { name: 'Mr. John Jones' },
        { name: 'Ms. Sarah Johnson' },
        { name: 'Ms. Sarah Jones' },
        { name: 'Mr. James Johnston' }
      ]
    }
  })

  const result = await services.User.findBy({ name: { contains: 'John' } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(3)
})

test('find users where friends == 1', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
      friends: Int
    }
    `,
    seedData: {
      user: [
        { name: 'John', friends: 1 },
        { name: 'Sarah', friends: 20 },
        { name: 'Sandra', friends: 30 },
        { name: 'Enda', friends: 50 },
        { name: 'Eamon', friends: 0 },
        { name: 'Isabelle', friends: 100 }
      ]
    }
  })

  const result = await services.User.findBy({ friends: { eq: 1 } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(1)
})

test('find users where friends < 1', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
      friends: Int
    }
    `,
    seedData: {
      user: [
        { name: 'John', friends: 1 },
        { name: 'Sarah', friends: 20 },
        { name: 'Sandra', friends: 30 },
        { name: 'Enda', friends: 50 },
        { name: 'Eamon', friends: 0 },
        { name: 'Isabelle', friends: 100 }
      ]
    }
  })

  const result = await services.User.findBy({ friends: { lt: 20 } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(2)
})

test('find users where friends <= 1', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
      friends: Int
    }
    `,
    seedData: {
      user: [
        { name: 'John', friends: 1 },
        { name: 'Sarah', friends: 20 },
        { name: 'Sandra', friends: 30 },
        { name: 'Enda', friends: 50 },
        { name: 'Eamon', friends: 0 },
        { name: 'Isabelle', friends: 100 }
      ]
    }
  })

  const result = await services.User.findBy({ friends: { le: 1 } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(2)
})

test('find users where friends > 30', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
      friends: Int
    }
    `,
    seedData: {
      user: [
        { name: 'John', friends: 1 },
        { name: 'Sarah', friends: 20 },
        { name: 'Sandra', friends: 30 },
        { name: 'Enda', friends: 50 },
        { name: 'Eamon', friends: 0 },
        { name: 'Isabelle', friends: 100 }
      ]
    }
  })

  const result = await services.User.findBy({ friends: { gt: 30 } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(2)
})

test('find users where friends >= 50', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      name: String
      friends: Int
    }
    `,
    seedData: {
      user: [
        { name: 'John', friends: 1 },
        { name: 'Sarah', friends: 20 },
        { name: 'Sandra', friends: 30 },
        { name: 'Enda', friends: 50 },
        { name: 'Eamon', friends: 0 },
        { name: 'Isabelle', friends: 100 }
      ]
    }
  })

  const result = await services.User.findBy({ friends: { ge: 50 } }, { graphback: { services: {}, options: { selectedFields: ["id"] } } })

  expect(result.items).toHaveLength(2)
})
