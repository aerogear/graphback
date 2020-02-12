// tslint:disable-next-line: match-default-export-name
import _test, { TestInterface } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import * as Knex from 'knex';
import { KnexDBDataProvider } from '../../src/data/KnexDBDataProvider';
import { CRUDService } from '../../src/service/CRUDService'
import { PubSubConfig } from '../../src/service/PubSubConfig';

// tslint:disable: typedef

interface Context {
  db: Knex;
  provider: KnexDBDataProvider;
  crudService: CRUDService
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
`);

// tslint:disable-next-line: no-any
const modelType = schema.getType('Todos') as GraphQLObjectType

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

  // tslint:disable-next-line: await-promise
  await db.schema.createTable('todos', table => {
    table.increments(); // id
    table.string('text');
  });

  // insert a couple of default data
  // tslint:disable-next-line: await-promise
  await db('todos').insert({ text: 'my first default todo' });
  // tslint:disable-next-line: await-promise
  await db('todos').insert({ text: 'the second todo' });
  // tslint:disable-next-line: await-promise
  await db('todos').insert({ text: 'just another todo' });

  const provider = new KnexDBDataProvider(modelType, db);
  const pubSub = new PubSub();

  const publishConfig: PubSubConfig = {
    pubSub,
    publishCreate: true,
    publishDelete: true,
    publishUpdate: true
  }

  const crudService = new CRUDService(modelType, provider, publishConfig)
  t.context = { db, provider, crudService };
});

test('read Todo', async t => {
  const todo: Todo = await t.context.crudService.read('3');

  t.assert(todo.id === 3);
  t.assert(todo.text === 'just another todo');
});

test('create Todo', async t => {
  const todo: Todo = await t.context.crudService.create({
    text: 'create a todo',
  });

  t.assert(todo.id === 4);
  t.assert(todo.text === 'create a todo');
});

test('update Todo', async t => {
  const todo: Todo = await t.context.crudService.update({
    id: '1',
    text: 'my updated first todo',
  });

  t.assert(todo.id === 1);
  t.assert(todo.text === 'my updated first todo');
});

test('delete Todo', async t => {
  const data = await t.context.crudService.delete({
    id: '3',
    text: 'my updated first todo',
  });

  t.deepEqual(data.id, 3);
});

test('find all Todos', async t => {
  const todos = await t.context.crudService.findAll(modelType.name);

  t.assert(todos.length === 3);
});

test('find Todo by text', async t => {
  const todos: Todo[] = await t.context.crudService.findBy({
    text: 'the second todo',
  });

  t.assert(todos.length === 1);
  t.assert(todos[0].id === 2);
});


