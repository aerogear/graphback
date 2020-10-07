/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable max-lines */
import { unlinkSync, existsSync } from 'fs';
import { buildSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { CRUDService, GraphbackCoreMetadata } from '@graphback/core';
import { migrateDB, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { SQLiteKnexDBDataProvider } from '../../src/SQLiteKnexDBDataProvider';

const dbPath = `${__dirname}/db.sqlite`;

const pubSub = new PubSub();

afterEach(() => {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath)
  }
})

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

  const defautCrudConfig = {
    "create": true,
    "update": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }

  const metadata = new GraphbackCoreMetadata({
    crudMethods: defautCrudConfig
  }, schema);

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
  const models = metadata.getModelDefinitions();
  for (const model of models) {
    const modelProvider = new SQLiteKnexDBDataProvider(model, db);
    const publishConfig = {
      subCreate: true,
      subDelete: true,
      subUpdate: true
    }

    services[model.graphqlType.name] = new CRUDService(model, modelProvider, { pubSub, crudOptions: publishConfig })
  }

  return { schema, services }
}

test('create Todo', async (done) => {
  const { services } = await setup()
  const subId = await pubSub.subscribe("CREATE_TODO", ({ newTodo }) => {
    expect(newTodo).toEqual({
      id: 1,
      text: "create a todo"
    });
    done();
    pubSub.unsubscribe(subId);
  });

  const todo = await services.Todo.create({
    text: 'create a todo'
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('create a todo');
});

test('update Todo', async (done) => {
  const { services } = await setup({ seedData: { todo: { text: 'my first todo' } } });

  const subId = await pubSub.subscribe("UPDATE_TODO", ({ updatedTodo }) => {
    expect(updatedTodo).toEqual({
      id: 1,
      text: 'my updated first todo'
    });
    done();
    pubSub.unsubscribe(subId);
  });

  const todo = await services.Todo.update({
    id: 1,
    text: 'my updated first todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async (done) => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'my second todo' }] } });

  const subId = await pubSub.subscribe("DELETE_TODO", ({ deletedTodo }) => {
    expect(deletedTodo).toEqual({
      id: 2,
      text: "my second todo"
    });
    done();
    pubSub.unsubscribe(subId);
  });

  const data = await services.Todo.delete({
    id: 2
  });

  expect(data.id).toEqual(2);
});

test('find Todo by text', async () => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'the second todo' }] } })

  const todoResults = await services.Todo.findBy({
    filter: {
      text: { eq: 'the second todo' },
    }
  });

  expect(todoResults.items.length).toEqual(1);
  expect(todoResults.items[0].id).toEqual(2);
});

test('findBy with no arguments should work', async () => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'the second todo' }] } })

  const todoResults = await services.Todo.findBy();

  expect(todoResults.items).toHaveLength(2);
})

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

  const result = await services.User.delete({ email: 'test@test.com' });

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
    const result = await services.User.create({ email: 'johndoe@email.com', name: 'John doe' });
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

  const result = await services.User.update({ email: 'johndoe@email.com', name: 'John Doe' })

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

  const result = await services.User.findBy({ filter: { name: { startsWith: 'John' } } })

  expect(result.items).toHaveLength(2)
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

  const result = await services.User.findBy({ filter: { name: { endsWith: 'Jones' } } })

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

  const result = await services.User.findBy({ filter: { name: { ne: 'John' } } })

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

  const result = await services.User.findBy({ filter: { name: { in: ['Sarah', 'John'] } } })

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

  const result = await services.User.findBy({ filter: { name: { contains: 'John' } } })

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

  const result = await services.User.findBy({ filter: { friends: { eq: 1 } } })

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

  const result = await services.User.findBy({ filter: { friends: { lt: 20 } } })

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

  const result = await services.User.findBy({ filter: { friends: { le: 1 } } })

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

  const result = await services.User.findBy({ filter: { friends: { gt: 30 } } })

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

  const result = await services.User.findBy({ filter: { friends: { ge: 50 } } })

  expect(result.items).toHaveLength(2)
})
