//tslint:disable-next-line: match-default-export-name
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


interface Context {
  provider: MongoDBDataProvider;
  server: MongoMemoryServer
}

interface Todo {
  id: number;
  text: string;
  softDelete: boolean;
}

//tslint:disable-next-line: no-any
const modelType = schema.getType('Todos') as GraphQLObjectType
let context: Context;


//Create a new database before each tests so that
//all tests can run parallel
beforeEach(async () => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString())
  await client.connect();
  const db = client.db('test');
  const provider = new MongoDBDataProvider(modelType, db);

  context = { provider, server }

  await provider.create({
    text: 'todo',
  });

  await provider.create({
    text: 'todo2',
  });
});

afterEach(async () => {
  await context.server.stop()
})

test('Test mongo crud', async () => {
  let todo: Todo = await context.provider.create({
    text: 'create a todo',
  });

  expect(todo.text).toEqual('create a todo');

  todo = await context.provider.update({
    id: todo.id,
    text: 'my updated first todo',
  });

  expect(todo.text).toEqual('my updated first todo');

  const data = await context.provider.delete({ id: todo.id });

  expect(data.id).toEqual(todo.id);
});


test('find all Todos', async () => {
  const todos = await context.provider.findAll();
  expect(todos.length).toBeGreaterThan(0);
});

test('find all limit defaults to 10', async () => {
  for (let i = 0; i < 10; i++) {
    await context.provider.create({
      text: `todo`,
    });
  }
  const todos = await context.provider.findAll({ offset: 1 });
  expect(todos.length).toBeLessThanOrEqual(10);
});

test('find all offset defaults to 0', async () => {
  const todos = await context.provider.findAll({ limit: 1 });
  expect(todos[0].text).toEqual('todo');
});

test('find first 1 todos', async () => {
  const todos = await context.provider.findAll({ limit: 1, offset: 0 });

  expect(todos.length).toEqual(1);

  expect(todos[0].text).toEqual('todo');
});

test('find first 1 todo(s) excluding first todo', async () => {
  const todos = await context.provider.findAll({ limit: 1, offset: 1 });

  expect(todos.length).toEqual(1);

  expect(todos[0].text).toEqual('todo2');
});

test('find Todo by text', async () => {
  const all = await context.provider.findAll();
  const todos: Todo[] = await context.provider.findBy({
    text: all[0].text,
  });
  expect(todos.length).toBeGreaterThan(0);
});

test('find Todo by text limit defaults to 10', async () => {
  const text = 'todo-test';
  for (let i = 0; i < 11; i++) {
    await context.provider.create({
      text,
    });
  }
  const todos: Todo[] = await context.provider.findBy({ text }, { offset: 0 });
  expect(todos.length).toBeLessThanOrEqual(10);
});

test('find by text offset defaults to 0', async () => {
  const text = 'todo-test';
  for (let i = 0; i < 2; i++) {
    await context.provider.create({
      text,
    });
  }
  const todos = await context.provider.findBy({ text }, { limit: 1 });
  expect(todos[0].text).toEqual(text);
});

test('find first 1 todos by text', async () => {
  const text = 'todo-test';
  for (let i = 0; i < 2; i++) {
    await context.provider.create({
      text,
    });
  }

  const todos = await context.provider.findBy({ text }, { limit: 1, offset: 0 });
  expect(todos.length).toEqual(1);
  expect(todos[0].text).toEqual(text);
});

test('Soft Delete first 5 todos', async () => {
  let todo: Todo = await context.provider.create({
    text: 'todo created'
  });
  expect(todo.softDelete).toEqual(false);

  todo = await context.provider.softDelete({
    id: todo.id
  })
  expect(todo.softDelete).toEqual(true);

  let todos = await context.provider.findBy({
    id: todo.id
  })
  expect(todos.length).toEqual(0);

  todos = await context.provider.findAll();
  for (var i = 0; i < todos.length; i++) {
    expect(todos[i].softDelete).toEqual(false);
  }
})