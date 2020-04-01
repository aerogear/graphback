//tslint:disable-next-line: match-default-export-name
import { buildSchema, GraphQLObjectType } from 'graphql';
import * as Knex from 'knex';
import { KnexDBDataProvider } from '../../src/KnexDBDataProvider';

const schema = buildSchema(`
"""
@model
"""
type Todos {
 id: ID!
 text: String 
}
`);

//tslint:disable: typedef
interface Context {
  db: Knex;
  provider: KnexDBDataProvider;
}

interface Todo {
  id: number;
  text: string;
}

//tslint:disable-next-line: no-any
const modelType = schema.getType('Todos') as GraphQLObjectType
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

  await db.schema.createTable('todos', table => {
    table.increments(); //id
    table.string('text');
  });

  //insert a couple of default data
  await db('todos').insert({ text: 'my first default todo' });
  await db('todos').insert({ text: 'the second todo' });
  await db('todos').insert({ text: 'just another todo' });

  const provider = new KnexDBDataProvider(modelType, db);

  context = { db, provider };
});

test('batch read Todos', async () => {
  const todos = await context.provider.batchRead('id', ['1', '2']);

  expect(todos[0][0].id).toEqual(1);
  expect(todos[1][0].id).toEqual(2);
});

test('create Todo', async () => {
  const todo: Todo = await context.provider.create({
    text: 'create a todo',
  });

  expect(todo.id === 4);
  expect(todo.text === 'create a todo');
});

test('update Todo', async () => {
  const todo: Todo = await context.provider.update({
    id: '1',
    text: 'my updated first todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async () => {
  const data = await context.provider.delete({ id: '3' });

  expect(data.id).toEqual(3);
});

test('find all Todos', async () => {
  const todos = await context.provider.findAll();

  expect(todos.length).toEqual(3);
});

test('find first 2 todos', async () => {
  const todos = await context.provider.findAll({ limit: 2, offset: 0});

  expect(todos.length).toEqual(2);

  expect(todos[0].id).toEqual(1);
  expect(todos[0].text).toEqual('my first default todo');

  expect(todos[1].id).toEqual(2);
  expect(todos[1].text).toEqual('the second todo');
});

test('find first 2 todos excluding first todo', async () => {
  const todos = await context.provider.findAll({ limit: 2, offset: 1});

  expect(todos.length).toEqual(2);

  expect(todos[0].id).toEqual(2);
  expect(todos[0].text).toEqual('the second todo');

  expect(todos[1].id).toEqual(3);
  expect(todos[1].text).toEqual('just another todo');
});

test('find all offset defaults to zero', async () => {
  const todos = await context.provider.findAll({ limit: 2 });

  expect(todos.length).toEqual(2);

  expect(todos[0].id).toEqual(1);
  expect(todos[0].text).toEqual('my first default todo');

  expect(todos[1].id).toEqual(2);
  expect(todos[1].text).toEqual('the second todo');
});

test('find all limit defaults to complete set', async () => {
  for (let i = 0; i < 10; i++) {
    await context.provider.create({
      text: `todo${i}`,
    });
  }

  const todos = await context.provider.findAll({ offset: 1 });

  expect(todos.length).toEqual(12);

  expect(todos[0].id).toEqual(2);
  expect(todos[0].text).toEqual('the second todo');
});

test('find Todo by text', async () => {
  const todos: Todo[] = await context.provider.findBy({
    text: 'the second todo',
  });

  expect(todos.length).toEqual(1);
  expect(todos[0].id).toEqual(2);
});

test('find first n todos by text', async () => {
  const numberOfTodos = 5;
  const text = 'test-todo';
  for (let i = 0; i < numberOfTodos + 1; i++) {
    await context.provider.create({
      text,
    });
  }

  const todos: Todo[] = await context.provider.findBy({ text }, { limit: numberOfTodos });

  expect(todos.length).toEqual(numberOfTodos);
});

test('Skip n todos and find next m todos by text', async () => {
  const n = 2;
  const m = 3;
  const numberOfTodos = n + m;
  const text = 'test-todo';
  for (let i = 0; i < numberOfTodos; i++) {
    await context.provider.create({
      text,
    });
  }

  const todos: Todo[] = await context.provider.findBy({ text }, { 
    offset: n,
    limit: numberOfTodos
  });

  expect(todos.length).toEqual(m);
});

test('find todos by text, limit defaults to complete set', async () => {
  const numberOfTodos = 12;
  const text = 'test-todo';
  for (let i = 0; i < numberOfTodos + 1; i++) {
    await context.provider.create({
      text,
    });
  }

  const todos: Todo[] = await context.provider.findBy({ text });

  expect(todos.length).toEqual(numberOfTodos);
});
