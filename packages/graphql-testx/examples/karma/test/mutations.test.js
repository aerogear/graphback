/* global __karma__ */
const { TestxDirector } = require("../../../director");
const { request } = require("graphql-request");
const { expect } = require("chai");

describe("test mutations", () => {
  let server;
  let serverUrl;
  let queries;
  let mutations;

  before("initialize the testx director", async () => {
    server = new TestxDirector(__karma__.config.args[0]);

    await server.start();
    serverUrl = await server.httpUrl();
    queries = await server.getQueries();
    mutations = await server.getMutations();
  });

  after("close graphql server", () => {
    server.close();
  });

  it("should create a new item", async () => {
    const result = await request(serverUrl, mutations.createItem, {
      title: "TestA"
    });
    const item = result.createItem;

    expect(item.id).to.not.be.null;
    expect(item.title).to.be.equal("TestA");
  });

  it("should update existing item", async () => {
    const findResult = await request(serverUrl, queries.findAllItems);
    const itemV1 = findResult.findAllItems.find(i => i.title === "TestA");
    expect(itemV1).to.be.exist;

    const updateResult = await request(serverUrl, mutations.updateItem, {
      id: itemV1.id,
      title: "TestB"
    });
    const itemV2 = updateResult.updateItem;

    expect(itemV2.id).to.be.equal(itemV1.id);
    expect(itemV2.title).to.be.equal("TestB");
  });
});
