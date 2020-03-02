import { serial as test } from "ava";
import { request } from "graphql-request";
import { TestxDirector } from "./TestxDirector";
import { TestxController } from "./TestxController";
import { TestxServer } from "./TestxServer";

const ITEM_MODEL = `
  type Item {
    id: ID!
    title: String!
  }
`;

async function newTestx(
  schema: string
): Promise<[TestxController, TestxDirector]> {
  // create classic TestxServer
  const server = new TestxServer({ schema });

  // wrap the TestxServer inside the TestxController
  const controller = new TestxController(server);
  await controller.start(); // start the controller but not the server

  // create the TestxDirector to talk with the controller
  const director = new TestxDirector(await controller.httpUrl());

  return [controller, director];
}

test("test start() and close() methods", async t => {
  const [controller, director] = await newTestx(ITEM_MODEL);

  await director.start();
  const httpUrl = await director.httpUrl();
  t.assert(httpUrl);

  const queries = await director.getQueries();
  const result = await request(httpUrl, queries.findAllItems);
  t.assert(result.findAllItems.length === 0);

  await director.close();
  await t.throwsAsync(async () => {
    await request(httpUrl, queries.findAllItems);
  });

  await controller.close();
});

test("test stop() method", async t => {
  const [controller, director] = await newTestx(ITEM_MODEL);

  await director.start();
  const httpUrl = await director.httpUrl();
  const queries = await director.getQueries();
  const mutations = await director.getMutations();

  await request(httpUrl, mutations.createItem, { title: "test" });

  await director.stop();
  await t.throwsAsync(async () => {
    await request(httpUrl, queries.findAllItems);
  });

  await director.start();
  const result = await request(httpUrl, queries.findAllItems);
  t.assert(result.findAllItems.length === 1);

  await controller.close();
});

test("test cleanDatabase() method", async t => {
  const [controller, director] = await newTestx(ITEM_MODEL);

  await director.start();
  const httpUrl = await director.httpUrl();
  const queries = await director.getQueries();
  const mutations = await director.getMutations();

  await request(httpUrl, mutations.createItem, { title: "test" });
  let result = await request(httpUrl, queries.findAllItems);
  t.assert(result.findAllItems.length === 1);

  await director.cleanDatabase();

  result = await request(httpUrl, queries.findAllItems);
  t.assert(result.findAllItems.length === 0);

  await controller.close();
});

test("test setData() method", async t => {
  const [controller, director] = await newTestx(ITEM_MODEL);

  await director.start();
  const httpUrl = await director.httpUrl();
  const queries = await director.getQueries();

  await director.setData({
    item: [
      { id: "0", title: "foo" },
      { id: "1", title: "bar" }
    ]
  });

  const result = await request(httpUrl, queries.findAllItems);
  t.assert(result.findAllItems.length === 2);

  await controller.close();
});

test("test getGraphQLSchema() method", async t => {
  const [controller, director] = await newTestx(ITEM_MODEL);

  await director.bootstrap();

  const schema = await director.getGraphQlSchema();
  t.assert(typeof schema === "string");
  t.assert(schema.length > 100);

  await controller.close();
});

test("test getDatabaseSchema() method", async t => {
  const [controller, director] = await newTestx(ITEM_MODEL);

  await director.start();
  const dbSchema = await director.getDatabaseSchema();
  t.assert(dbSchema["item"]);
  t.assert(dbSchema["item"].length === 4);

  await controller.close();
});
