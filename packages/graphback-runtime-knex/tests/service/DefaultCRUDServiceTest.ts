//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
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

let context: Context;

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
  const todo: Todo = await context.todoService.create({
    text: 'create a todo',
  });

  expect(todo.id).toEqual(4);
  expect(todo.text).toEqual('create a todo');
});

test('update Todo', async () => {
  const todo: Todo = await context.todoService.update({
    id: '1',
    text: 'my updated first todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async () => {
  const data = await context.todoService.delete({
    id: '3',
    text: 'my updated first todo',
  });

  expect(data.id).toEqual(3);
});

test('find all Todos', async () => {
  const todos = await context.todoService.findAll();

  expect(todos.length).toEqual(3);
});

test('find Todo by text', async () => {
  const todos: Todo[] = await context.todoService.findBy({
    text: 'the second todo',
  });

  expect(todos.length).toEqual(1);
  expect(todos[0].id).toEqual(2);
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