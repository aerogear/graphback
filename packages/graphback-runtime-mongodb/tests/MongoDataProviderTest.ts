//tslint:disable-next-line: match-default-export-name
import _test, { TestInterface } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import * as Knex from 'knex';
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';

const schema = buildSchema(`
"""
@model
"""
type Todos {
 id: ID!
 text: String 
}
`);



interface Todo {
  id: number;
  text: string;
}

const test = _test as TestInterface<{ provider: MongoDBDataProvider }>;
//tslint:disable-next-line: no-any
const modelType = schema.getType('Todos') as GraphQLObjectType

const server = new MongoMemoryServer();

//Create a new database before each tests so that
//all tests can run parallel
test.beforeEach(async t => {
  const client = new MongoClient(await server.getConnectionString())
  await client.connect();
  const db = client.db('test');
  const provider = new MongoDBDataProvider(modelType, db);

  t.context = { provider }

  await provider.create({
    text: ' todo',
  });

  await provider.create({
    text: 'todo2',
  });
});

test('Test mongo crud', async t => {
  let todo: Todo = await t.context.provider.create({
    text: 'create a todo',
  });

  t.assert(todo.text === 'create a todo');

  todo = await t.context.provider.update({
    id: todo.id,
    text: 'my updated first todo',
  });

  t.assert(todo.text === 'my updated first todo');

  const data = await t.context.provider.delete({ id: todo.id });

  t.deepEqual(data.id, todo.id);
});


test('find all Todos', async t => {
  const todos = await t.context.provider.findAll();

  t.assert(todos.length > 0);
});

test('find Todo by text', async t => {
  const todos: Todo[] = await t.context.provider.findBy({
    text: 'todo',
  });

  t.assert(todos.length > 0);
});
