//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { unlinkSync, existsSync } from 'fs';
import { buildSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { CRUDService, GraphbackPubSub } from '../../../graphback-runtime/src';
import { filterModelTypes } from '../../../graphback-core/src';
import { KnexDBDataProvider } from '../../src/KnexDBDataProvider';
import { migrateDB, removeNonSafeOperationsFilter } from '../../../graphql-migrations/src';

const dbPath = `${__dirname}/db.sqlite`;

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

  const dbConfig = {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
  }

  const db = Knex(dbConfig);

  const schema = buildSchema(schemaSDL)

  await migrateDB(dbConfig, schema, {
    operationFilter: removeNonSafeOperationsFilter
  })

  if (seedData) {
    for (const [tableName, data] of Object.entries(seedData)) {
      await db(tableName).insert(data)
    }
  }

  const services: { [name: string]: CRUDService } = {}
  const models = filterModelTypes(schema)
  for (const modelType of models) {
    const modelProvider = new KnexDBDataProvider(modelType, db);

    const pubSub = new PubSub();
    const publishConfig: GraphbackPubSub = {
      pubSub,
      publishCreate: true,
      publishDelete: true,
      publishUpdate: true
    }

    services[modelType.name] = new CRUDService(modelType, modelProvider, publishConfig)
  }

  return { schema, services }
}

test('create Todo', async () => {
  const { services } = await setup()
  const todo = await services.Todo.create({
    text: 'create a todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('create a todo');
});

test('update Todo', async () => {
  const { services } = await setup({ seedData: { todo: { text: 'my first todo' } } })
  const todo = await services.Todo.update({
    id: 1,
    text: 'my updated first todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async () => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'my second todo' }] } })
  const data = await services.Todo.delete({
    id: 2,
    text: 'my second todo',
  });

  expect(data.id).toEqual(2);
});

test('find Todo by text', async () => {
  const { services } = await setup({ seedData: { todo: [{ text: 'my first todo' }, { text: 'the second todo' }] } })

  const todoResults = await services.Todo.findBy({
    text: { eq: 'the second todo' },
  });

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
      id: ID
      """
      @db.primary
      """
      email: String
      name: String
    }
    `,
    seedData: { user: [{ email: 'johndoe@email.com' }, { email: 'test@test.com' }] }
  })

  const result = await services.User.delete({ email: 'test@test.com' })

  expect(result.email).toEqual('test@test.com')
});

test('update User by custom ID field', async () => {
  const { services } = await setup({
    schemaSDL: `
    """
    @model
    """
    type User {
      id: ID
      """
      @db.primary
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

  const result = await services.User.findBy({ name: { startsWith: 'John' } })

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

  const result = await services.User.findBy({ name: { endsWith: 'Jones' } })

  expect(result.items).toHaveLength(1)
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

  const result = await services.User.findBy({ name: { endsWith: 'Jones' } })

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

  const result = await services.User.findBy({ name: { ne: 'John' } })

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

  const result = await services.User.findBy({ name: { in: ['Sarah', 'John'] } })

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

  const result = await services.User.findBy({ name: { contains: 'John' } })

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

  const result = await services.User.findBy({ friends: { eq: 1 } })

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

  const result = await services.User.findBy({ friends: { lt: 20 } })

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

  const result = await services.User.findBy({ friends: { le: 1 } })

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

  const result = await services.User.findBy({ friends: { gt: 30 } })

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

  const result = await services.User.findBy({ friends: { ge: 50 } })

  expect(result.items).toHaveLength(2)
})
