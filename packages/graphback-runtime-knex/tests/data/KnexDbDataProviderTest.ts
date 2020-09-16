/* eslint-disable max-lines */
/* eslint-disable no-console */
//tslint:disable-next-line: match-default-export-name
import { unlinkSync, existsSync } from 'fs';
import { buildSchema } from 'graphql';
import * as Knex from 'knex';
import { GraphbackDataProvider, GraphbackPluginEngine, QueryFilter } from '@graphback/core';
import { SchemaCRUDPlugin } from '../../../graphback-codegen-schema';
import { SQLiteKnexDBDataProvider } from '../../src/SQLiteKnexDBDataProvider';
import { migrateDB, removeNonSafeOperationsFilter } from '../../../graphql-migrations/src';

const dbPath = `${__dirname}/db.sqlite`;

beforeEach(() => {
  if (existsSync(dbPath)) {
    unlinkSync(dbPath)
  }
})

const setup = async (schemaStr: string, config: { seedData?: { [tableName: string]: any[] | any } } = {}) => {

  const schema = buildSchema(schemaStr);
  const pluginEngine = new GraphbackPluginEngine({ schema, plugins: [new SchemaCRUDPlugin()] })
  const metadata = pluginEngine.createResources()

  const dbConfig = {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  }

  await migrateDB(dbConfig, schema, {
    operationFilter: removeNonSafeOperationsFilter
  })

  const db = Knex(dbConfig);
  if (config.seedData) {
    for (const [tableName, data] of Object.entries(config.seedData)) {
      await db(tableName).insert(data)
    }
  }

  const providers: { [name: string]: GraphbackDataProvider } = {}
  const models = metadata.getModelDefinitions();
  for (const model of models) {
    providers[model.graphqlType.name] = new SQLiteKnexDBDataProvider(model, db);
  }

  return { schema, providers }
}

const fields = ["id", "text"];

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

  const todos = await providers.Todo.batchRead('id', ['1', '2'], {});

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

  const fullTodo = await providers.Todo.create({ text: 'create a todo' }, ['id', 'text']);
  expect(fullTodo.id).toEqual(1);
  expect(fullTodo.text).toEqual('create a todo');

  const todoWithNullText = await providers.Todo.create({}, ['id', 'text']);

  expect(todoWithNullText.id).toEqual(2);
  expect(todoWithNullText.text).toBeNull();
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
  }, ['id', 'text']);

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

  const data = await providers.Todo.delete({ id: '3' }, fields);

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
    }, ['*']);
  }

  const todos = await providers.Todo.findBy({}, ["id"]);

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
    filter: {
      text: { eq: 'second todo' },
    }
  });

  expect(todos.length).toEqual(1);
  expect(todos[0].id).toEqual(2);
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
    filter: {
      text: { eq: 'second todo' },
    }
  });

  expect(todos.length).toEqual(1);
  expect(todos[0].id).toEqual(2);
});

test('notEqual operator', async () => {
  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 text: String
}`)

  await providers.Todo.create({ text: 'Test Graphback' })
  await providers.Todo.create({ text: 'Test Graphback' })
  await providers.Todo.create({ text: 'Test Graphback tomorrow' })

  const todos = await providers.Todo.findBy({ filter: { text: { ne: 'Test Graphback tomorrow' } } });

  expect(todos.length).toEqual(2);
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

  const todos = await providers.Todo.findBy({
    filter: {
      text: { eq: text }
    },
    page: {
      offset: n,
      limit: numberOfTodos
    }
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
    }, fields);
  }

  const todos = await providers.Todo.findBy({ filter: { text: { eq: text } } });

  expect(todos.length).toEqual(numberOfTodos);
});

test('or clause as object', async () => {
  const seedData = [
    { title: 'one', description: 'one description' },
    { title: 'two', description: '' },
    { title: 'three', description: 'three description' }
  ]

  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 title: String
 description: String
}`, { seedData: { todo: seedData } })

  const todos = await providers.Todo.findBy({
    filter: {
      title: {
        eq: "three"
      },
      or: [{
        description: {
          eq: "three description"
        }
      }]
    }
  })

  expect(todos).toHaveLength(1)
});

