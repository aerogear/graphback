//tslint:disable-next-line: match-default-export-name
import { ObjectID } from 'mongodb';
import { advanceTo, advanceBy } from "jest-date-mock";
import { Context,createTestingContext } from "./__util__";

describe('MongoDBDataProvider Basic CRUD', () => {
  interface Todo {
    id: ObjectID;
    text: string;
  }
  let context: Context;

  const fields = ["id", "text"];

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


  afterEach(() => context.server.stop())

  test('Test mongo crud', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    let todo: Todo = await context.providers.Todos.create({
      text: 'create a todo',
    }, {graphback: {services: {}, options: { selectedFields: fields}}});

    expect(todo.text).toEqual('create a todo');

    todo = await context.providers.Todos.update({
      id: todo.id,
      text: 'my updated first todo',
    }, {graphback: {services: {}, options: { selectedFields: fields}}});

    expect(todo.text).toEqual('my updated first todo');

    const data = await context.providers.Todos.delete({ id: todo.id }, {graphback: {services: {}, options: { selectedFields: fields}}});

    expect(data.id).toEqual(todo.id);
  });


  test('find first 1 todo(s) excluding first todo', async () => {
    context = await createTestingContext(todoSchema, {
      seedData: {
        Todos: defaultTodoSeed
      }
    });
    const todos = await context.providers.Todos.findBy({}, {graphback: {services: {}, options: { selectedFields: ["text"]}}}, { limit: 1, offset: 1 });

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
    const all = await context.providers.Todos.findBy({}, {graphback: {services: {}, options: { selectedFields: []}}});
    const todos: Todo[] = await context.providers.Todos.findBy({
      text: { eq: all[0].text },
    }, {graphback: {services: {}, options: { selectedFields: ["id"]}}});
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
      }, {graphback: {services: {}, options: { selectedFields: fields}}});
    }
    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, {graphback: {services: {}, options: { selectedFields: fields}}}, { offset: 0 });

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
      }, {graphback: {services: {}, options: { selectedFields: fields}}});
    }
    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, {graphback: {services: {}, options: { selectedFields: fields}}}, { limit: 1 });
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
      }, {graphback: {services: {}, options: { selectedFields: fields}}});
    }

    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, {graphback: {services: {}, options: { selectedFields: fields}}}, { limit: 1, offset: 0 });
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

    const todos = await context.providers.Todos.findBy({ text: { contains: 'todo' } }, {graphback: {services: {}, options: { selectedFields: fields}}}, undefined, { field: 'text' });
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

    const todos = await context.providers.Todos.findBy({ text: { contains: 'todo' } }, {graphback: {services: {}, options: { selectedFields: fields}}}, undefined, { field: 'text', order: 'desc' });
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

    const res = await context.providers.Note.create({ text: 'asdf' }, {graphback: {services: {}, options: { selectedFields: ["id"]}}});
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

    const res = await context.providers.Note.create({ text: 'asdf' }, {graphback: {services: {}, options: { selectedFields: ["id"]}}});
    expect(res.updatedAt).toEqual(createDate.getTime());

    advanceBy(3000);
    const next = await context.providers.Note.update({
      ...res,
      text: 'asdftrains'
    }, {graphback: {services: {}, options: { selectedFields: ["updatedAt", "createdAt"]}}});

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
     id: ID!
     text: String,
     description: String
    }`, {
      seedData: {
        Todos: [
          { text: 'todo1', description: "first todo" },
          { text: 'todo2', description: "second todo" },
          { text: 'todo3', description: "third todo" }
        ]
      }
    });

    const todos = await context.providers.Todos.findBy({}, {graphback: {services: {}, options: { selectedFields: ["id", "text"]}}});

    expect(todos.length).toEqual(3);
    todos.forEach((todo: any) => {
      expect(todo.id).toBeDefined();
      expect(todo.text).toBeDefined();
      expect(todo.description).toBeUndefined(); // should be undefined since not selected
    });

    const createdTodo = await context.providers.Todos.create({text: "new todo", description: "todo add description"}, {graphback: {services: {}, options: { selectedFields: ["id"]}}});
    expect(createdTodo.id).toBeDefined();

    const updatedTodo = await context.providers.Todos.update({id: createdTodo.id, text: "updated todo"}, {graphback: {services: {}, options: { selectedFields: ["text"]}}});
    expect(updatedTodo.description).toBeUndefined();
    expect(updatedTodo.text).toEqual("updated todo");

    const deletedTodo = await context.providers.Todos.delete({id: createdTodo.id}, {graphback: {services: {}, options: { selectedFields: ["id", "text", "description"]}}});
    expect(deletedTodo.id).toEqual(createdTodo.id);
    expect(deletedTodo.text).toEqual("updated todo");
    expect(deletedTodo.description).toEqual("todo add description");
  });

});
