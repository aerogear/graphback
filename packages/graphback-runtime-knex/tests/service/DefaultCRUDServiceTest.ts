//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import _test, { TestInterface } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { CRUDService, GraphbackPubSub } from '@graphback/runtime';
import { KnexDBDataProvider } from '../../src/KnexDBDataProvider';

//tslint:disable: typedef

interface Context {
  db: Knex;
  provider: KnexDBDataProvider;
  todoService: CRUDService
  userService: CRUDService;
}

interface Todo {
  id: number;
  text: string;
}

const test = _test as TestInterface<Context>;

const schema = buildSchema(`
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

//tslint:disable-next-line: no-any
const userModel = schema.getType('User') as GraphQLObjectType

//tslint:disable-next-line: no-any
const todoModel = schema.getType('Todos') as GraphQLObjectType

//Create a new database before each tests so that
//all tests can run parallel
test.beforeEach(async t => {
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

  t.context = { db, provider: todoProvider, todoService, userService };
});

test('create Todo', async t => {
  const todo: Todo = await t.context.todoService.create({
    text: 'create a todo',
  });

  t.assert(todo.id === 4);
  t.assert(todo.text === 'create a todo');
});

test('update Todo', async t => {
  const todo: Todo = await t.context.todoService.update({
    id: '1',
    text: 'my updated first todo',
  });

  t.assert(todo.id === 1);
  t.assert(todo.text === 'my updated first todo');
});

test('delete Todo', async t => {
  const data = await t.context.todoService.delete({
    id: '3',
    text: 'my updated first todo',
  });

  t.deepEqual(data.id, 3);
});

test('find all Todos', async t => {
  const todos = await t.context.todoService.findAll();

  t.assert(todos.length === 3);
});

test('find Todo by text', async t => {
  const todos: Todo[] = await t.context.todoService.findBy({
    text: 'the second todo',
  });

  t.assert(todos.length === 1);
  t.assert(todos[0].id === 2);
});

test('delete User by custom ID field', async t => {
  const result = await t.context.userService.delete({
    username: 'johndoe123'
  });

  t.assert(result.username === 'johndoe123')
});

test('update User by custom ID field', async t => {
  const user = await t.context.userService.update({
    username: 'johndoe123',
    name: 'Johnny Doe'
  });

  t.assert(user.name === 'Johnny Doe')
});