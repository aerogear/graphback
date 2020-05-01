/* eslint-disable no-console */
//tslint:disable-next-line: match-default-export-name
import { unlinkSync, existsSync, unlink } from 'fs';
import { buildSchema, GraphQLObjectType } from 'graphql';
import * as Knex from 'knex';
import { filterModelTypes } from '@graphback/core';
import { KnexDBDataProvider } from '../../src/KnexDBDataProvider';
import { migrateDB, removeNonSafeOperationsFilter } from '../../../graphql-migrations/src';

const dbPath = `${__dirname}/db.sqlite`;

afterEach(() => {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath)
  }
})

const setup = async (schemaStr: string, config: { seedData?: { [tableName: string]: any[] | any } } = {}) => {
  const schema = buildSchema(schemaStr)

  const dbConfig = {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  }

  const db = Knex(dbConfig);

  await migrateDB(dbConfig, schema, {
    operationFilter: removeNonSafeOperationsFilter
  })

  if (config.seedData) {
    for (const [tableName, data] of Object.entries(config.seedData)) {
      await db(tableName).insert(data)
    }
  }

  const providers: { [name: string]: KnexDBDataProvider } = {}
  const models = filterModelTypes(schema)
  for (const modelType of models) {
    providers[modelType.name] = new KnexDBDataProvider(modelType, db);
  }

  return { schema, providers }
}

test('batch read Todos', async () => {
  const seedData = [
    { text: 'my first default todo' },
    { text: 'my second todo' },
    { text: 'my third default todo' }
  ]

  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`, { seedData: { todo: seedData } })

  const todos = await providers.Todo.batchRead('id', ['1', '2']);

  expect(todos[0][0].id).toEqual(1);
  expect(todos[1][0].id).toEqual(2);
});

test('create Todo', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)

  const todo = await providers.Todo.create({
    text: 'create a todo',
  });

  expect(todo.id === 4);
  expect(todo.text === 'create a todo');
});

test('update Todo', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`, { seedData: { todo: { text: 'my first Todo' } } })

  const todo = await providers.Todo.update({
    id: '1',
    text: 'my updated first todo',
  });

  expect(todo.id).toEqual(1);
  expect(todo.text).toEqual('my updated first todo');
});

test('delete Todo', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`, {
    seedData: {
      todo: [{ id: '3', text: 'delete me' }]
    }
  })

  const data = await providers.Todo.delete({ id: '3' });

  expect(data.id).toEqual(3);
});

test('find all limit defaults to complete set', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)

  for (let i = 0; i < 15; i++) {
    await providers.Todo.create({
      text: `todo${i}`,
    });
  }

  const todos = await providers.Todo.findBy();

  expect(todos).toHaveLength(15)
});

test('find Todo by text', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`, {
    seedData:
    {
      todo: [
        { text: 'first todo' },
        { text: 'second todo' }
      ]
    }
  })

  const todos = await providers.Todo.findBy({
    text: { eq: 'second todo' },
  });

  expect(todos.length).toEqual(1);
  expect(todos[0].id).toEqual(2);
});

test('find first n todos by text', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)

  const numberOfTodos = 5;
  const text = 'test-todo';
  for (let i = 0; i < numberOfTodos + 1; i++) {
    await providers.Todo.create({
      text,
    });
  }

  const todos = await providers.Todo.findBy({ text: { eq: text } }, { limit: numberOfTodos });

  expect(todos.length).toEqual(numberOfTodos);
});

test('Skip n todos and find next m todos by text', async () => {
  const { providers } = await setup(
    `"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)

  const n = 2;
  const m = 3;
  const numberOfTodos = n + m;
  const text = 'test-todo';
  for (let i = 0; i < numberOfTodos; i++) {
    await providers.Todo.create({
      text,
    });
  }

  const todos = await providers.Todo.findBy({ text: { eq: text } }, {
    offset: n,
    limit: numberOfTodos
  });

  expect(todos.length).toEqual(m);
});

test('find todos by text, limit defaults to complete set', async () => {
  const { providers } = await setup(
    `"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)

  const numberOfTodos = 12;
  const text = 'test-todo';
  for (let i = 0; i < numberOfTodos; i++) {
    await providers.Todo.create({
      text
    });
  }

  const todos = await providers.Todo.findBy({ text: { eq: text } });

  expect(todos.length).toEqual(numberOfTodos);
});