test('or clause as array', async () => {
  const seedData = [
    { title: 'one', description: 'one description' },
    { title: 'two', description: '' },
    { title: 'three', description: 'three description' }
  ]

  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 title: String
 description: String
}`, { seedData: { todo: seedData } })

  const filter: QueryFilter = {
    or: [
      {
        title: {
          eq: "one"
        }
      },
      {
        title: {
          eq: "three"
        },
      },
      {
        description: {
          eq: ""
        }
      }
    ]
  };

  const todos = await providers.Todo.findBy({ filter })

  expect(todos).toHaveLength(3)

  // count
  const count = await providers.Todo.count(filter);

  expect(count).toEqual(3);
});

test('and clause', async () => {
  const seedData = [
    { title: 'one', description: 'one description' },
    { title: 'two', description: '' },
    { title: 'three', description: 'three description' }
  ]

  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 title: String
 description: String
}`, { seedData: { todo: seedData } })

  const todos = await providers.Todo.findBy({
    filter: {
      title: {
        eq: "two"
      },
      and: [
        {
          description: {
            eq: ""
          }
        }
      ]
    }
  })

  expect(todos).toHaveLength(1)

  const count = await providers.Todo.count({
    title: {
      eq: "two"
    },
    and: [
      {
        description: {
          eq: ""
        }
      }]
  })

  expect(count).toEqual(1)
});

test('not clause', async () => {
  const seedData = [
    { title: 'one', description: 'one description' },
    { title: 'two', description: '' },
    { title: 'three', description: 'three description' }
  ]

  const { providers } = await setup(`
"""
@model
"""
type Todo {
 id: ID!
 title: String
 description: String
}`, { seedData: { todo: seedData } })

  const todos = await providers.Todo.findBy({
    filter: {
      "not": {
        "description": {
          "eq": ""
        }
      }
    }
  })

  expect(todos).toHaveLength(2)

  // count
  const count = await providers.Todo.count({
    "not": {
      "description": {
        "eq": ""
      }
    }
  })

  expect(count).toEqual(2)
});

test('order todos by ID in descending order', async () => {
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

  const todos = await providers.Todo.findBy({ filter: { text: { eq: text } }, orderBy: { order: 'desc', field: 'id' } });

  expect(todos[0].id).toEqual(12);
});

test('order todos by ID in ascending order using default order value', async () => {
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

  const todos = await providers.Todo.findBy({ filter: { text: { eq: text } }, orderBy: { field: 'id' } });

  expect(todos[0].id).toEqual(1);
});

