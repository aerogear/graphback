/* eslint-disable max-lines */
import { ObjectID } from 'mongodb';
import { advanceTo, advanceBy } from "jest-date-mock";
import { createTestingContext, Context } from "./__util__";

describe('MongoDBDataProvider Advanced Filtering', () => {

  interface Post {
    _id: ObjectID;
    text: string;
    likes: number;
  }
  let context: Context;

  const postSchema = `
      """
      @model
      """
      type Post {
      _id: GraphbackObjectID
      text: String
      likes: Int
      }

      scalar GraphbackObjectID
      `;

  const defaultPostSeed = [
    { text: 'post', likes: 300 },
    { text: 'post2', likes: 50 },
    { text: 'post3', likes: 1500 },
  ]


  //Create a new database before each tests so that
  //all tests can run parallel

  afterEach(() => context.server.stop());

  it('can filter ObjectID', async () => {
    context = await createTestingContext(postSchema);

    const newPost = await context.providers.Post.create({ text: 'hello', likes: 100 });

    const findPost = await context.providers.Post.findBy({ filter: { _id: { eq: newPost._id } } });
    expect(findPost).toHaveLength(1)
    expect(findPost[0].text).toEqual(newPost.text);
  })

  it('can filter using AND', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        and: [
          {
            text: { eq: 'post' }
          },
          {
            likes: { eq: 300 }
          }
        ]
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.text).toEqual('post');
      expect(post.likes).toEqual(300);
    }

  });

  it('can filter using OR', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        text: { eq: 'post2' },
        or: [{
          likes: { eq: 300 }
        }]
      }
    });
    expect(posts.length).toEqual(2);
    for (const post of posts) {
      expect((post.text === 'post2') || (post.likes === 300));
    }
  });

  it('can filter using NOT', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        not: [
          {
            text: { eq: 'post2' }
          },
          {
            likes: { eq: 300 }
          }
        ]
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.text).not.toEqual('post2');
      expect(post.likes).not.toEqual(300);
    }
  });

  it('can filter using between operator', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        likes: { between: [250, 350] }
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.likes).toBeLessThanOrEqual(350);
      expect(post.likes).toBeGreaterThanOrEqual(250);
    }
  });

  it('can filter using nbetween operator', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        likes: { nbetween: [250, 350] }
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect((post.likes < 250) || (post.likes > 350));
    }
  });

  it('can use nested filters', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        and: [
          {
            or: [
              { likes: { between: [250, 350] } },
              { likes: { between: [25, 75] } }
            ]
          },
          {
            or: [
              { text: { eq: 'post' } },
              { text: { eq: 'post2' } }
            ]
          }
        ]
      }
    });


    expect(posts.length).toBeGreaterThanOrEqual(1);
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
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        text: { contains: 'post' }
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.text).toEqual(expect.stringContaining('post'))
    }

  });

  it('can use startsWith operator', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        text: { startsWith: 'post' }
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.text).toEqual(expect.stringMatching(/^post/g))
    }

  });

  it('can use endsWith operator', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: defaultPostSeed
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        text: { endsWith: 'post' }
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.text).toEqual(expect.stringMatching(/post$/g))
    }

  });

  test('escaping regex strings', async () => {
    context = await createTestingContext(postSchema, {
      seedData: {
        Post: [
          ...defaultPostSeed,
          { text: 'p..t', likes: 4500 }
        ]
      }
    });

    const posts: Post[] = await context.providers.Post.findBy({
      filter: {
        text: { contains: 'p..t' }
      }
    });

    expect(posts.length).toBeGreaterThanOrEqual(1);
    for (const post of posts) {
      expect(post.text).toMatch(/p\.\.t/g)
    }

  });

});

describe('queryBuilder scalar filtering', () => {
  let context: Context;

  afterEach(() => context.server.stop());

  it('can filter @versioned metadata fields', async () => {

    context = await createTestingContext(`
    """
    @model
    @versioned
    """
    type Post {
    _id: GraphbackObjectID
    text: String
    }

    scalar GraphbackObjectID
    `)
    const startTime = 1590679886048;
    advanceTo(startTime);

    // Create some posts
    for (const postTitle of ["hi guys", "not yet", "bye guys"]) {
      advanceBy(3000);
      await context.providers.Post.create({ text: postTitle });
    }

    // Get all posts created since startTime
    const posts = await context.providers.Post.findBy({
      filter: {
        createdAt: { gt: startTime }
      }
    });
    expect(posts.length).toEqual(3);
    expect(posts.map((post: any) => post.text)).toEqual(["hi guys", "not yet", "bye guys"]);

    // Get all posts created after the first post
    const newPosts = await context.providers.Post.findBy({ filter: { createdAt: { gt: posts[0].createdAt } } });
    expect(newPosts.length).toEqual(2);
    expect(newPosts.map((post: any) => post.text)).toEqual(["not yet", "bye guys"]);
  });
});
