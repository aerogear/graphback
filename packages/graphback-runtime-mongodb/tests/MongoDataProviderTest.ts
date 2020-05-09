//tslint:disable-next-line: match-default-export-name
import { buildSchema, GraphQLObjectType } from 'graphql';
import { filterModelTypes } from '@graphback/core'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, ObjectID } from 'mongodb';
import { MongoDBDataProvider } from '../src/MongoDBDataProvider';

interface Context {
  providers: { [modelname: string]: MongoDBDataProvider };
  server: MongoMemoryServer
}

async function createTestingContext(schemaStr: string):Promise<Context> {
  // Setup graphback
  const schema = buildSchema(schemaStr);

  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('test');

  const providers: { [name: string]: MongoDBDataProvider } = {}
  const models = filterModelTypes(schema)
  for (const modelType of models) {
    providers[modelType.name] = new MongoDBDataProvider(modelType, db);
  }
  return { server, providers }
}

describe('MongoDBDataProvider Basic CRUD', () => {
  interface Todo {
    id: ObjectID;
    text: string;
  }
  let context: Context;


  //Create a new database before each tests so that
  //all tests can run parallel
  beforeEach(async () => {
    const { providers, server } = await createTestingContext(`
    """
    @model
    """
    type Todos {
    id: ID!
    text: String 
    }
    `);
    context = { providers, server };

    await providers.Todos.create({
      text: 'todo',
    });

    await providers.Todos.create({
      text: 'todo2',
    });
  });

  afterEach(async () => {
    await context.server.stop();
  })

  test('Test mongo crud', async () => {
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


  test('find all Todos', async () => {
    const todos = await context.providers.Todos.findAll();
    expect(todos.length).toBeGreaterThan(0);
  });

  test('find all Todos, limit defaults to complete set', async () => {
    for (let i = 0; i < 10; i++) {
      await context.providers.Todos.create({
        text: `todo`,
      });
    }
    const todos = await context.providers.Todos.findAll({ offset: 1 });
    expect(todos.length).toEqual(11);
  });

  test('find all offset defaults to 0', async () => {
    const todos = await context.providers.Todos.findAll({ limit: 1 });
    expect(todos[0].text).toEqual('todo');
  });

  test('find first 1 todos', async () => {
    const todos = await context.providers.Todos.findAll({ limit: 1, offset: 0 });

    expect(todos.length).toEqual(1);

    expect(todos[0].text).toEqual('todo');
  });

  test('find first 1 todo(s) excluding first todo', async () => {
    const todos = await context.providers.Todos.findAll({ limit: 1, offset: 1 });

    expect(todos.length).toEqual(1);

    expect(todos[0].text).toEqual('todo2');
  });

  test('find Todo by text', async () => {
    const all = await context.providers.Todos.findAll();
    const todos: Todo[] = await context.providers.Todos.findBy({
      text: { eq: all[0].text },
    });
    expect(todos.length).toBeGreaterThan(0);
  });

  test('find Todo by text, limit defaults to complete set', async () => {
    const text = 'todo-test';
    for (let i = 0; i < 11; i++) {
      await context.providers.Todos.create({
        text,
      });
    }
    const todos: Todo[] = await context.providers.Todos.findBy({ text: { eq: text } }, { offset: 0 });
    expect(todos.length).toEqual(11);
  });

  test('find by text offset defaults to 0', async () => {
    const text = 'todo-test';
    for (let i = 0; i < 2; i++) {
      await context.providers.Todos.create({
        text,
      });
    }
    const todos = await context.providers.Todos.findBy({ text: { eq: text } }, { limit: 1 });
    expect(todos[0].text).toEqual(text);
  });

  test('find first 1 todos by text', async () => {
    const text = 'todo-test';
    for (let i = 0; i < 2; i++) {
      await context.providers.Todos.create({
        text,
      });
    }

    const todos = await context.providers.Todos.findBy({ text: { eq: text } }, { limit: 1, offset: 0 });
    expect(todos.length).toEqual(1);
    expect(todos[0].text).toEqual(text);
  });
});




describe('MongoDBDataProvider Advanced Filtering', () => {

  interface Post {
    id: ObjectID;
    text: string;
    likes: Number;
  }
  let context: Context;


  //Create a new database before each tests so that
  //all tests can run parallel
  beforeEach(async () => {

    context = await createTestingContext(`
    """
    @model
    """
    type Post {
    id: ID!
    text: String
    likes: Int
    }
    `);

    await context.providers.Post.create({
      text: 'post',
      likes: 300,
    });

    await context.providers.Post.create({
      text: 'post2',
      likes: 50
    });

    await context.providers.Post.create({
      text: 'post3',
      likes: 1500
    });
  });

  afterEach(async () => {
    await context.server.stop();
  });

  it('can filter using AND', async () => {
    const posts: Post[] = await context.providers.Post.findBy({
      and: [
        {
          text: { eq: 'post' }
        },
        {
          likes: { eq: 300 }
        }
      ]
    });

    for(const post of posts) {
      expect(post.text).toEqual('post');
      expect(post.likes).toEqual(300);
    }
    
  });

  it('can filter using OR', async () => {
    const posts: Post[] = await context.providers.Post.findBy({
      or: [
        {
          text: { eq: 'post2' }
        },
        {
          likes: { eq: 300 }
        }
      ]
    });

    for(const post of posts) {
      expect((post.text === 'post2') || (post.likes === 300));
    }
  });

  it('can filter using NOT', async () => {
    const posts: Post[] = await context.providers.Post.findBy({
      not: [
        {
          text: { eq: 'post2' }
        },
        {
          likes: { eq: 300 }
        }
      ]
    });

    for(const post of posts) {
      expect(post.text).not.toEqual('post2');
      expect(post.likes).not.toEqual(300);
    }
  });

  it('can filter using between operator', async () => {
    const posts :Post[] = await context.providers.Post.findBy({
          likes: { between: [250, 350] }
    });

    for (const post of posts) {
      expect(post.likes).toBeLessThanOrEqual(350);
      expect(post.likes).toBeGreaterThanOrEqual(250);
    }
  });

  it('can filter using nbetween operator', async () => {
    const posts :Post[] = await context.providers.Post.findBy({
      likes: { nbetween: [250, 350] }
    });

    for (const post of posts) {
      expect((post.likes < 250) || (post.likes > 350));
    }
  });

  it('can use nested filters', async () => {
    const posts :Post[] = await context.providers.Post.findBy({
      and: [
        {
          or: [
            { likes: { between: [250, 350] } },
            { likes: { between: [25, 75] } }
          ]
        },
        {
          or: [
            { title: { eq: 'post' } },
            { title: { eq: 'post2' } }
          ]
        }
      ]
    });

    for (const post of posts) {
      expect(
        (
          (post.likes >= 250) && (post.likes <= 350)
        )
        ||
        (
          (post.likes >= 25) && (post.likes <= 75)
        )
      );

      expect(
        (post.text === 'post')
        ||
        (post.text === 'post2')
      );
    }
  });

  it('can use contains operator', async () => {
    const posts: Post[] = await context.providers.Post.findBy({
      text: { contains: 'post' }
    });

    for (const post of posts) {
      expect(post.text).toEqual(expect.stringContaining('post'))
    }

  });

  it('can use startswith operator', async () => {
    const posts: Post[] = await context.providers.Post.findBy({
      text: { startswith: 'post' }
    });

    for (const post of posts) {
      expect(post.text).toEqual(expect.stringMatching(/^post/g))
    }

  });

  it('can use endswith operator', async () => {
    const posts: Post[] = await context.providers.Post.findBy({
      text: { endswith: 'post' }
    });

    for (const post of posts) {
      expect(post.text).toEqual(expect.stringMatching(/post$/g))
    }

  });

})