import { expect } from "chai";
import gql from "graphql-tag";
import fetch from "node-fetch";
import { readFileSync } from "fs";
import { resolve } from "path";
import { TestxServer } from "../../../dist/src";
import { execute, makePromise, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import WebSocket from "ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { StringDic } from "../../../dist/src/TestxApi";

describe("test subscriptions", () => {
  let server: TestxServer;
  let client: ApolloClient<unknown>;
  let mutations: StringDic;
  let subscriptions: StringDic;
  let wsLink: WebSocketLink;
  let clientSub: SubscriptionClient;

  before("start graphql server", async () => {
    const schema = readFileSync(
      resolve(__dirname, "../fixtures/mutations-schema.graphql"),
      "utf8"
    );
    server = new TestxServer({ schema });
    await server.start();
    console.log(`Running on ${await server.httpUrl()}`);

    mutations = await server.getMutations();
    subscriptions = await server.getSubscriptions();
  });

  after("close graphql server", () => {
    server.close();
    clientSub.close();
    console.log(`Connection with server closed`);
  });

  before("initialize apollo client", async () => {
    const httpUrl = await server.httpUrl();
    const wsUrl = await server.wsUrl();

    clientSub = new SubscriptionClient(wsUrl, { reconnect: true }, WebSocket);

    wsLink = new WebSocketLink(clientSub);
    const httpLink = createHttpLink({
      uri: httpUrl,
      fetch: fetch as any
    });

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );

    const cache = new InMemoryCache();
    client = new ApolloClient({
      link,
      cache
    });
  });

  it("test newItem subscription", async () => {
    const query = execute(wsLink, {
      query: gql(subscriptions.newItem),
      variables: {}
    });

    const subResult = makePromise(query);

    const item = (
      await client.mutate({
        mutation: gql(mutations.createItem),
        variables: { title: "TestA" }
      })
    ).data.createItem;

    expect(item.title).to.be.equal((await subResult).data.newItem.title);
  });

  it("should updatedItem subscription", async () => {
    const query = execute(wsLink, {
      query: gql(subscriptions.updatedItem),
      variables: {}
    });

    const subResult = makePromise(query);

    const itemV2 = (
      await client.mutate({
        mutation: gql(mutations.updateItem),
        variables: { id: 1, title: "TestB" }
      })
    ).data.updateItem;

    expect(itemV2.title).to.be.equal((await subResult).data.updatedItem.title);
  });
});
