//tslint:disable-next-line: match-default-export-name
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ObjectID, MongoClient } from 'mongodb';
import { buildSchema } from 'graphql';
import { filterModelTypes, GraphbackCoreMetadata } from '@graphback/core';
import { advanceTo, advanceBy } from "jest-date-mock";
import { SchemaCRUDPlugin } from "@graphback/codegen-schema";
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';


export interface Context {
  providers: { [modelname: string]: MongoDBDataProvider };
  server: MongoMemoryServer
}

export async function createTestingContext(schemaStr: string, config?: { seedData: { [collection: string]: any[] } }): Promise<Context> {
    // Setup graphback
    let schema = buildSchema(schemaStr);
  
    const server = new MongoMemoryServer();
    const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('test');

    const defautConfig = {
      "create": true,
      "update": true,
      "findOne": true,
      "find": true,
      "delete": true,
      "subCreate": true,
      "subUpdate": true,
      "subDelete": true
    }
  
    const schemaGenerator = new SchemaCRUDPlugin({ outputPath: './tmp', format: 'graphql'})
    const metadata = new GraphbackCoreMetadata({
      crudMethods: defautConfig
    }, schema)
    schema = schemaGenerator.transformSchema(metadata)
  
    const providers: { [name: string]: MongoDBDataProvider } = {}
    const models = filterModelTypes(schema)
    for (const modelType of models) {
      providers[modelType.name] = new MongoDBDataProvider(modelType, db);
    }
  
    // if seed data is supplied, insert it into collections
    if (config?.seedData) {
      const collectionNames = Object.keys(config.seedData);
      for (const collectionName of collectionNames) {
        for (const element of config.seedData[collectionName]) {
          await providers[collectionName].create(element);
        }
      };
    }
  
    return { server, providers }
  }

describe('MongoDBDataProvider Basic CRUD', () => {
  interface Todo {
    id: ObjectID;
    text: string;
  }
  let context: Context;

  const todoSchema = `
  """
  @model
  """
  type Todos {
  id: ID!
  text: String 
  }
  `;

  const defaultTodoSeed = [
    {
      text: 'todo'
    },
    {
      text: 'todo2'
    }
  ]


  //Create a new database before each tests so that
  //all tests can run parallel


  afterEach(async () => {
    await context.server.stop();
  })

  test('Test mongo crud', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    let todo: Todo = await context.providers.Todos.create({
      text: 'create a todo',
    });

    expect(todo.text).toEqual('create a todo');

    todo = await context.providers.Todos.update({
      id: todo.id,
      text: 'my updated first todo',
    });

    expect(todo.text).toEqual('my updated first todo');

    const data = await context.providers.Todos.delete({ id: todo.id });

    expect(data.id).toEqual(todo.id);
  });


  test('find first 1 todo(s) excluding first todo', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const todos = await context.providers.Todos.findBy({}, undefined, { limit: 1, offset: 1 });

    expect(todos.length).toEqual(1);

    expect(todos[0].text).toEqual('todo2');
  });

  test('find Todo by text', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const all = await context.providers.Todos.findBy();
    const todos: Todo[] = await context.providers.Todos.findBy({
      text: { eq: all[0].text },
    });
    expect(todos.length).toBeGreaterThan(0);
  });

  test('find Todo by text, limit defaults to complete set', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const text = 'todo-test';
    for (let i = 0; i < 11; i++) {
      await context.providers.Todos.create({
        text,
      });
    }
    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, undefined, { offset: 0 });
    expect(todos.length).toEqual(11);
  });

  test('find by text offset defaults to 0', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const text = 'todo-test';
    for (let i = 0; i < 2; i++) {
      await context.providers.Todos.create({
        text,
      });
    }
    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, undefined, { limit: 1 });
    expect(todos[0].text).toEqual(text);
  });

  test('find first 1 todos by text', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const text = 'todo-test';
    for (let i = 0; i < 2; i++) {
      await context.providers.Todos.create({
        text,
      });
    }

    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, undefined, { limit: 1, offset: 0 });
    expect(todos.length).toEqual(1);
    expect(todos[0].text).toEqual(text);
  });

  test('test orderby w/o order', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: [
          { text: 'todo3' },
          { text: 'todo1' },
          { text: 'todo4' },
          { text: 'todo2' },
          { text: 'todo5' },
        ]
      }
    });

    const todos = await context.providers.Todos.findBy({ text: { contains: 'todo' } }, { field: 'text' });
    for (let t = 0; t < todos.length; t++) {
      expect(todos[t].text).toEqual(`todo${t + 1}`);
    }
  });

  test('test orderby with desc order', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: [
          { text: 'todo3' },
          { text: 'todo1' },
          { text: 'todo4' },
          { text: 'todo2' },
          { text: 'todo5' },
        ]
      }
    });

    const todos = await context.providers.Todos.findBy({ text: { contains: 'todo' } }, { field: 'text', order: 'desc' });
    for (let t = 0; t < todos.length; t++) {
      expect(todos[t].text).toEqual(`todo${5 - t}`);
    }
  });

  test('createdAt', async () => {
    context = await createTestingContext(`
    """
    @model
    @versioned
    """
    type Note {
      id: ID!
      text: String
    }
    `);
    const cDate = new Date(2020, 5, 26, 18, 29, 23);
    advanceTo(cDate);

    const res = await context.providers.Note.create({ text: 'asdf' });
    expect(res.createdAt).toEqual(cDate.getTime());
    expect(res.createdAt).toEqual(res.updatedAt);
  })

  test('updatedAt', async () => {
    context = await createTestingContext(`
    """
    @model
    @versioned
    """
    type Note {
      id: ID!
      text: String
    }
    `);
    const createDate = new Date(2020, 5, 26, 18, 29, 23);
    advanceTo(createDate);

    const res = await context.providers.Note.create({ text: 'asdf' });
    expect(res.updatedAt).toEqual(createDate.getTime());

    advanceBy(3000);
    const next = await context.providers.Note.update({
      ...res,
      text: 'asdftrains'
    });

    const updateDate = new Date();
    expect(next.updatedAt).toEqual(updateDate.getTime());
    expect(next.createdAt).toEqual(createDate.getTime())
  })
});
