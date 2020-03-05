//tslint:disable-next-line: match-default-export-name
import _test, { TestInterface } from 'ava';
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

const test = _test as TestInterface<Context>;
//tslint:disable-next-line: no-any
const modelType = schema.getType('Todos') as GraphQLObjectType

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

  await db.schema.createTable('todos', table => {
    table.increments(); //id
    table.string('text');
  });

  //insert a couple of default data
  await db('todos').insert({ text: 'my first default todo' });
  await db('todos').insert({ text: 'the second todo' });
  await db('todos').insert({ text: 'just another todo' });

  const provider = new KnexDBDataProvider(modelType, db);

  t.context = { db, provider };
});

test('batch read Todos', async t => {
  const todos = await t.context.provider.batchRead('id', ['1', '2']);

  t.assert(todos[0][0].id === 1);
  t.assert(todos[1][0].id === 2);
});

test('create Todo', async t => {
  const todo: Todo = await t.context.provider.create({
    text: 'create a todo',
  });

  t.assert(todo.id === 4);
  t.assert(todo.text === 'create a todo');
});

test('update Todo', async t => {
  const todo: Todo = await t.context.provider.update({
    id: '1',
    text: 'my updated first todo',
  });

  t.assert(todo.id === 1);
  t.assert(todo.text === 'my updated first todo');
});

test('delete Todo', async t => {
  const data = await t.context.provider.delete({ id: '3' });

  t.deepEqual(data.id, 3);
});

test('find all Todos', async t => {
  const todos = await t.context.provider.findAll();

  t.assert(todos.length === 3);
});

test('find first 2 todos', async t => {
  const todos = await t.context.provider.findAll({ limit: 2, offset: 0});

  t.assert(todos.length === 2);

  t.assert(todos[0].id === 1);
  t.assert(todos[0].text === "my first default todo");

  t.assert(todos[1].id === 2);
  t.assert(todos[1].text === "the second todo");
});

test('find first 2 todos excluding first todo', async t => {
  const todos = await t.context.provider.findAll({ limit: 2, offset: 1});

  t.assert(todos.length === 2);

  t.assert(todos[0].id == 2);
  t.assert(todos[0].text == "the second todo");

  t.assert(todos[1].id == 3);
  t.assert(todos[1].text == "just another todo");
});

test('find all offset defaults to zero', async t => {
  const todos = await t.context.provider.findAll({ limit: 2 });

  t.assert(todos.length === 2);

  t.assert(todos[0].id == 1);
  t.assert(todos[0].text == "my first default todo");

  t.assert(todos[1].id == 2);
  t.assert(todos[1].text == "the second todo");
});

test('find all limit defaults to 10', async t => {
  for (let i = 0; i < 10; i++) {
    await t.context.provider.create({
      text: `todo${i}`,
    });
  }

  const todos = await t.context.provider.findAll({ offset: 1 });

  t.assert(todos.length <= 10);

  t.assert(todos[0].id == 2);
  t.assert(todos[0].text == "the second todo");
});

test('find Todo by text', async t => {
  const todos: Todo[] = await t.context.provider.findBy({
    text: 'the second todo',
  });

  t.assert(todos.length === 1);
  t.assert(todos[0].id === 2);
});
