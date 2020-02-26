//tslint:disable-next-line: match-default-export-name
import _test, { TestInterface } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';

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


//Create a new database before each tests so that
//all tests can run parallel
test.beforeEach(async (t: any) => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString())
  await client.connect();
  const db = client.db('test');
  const provider = new MongoDBDataProvider(modelType, db);

  t.context = { provider, server }

  await provider.create({
    text: 'todo',
  });

  await provider.create({
    text: 'todo2',
  });
});

test.afterEach(async (t: any) => {
  await t.context.server.stop()
})

test('Test mongo crud', async (t: any) => {
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


test('find all Todos', async (t: any) => {
  const todos = await t.context.provider.findAll();
  t.assert(todos.length > 0);
});

test('find all limit defaults to 10', async (t: any) => {
  for (let i = 0; i < 10; i++) {
    await t.context.provider.create({
      text: `todo`,
    });
  }
  const todos = await t.context.provider.findAll({ offset: 1 });
  t.assert(todos.length <= 10);
});

test('find all offset defaults to 0', async (t: any) => {
  const todos = await t.context.provider.findAll({ limit: 1 });
  t.assert(todos[0].text == "todo");
});

test('find first 1 todos', async t => {
  const todos = await t.context.provider.findAll({ limit: 1, offset: 0});

  t.assert(todos.length === 1);

  t.assert(todos[0].text == "todo");
});

test('find first 1 todo(s) excluding first todo', async t => {
  const todos = await t.context.provider.findAll({ limit: 1, offset: 1});

  t.assert(todos.length === 1);

  t.assert(todos[0].text == "todo2");
});

test('find Todo by text', async (t: any) => {
  const all = await t.context.provider.findAll();
  const todos: Todo[] = await t.context.provider.findBy({
    text: all[0].text,
  });
  t.assert(todos.length > 0);
});
