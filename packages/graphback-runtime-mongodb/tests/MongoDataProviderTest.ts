/* eslint-disable max-lines */
import { ObjectID } from 'mongodb';
import { advanceTo, advanceBy } from "jest-date-mock";
import { QueryFilter, GraphbackPluginEngine } from '@graphback/core';
import { SchemaCRUDPlugin } from '../../graphback-codegen-schema'
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';
import { Context, createTestingContext } from "./__util__";

describe('MongoDBDataProvider Basic CRUD', () => {
  interface Todo {
    _id: ObjectID;
    text: string;
  }
  let context: Context;

  const fields = ["_id", "text"];

  const todoSchema = `
  """
  @model
  """
  type Todos {
  _id: GraphbackObjectID!
  text: String
  }

  scalar GraphbackObjectID
  `;

  const defaultTodoSeed = [
    {
      text: 'todo'
    },
    {
      text: 'todo2'
    }
  ]

  afterEach(async (done) => {
    if (context) {
      await context.server.stop();
    }

    done();
  })

  afterEach(async () => context?.server?.stop());

  test('Test missing "_id: GraphbackObjectID" primary key', async () => {
    const schema = `
    """
    @model
    """
    type MissingPrimaryKeyModel {
    id: ID!
    text: String
    }
    `;


    try {
      const pluginEngine = new GraphbackPluginEngine({ schema, plugins: [new SchemaCRUDPlugin()] })
      const metadata = pluginEngine.createResources();
      const models = metadata.getModelDefinitions();

      for (const model of models) {
        new MongoDBDataProvider(model, undefined);
      }
      expect(true).toBeFalsy(); // should not reach here
    } catch (error) {
      expect(error.message).toEqual('Model "MissingPrimaryKeyModel" must contain a "_id: GraphbackObjectID" primary key. Visit https://graphback.dev/docs/model/datamodel#mongodb to see how to set up one for your MongoDB model.');
    }
  });

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
      _id: todo._id,
      text: 'my updated first todo',
    }, fields);

    expect(todo.text).toEqual('my updated first todo');

    const data = await context.providers.Todos.delete({ _id: todo._id }, fields);

    expect(data._id).toEqual(todo._id);
  });


  test('find first 1 todo(s) excluding first todo', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const todos = await context.providers.Todos.findBy({ page: { limit: 1, offset: 1 } }, ["text"]);

    // check that count is total number of seeded Todos
    const count = await context.providers.Todos.count({});
    expect(count).toEqual(defaultTodoSeed.length);

    // check limit applied
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
      filter: {
        text: { eq: all[0].text },
      }
    }, ["_id"]);
    expect(todos.length).toBeGreaterThan(0);
    const count = await context.providers.Todos.count({
      text: { eq: all[0].text }
    })
    expect(count).toEqual(todos.length);
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
    const todos: Todo[] = await context.providers.Todos.findBy({ filter: { text: { eq: text } }, page: { offset: 0 } }, fields);

    expect(todos.length).toEqual(11);

    const count = await context.providers.Todos.count({ text: { eq: text } });
    expect(count).toEqual(11);
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
    const todos: Todo[] = await context.providers.Todos.findBy({ filter: { text: { eq: text } }, page: { limit: 1 } }, fields);
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

    const todos: Todo[] = await context.providers.Todos.findBy({
      filter: {
        text: { eq: text }
      },
      page: { limit: 1, offset: 0 }
    }, fields);
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

    const todos = await context.providers.Todos.findBy({ filter: { text: { contains: 'todo' } }, orderBy: { field: 'text' } }, fields);
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

    const todos = await context.providers.Todos.findBy({ filter: { text: { contains: 'todo' } }, orderBy: { field: 'text', order: 'desc' } }, fields);
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
      _id: GraphbackObjectID!
      text: String
    }

    scalar GraphbackObjectID
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
      _id: GraphbackObjectID!
      text: String
    }

    scalar GraphbackObjectID
    `);
    const createDate = new Date(2020, 5, 26, 18, 29, 23);
    advanceTo(createDate);

    const res = await context.providers.Note.create({ text: 'asdf' });
    expect(res.updatedAt).toEqual(createDate.getTime());

    advanceBy(3000);
    const next = await context.providers.Note.update({
      ...res,
      text: 'asdftrains'
    }, ["updatedAt", "createdAt"]);

    const updateDate = new Date();
    expect(next.updatedAt).toEqual(updateDate.getTime());
    expect(next.createdAt).toEqual(createDate.getTime())
  })

  test('select only requested fields', async () => {
    context = await createTestingContext(`
    """
    @model
    """
    type Todos {
     _id: GraphbackObjectID!
     text: String,
     description: String
    }
    scalar GraphbackObjectID
    `, {
      seedData: {
        Todos: [
          { text: 'todo1', description: "first todo" },
          { text: 'todo2', description: "second todo" },
          { text: 'todo3', description: "third todo" }
        ]
      }
    });

    const todos = await context.providers.Todos.findBy({}, ["_id", "text"]);

    expect(todos.length).toEqual(3);
    todos.forEach((todo: any) => {
      expect(todo._id).toBeDefined();
      expect(todo.text).toBeDefined();
      expect(todo.description).toBeUndefined(); // should be undefined since not selected
    });

    const createdTodo = await context.providers.Todos.create({ text: "new todo", description: "todo add description" });
    expect(createdTodo._id).toBeDefined();

    const updatedTodo = await context.providers.Todos.update({ _id: createdTodo._id, text: "updated todo" }, ["text"]);
    expect(updatedTodo.description).toBeUndefined();
    expect(updatedTodo.text).toEqual("updated todo");

    const deletedTodo = await context.providers.Todos.update({ _id: createdTodo._id }, ["_id", "text", "description"]);
    expect(deletedTodo._id).toEqual(createdTodo._id);
    expect(deletedTodo.text).toEqual("updated todo");
    expect(deletedTodo.description).toEqual("todo add description");
  });

  test('get todos with field value not in a given arrray argument', async () => {
    context = await createTestingContext(`"""
    @model
    """
    type Todo {
     _id: GraphbackObjectID!
     items: Int
    }
    scalar GraphbackObjectID
    `, {
      seedData: {
        Todo: [
          {
            items: 1,
          },
          {
            items: 2,
          },
          {
            items: 3
          },
          {
            items: 4
          },
          {
            items: 5
          },
          {
            items: 6
          },
          {
            items: 8
          }
        ]
      }
    });


    const { providers } = context;

    // verify that not in operator works
    const allTodos = await providers.Todo.findBy();
    const newTodoItems = 2709;
    await providers.Todo.create({ items: newTodoItems });
    const allTodosAfterCreation = await providers.Todo.findBy();

    expect(allTodosAfterCreation.length).toEqual(allTodos.length + 1); // verify that a new todo was created

    // retrieve all todo that do not have the newTodoItems using the in operator and verify

    const oldTodos = await providers.Todo.findBy({
      filter: {
        not: {
          items: {
            in: [newTodoItems]
          }
        }
      }
    });

    expect(oldTodos).toEqual(allTodos); // assert that we did not retrieve the newly added todo item
  });

  it('a && (b || c)', async () => {
    context = await createTestingContext(`
    scalar GraphbackObjectID

    """
    @model
    """
    type Todo {
      _id: GraphbackObjectID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 1,
            b: 2,
            c: 10
          },
          {
            a: 1,
            b: 5,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    })

    const filter: QueryFilter = {
      a: {
        eq: 1
      },
      or: [
        {
          c: {
            eq: 6
          }
        }, {
          b: {
            eq: 5
          }
        }
      ]
    }

    const items = await context.providers.Todo.findBy({ filter });

    expect(items).toHaveLength(2);
  });

  it('a && (b || c) starting at first $or', async () => {
    context = await createTestingContext(`
    scalar GraphbackObjectID

    """
    @model
    """
    type Todo {
      _id: GraphbackObjectID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 1,
            b: 2,
            c: 10
          },
          {
            a: 1,
            b: 5,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    })

    const filter: QueryFilter = {
      or: [
        {
          a: {
            eq: 1
          },
          or: [
            {
              c: {
                eq: 6
              }
            }, {
              b: {
                eq: 5
              }
            }
          ]
        }
      ]
    }

    const items = await context.providers.Todo.findBy({ filter });

    expect(items).toHaveLength(2);
  });

  it('a && (c || b) from nested $or', async () => {
    context = await createTestingContext(`
    scalar GraphbackObjectID

    """
    @model
    """
    type Todo {
      _id: GraphbackObjectID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 1,
            c: 8
          },
          {
            a: 9,
            b: 2,
            c: 10
          },
          {
            a: 1,
            b: 5,
            c: 3
          },
          {
            a: 1,
            b: 6,
            c: 6
          }
        ]
      }
    });

    const filter: QueryFilter = {
      or: [
        {
          a: {
            eq: 1
          },
          or: [
            {
              c: {
                eq: 6
              }
            }, {
              b: {
                eq: 5
              }
            }
          ]
        }
      ]
    }

    const items = await context.providers.Todo.findBy({ filter });

    expect(items).toHaveLength(2);
  });

  it('a || a || a', async () => {
    context = await createTestingContext(`
    scalar GraphbackObjectID

    """
    @model
    """
    type Todo {
      _id: GraphbackObjectID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 2,
            c: 10
          },
          {
            a: 3,
            b: 5,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    });

    const filter: QueryFilter = {
      or: [
        {
          a: {
            eq: 1
          }
        },
        {
          a: {
            eq: 2
          }
        },
        {
          a: {
            eq: 3
          }
        }
      ]
    }

    const items = await context.providers.Todo.findBy({ filter });

    expect(items).toHaveLength(3)
  })

  it('a || (a && b)', async () => {
    context = await createTestingContext(`
    scalar GraphbackObjectID

    """
    @model
    """
    type Todo {
      _id: GraphbackObjectID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        Todo: [
          {
            a: 1,
            b: 5,
            c: 8
          },
          {
            a: 2,
            b: 3,
            c: 10
          },
          {
            a: 2,
            b: 3,
            c: 3
          },
          {
            a: 6,
            b: 6,
            c: 3
          }
        ]
      }
    });

    const filter: QueryFilter = {
      or: [
        {
          a: {
            eq: 1
          },
        },
        {
          or: [
            {
              a: {
                eq: 2
              },
              b: {
                eq: 3
              }
            }
          ]
        }
      ]
    }

    const items = await context.providers.Todo.findBy({ filter });

    expect(items).toHaveLength(3)
  })
});