test('get todos with field value in a range', async () => {
  const { providers } = await setup(
    `"""
@model
"""
type Todo {
 id: ID!
 items: Int
}`, {
    seedData: {
      todo: [
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
  })

  const todos = await providers.Todo.findBy({ filter: { items: { between: [2, 6] } } });

  expect(todos).toHaveLength(5);

  const todoItems = todos.map((t: any) => t.items)

  expect(todoItems).toEqual([2, 3, 4, 5, 6])

  // count
  const count = await providers.Todo.count({ items: { between: [2, 6] } });
  expect(count).toEqual(5);
});

test('get todos with field value not in a range', async () => {
  const { providers } = await setup(
    `"""
@model
"""
type Todo {
 id: ID!
 items: Int
}`, {
    seedData: {
      todo: [
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
  })

  const todos = await providers.Todo.findBy({
    filter: {
      not: {
        items: { between: [2, 6] }
      }
    }
  });

  expect(todos).toHaveLength(2);

  const todoItems = todos.map((t: any) => t.items)

  expect(todoItems).toEqual([1, 8])
});

test('get todos with field value not in a given array argument', async () => {
  const { providers } = await setup(
    `"""
@model
"""
type Todo {
 id: ID!
 items: Int
}`, {
    seedData: {
      todo: [
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

  // verify that not in operator works
  const allTodos = await providers.Todo.findBy();

  const ignoredList = allTodos.slice(0, 2);
  const subListOfTodos = allTodos.slice(2);

  const ignoreListFromDatabase = await providers.Todo.findBy({
    filter: {
      not: {
        id: {
          in: subListOfTodos.map(({ id }) => id)
        }
      }
    }
  });

  expect(ignoredList).toEqual(ignoreListFromDatabase);

  // create a new TODO
  const newTodoItems = 2709;
  await providers.Todo.create({ items: newTodoItems });
  const allTodosAfterCreation = await providers.Todo.findBy({});

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

test('select only requested fields', async () => {
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

  const todos = await providers.Todo.findBy(undefined, ['id']);

  expect(todos.length).toEqual(2);
  todos.forEach((todo, index) => {
    expect(todo.id).toEqual(1 + index);
    expect(todo.text).toBeUndefined();
  });

  const createdTodo = await providers.Todo.create({ text: "new todo" }, ["id"]);
  expect(createdTodo.id).toEqual(3);
  expect(createdTodo.text).toBeUndefined();

  const updatedTodo = await providers.Todo.update({ id: "3", text: "updated todo" }, ["text"]);
  expect(updatedTodo.id).toBeUndefined();
  expect(updatedTodo.text).toEqual("updated todo");

  const deletedTodo = await providers.Todo.update({ id: "3" }, ["id", "text"]);
  expect(deletedTodo.id).toEqual(3);
  expect(deletedTodo.text).toEqual("updated todo");
});

describe('or', () => {
  it('a && (b || c)', async () => {
    const { providers: { Todo } } = await setup(`
    

    """
    @model
    """
    type Todo {
      id: ID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        todo: [
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

    const items = await Todo.findBy({ filter });

    expect(items).toHaveLength(2);
  });

  it('a && (b || c) starting at first $or', async () => {
    const { providers: { Todo } } = await setup(`
    

    """
    @model
    """
    type Todo {
      id: ID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        todo: [
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

    const items = await Todo.findBy({ filter });

    expect(items).toHaveLength(2);
  });

  it('a && (c || b) from nested $or', async () => {
    const { providers: { Todo } } = await setup(`
    

    """
    @model
    """
    type Todo {
      id: ID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        todo: [
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

    const items = await Todo.findBy({ filter });

    expect(items).toHaveLength(2);
  });

  it('a || a || a', async () => {
    const { providers: { Todo } } = await setup(`
    

    """
    @model
    """
    type Todo {
      id: ID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        todo: [
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

    const items = await Todo.findBy({ filter });

    expect(items).toHaveLength(3)
  })

  it('a || (a && b)', async () => {
    const { providers: { Todo } } = await setup(`
    """
    @model
    """
    type Todo {
      id: ID
      a: Int
      b: Int
      c: Int
    }
    `, {
      seedData: {
        todo: [
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
          a: {
            eq: 2
          },
          b: {
            eq: 3
          }
        }
      ]
    }

    const items = await Todo.findBy({ filter });

    expect(items).toHaveLength(3)
  })
})

test('or > not', async () => {

  const { providers: { Todo } } = await setup(`
    """
    @model
    """
    type Todo {
      id: ID
      a: Int
    }
    `, {
    seedData: {
      todo: [
        {
          a: 1,
        },
        {
          a: 2,
        },
        {
          a: 2,
        },
        {
          a: 3,
        },
        {
          a: 11
        }
      ]
    }
  });

  const filter: QueryFilter = {
    or: [
      {
        a: {
          in: [1, 11]
        }
      },
      {
        not: {
          a: {
            eq: 2
          }
        }
      }
    ]
  }

  const items = await Todo.findBy({ filter });

  expect(items).toHaveLength(3)
})
