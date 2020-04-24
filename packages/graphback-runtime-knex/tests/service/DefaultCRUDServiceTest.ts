//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { buildSchema, GraphQLObjectType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { CRUDService, GraphbackPubSub } from '../../../graphback-runtime/src';
import { filterModelTypes } from '../../../graphback-core/src';
import { KnexDBDataProvider } from '../../src/KnexDBDataProvider';
import { migrateDB } from '../../../graphql-migrations/src';
import { unlinkSync, existsSync } from 'fs';
import path from 'path';

//tslint:disable: typedef

interface Context {
  db: Knex;
  provider: KnexDBDataProvider;
  todoService: CRUDService<Todo>
  userService: CRUDService;
}

interface Todo {
  id?: number;
  text: string;
}

interface ResultList<T> {
  items: T[];
}

const schemaa = buildSchema(`
"""
@model
"""
type Todos {
 id: ID!
 text: String
}

"""
@model
"""
type User {
  name: String
  """
  @db.primary
  """
  username: String
}
`);

const dbPath = `${__dirname}/db.sqlite`;

afterEach(() => {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath)
  }
})

//tslint:disable-next-line: no-any
const userModel = schemaa.getType('User') as GraphQLObjectType

//tslint:disable-next-line: no-any
const todoModel = schemaa.getType('Todos') as GraphQLObjectType

let context: Context;

const setup = async (schemaStr: string, config: { seedData?: { [tableName: string]: any[] } } = {}) => {
  const dbConfig = {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
  }

  const db = Knex(dbConfig);

  const schema = buildSchema(schemaStr)

  await migrateDB(dbConfig, schema)

  if (config.seedData) {
    for (const [tableName, data] of Object.entries(config.seedData)) {
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

//Create a new database before each tests so that
//all tests can run parallel
beforeEach(async () => {
  const db = Knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  });

  //tslint:disable-next-line: await-promise
  await db.schema.createTable('todos', table => {
    table.increments(); //id
    table.string('text');
  });

  //tslint:disable-next-line: await-promise
  await db.schema.createTable('user', table => {
    table.string('name');
    table.string('username').primary();
  });

  //insert a couple of default data
  //tslint:disable-next-line: await-promise
  await db('todos').insert({ text: 'my first default todo' });
  //tslint:disable-next-line: await-promise
  await db('todos').insert({ text: 'the second todo' });
  //tslint:disable-next-line: await-promise
  await db('todos').insert({ text: 'just another todo' });

  //insert a user
  //tslint:disable-next-line: await-promise
  await db('user').insert({ name: 'John Doe', username: 'johndoe123' });
  //tslint:disable-next-line: await-promise
  await db('user').insert({ name: 'Sam Wicks', username: 'samwicks' });


  const todoProvider = new KnexDBDataProvider(todoModel, db);
  const userProvider = new KnexDBDataProvider(userModel, db);

  const pubSub = new PubSub();

  const publishConfig: GraphbackPubSub = {
    pubSub,
    publishCreate: true,
    publishDelete: true,
    publishUpdate: true
  }

  const todoService = new CRUDService(todoModel, todoProvider, publishConfig)
  const userService = new CRUDService(userModel, userProvider, publishConfig);

  context = { db, provider: todoProvider, todoService, userService };
});

test('create Todo', async () => {
  const { services } = await setup(
    `"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)
  const todo: Todo = await services.Todo.create({
    text: 'create a todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('create a todo');
});

test('update Todo', async () => {
  const todo: Todo = await context.todoService.update({
    id: 1,
    text: 'my updated first todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async () => {
  const data = await context.todoService.delete({
    id: 3,
    text: 'my updated first todo',
  });

  expect(data.id).toEqual(3);
});

test('find Todo by text', async () => {
  const todoResults: ResultList<Todo> = await context.todoService.findBy({
    text: { eq: 'the second todo' },
  });

  expect(todoResults.items.length).toEqual(1);
  expect(todoResults.items[0].id).toEqual(2);
});

test('delete User by custom ID field', async () => {
  const result = await context.userService.delete({
    username: 'johndoe123'
  });

  expect(result.username).toEqual('johndoe123')
});

test('update User by custom ID field', async () => {
  const user = await context.userService.update({
    username: 'johndoe123',
    name: 'Johnny Doe'
  });

  expect(user.name).toEqual('Johnny Doe');
});
