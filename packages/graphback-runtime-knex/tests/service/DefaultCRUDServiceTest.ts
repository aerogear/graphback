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
