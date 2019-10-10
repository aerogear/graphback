// tslint:disable-next-line: match-default-export-name
import _test, { TestInterface } from 'ava';
import * as Knex from 'knex';
import { KnexDBDataProvider } from '../../../src/layers/data/KnexDBDataProvider';

// tslint:disable: typedef

interface Context {
  db: Knex;
  provider: KnexDBDataProvider;
}

interface Todo {
  id: number;
  text: string;
}

const test = _test as TestInterface<Context>;
// tslint:disable-next-line: no-any
const typeContext = { name: 'todos' } as any

// Create a new database before each tests so that
// all tests can run parallel
test.beforeEach(async t => {
  const db = Knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  });

  await db.schema.createTable('todos', table => {
    table.increments(); // id
    table.string('text');
  });

  // insert a couple of default data
  await db('todos').insert({ text: 'my first default todo' });
  await db('todos').insert({ text: 'the second todo' });
  await db('todos').insert({ text: 'just another todo' });

  const provider = new KnexDBDataProvider(db);

  t.context = { db, provider };
});

test('read Todo', async t => {
  const todo: Todo = await t.context.provider.read(typeContext, '3');

  t.assert(todo.id === 3);
  t.assert(todo.text === 'just another todo');
});

test('batch read Todos', async t => {
  const todos: Todo[] = await t.context.provider.batchRead(typeContext, ['1', '2']);

  t.assert(todos.length === 2);
});

test('create Todo', async t => {
  const todo: Todo = await t.context.provider.create(typeContext, {
    text: 'create a todo',
  });

  t.assert(todo.id === 4);
  t.assert(todo.text === 'create a todo');
});

test('update Todo', async t => {
  const todo: Todo = await t.context.provider.update(typeContext, '1', {
    text: 'my updated first todo',
  });

  t.assert(todo.id === 1);
  t.assert(todo.text === 'my updated first todo');
});

test('delete Todo', async t => {
  const id = await t.context.provider.delete(typeContext, '3');

  t.assert(id === '3');
});

test('find all Todos', async t => {
  const todos = await t.context.provider.findAll(typeContext);

  t.assert(todos.length === 3);
});

test('find Todo by text', async t => {
  const todos: Todo[] = await t.context.provider.findBy(typeContext, {
    text: 'the second todo',
  });

  t.assert(todos.length === 1);
  t.assert(todos[0].id === 2);
});
