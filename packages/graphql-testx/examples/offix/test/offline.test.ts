import "cross-fetch/polyfill";
import "fake-indexeddb/auto";

import gql from "graphql-tag";
import {
  ApolloOfflineClient,
  createClient,
  NetworkStatus,
  NetworkStatusChangeCallback
} from "offix-client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { TestxServer } from "../../../dist/src";

class ToggleableNetworkStatus implements NetworkStatus {
  private online = true;
  private readonly callbacks: NetworkStatusChangeCallback[] = [];

  public onStatusChangeListener(callback: NetworkStatusChangeCallback): void {
    this.callbacks.push(callback);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async isOffline(): Promise<boolean> {
    return !this.online;
  }

  public setOnline(online: boolean): void {
    this.online = online;
    for (const callback of this.callbacks) {
      callback.onStatusChange({ online });
    }
  }
}

async function newClient(
  url: string
): Promise<[ApolloOfflineClient, ToggleableNetworkStatus]> {
  const network = new ToggleableNetworkStatus();

  const client = await createClient({ networkStatus: network, httpUrl: url });

  return [client, network];
}

let server: TestxServer;

beforeAll(async () => {
  const schema = readFileSync(
    resolve(__dirname, "../fixtures/schema.graphql"),
    "utf8"
  );
  server = new TestxServer({ schema });

  await server.start();
  console.log(`Running on ${await server.httpUrl()}`);
}, 10 * 1000);

afterAll(() => {
  server.close();
});

it("update an object while offline and assert that the object get updated on the server when returning online", async () => {
  expect.assertions(10);

  // setup client and network status in each tests
  const [client, network] = await newClient(await server.httpUrl());
  const queries = await server.getQueries();
  const mutations = await server.getMutations();

  network.setOnline(true);

  // create the task while online
  const createTaskResult = await client.offlineMutation({
    mutation: gql(mutations.createTask),
    variables: {
      version: 1,
      title: "bo",
      description: "some random words",
      author: "myself"
    }
  });
  const newTask = createTaskResult.data.createTask;

  expect(newTask.id).toBeDefined();
  expect(newTask.title).toEqual("bo");
  expect(newTask.description).toEqual("some random words");

  // go offline
  network.setOnline(false);

  // update the task while offline
  try {
    await client.offlineMutation({
      mutation: gql(mutations.updateTask),
      variables: {
        ...newTask,
        title: "something new",
        description: "updated desc"
      }
    });
  } catch (e) {
    expect(e.networkError).toBeDefined();
    expect(e.networkError.offline).toBeTruthy();
  }

  // go back online
  network.setOnline(true);

  // give it some times to process the offline mutation
  await new Promise(r => setTimeout(r, 300));

  // query all tasks ignoring the cache
  const findAllTasksResult = await client.query({
    query: gql(queries.findAllTasks),
    fetchPolicy: "network-only"
  });

  const tasks = findAllTasksResult.data.findAllTasks;
  expect(tasks).toHaveLength(1);

  const updatedTask = tasks[0];
  expect(updatedTask.id).toEqual(newTask.id);
  expect(updatedTask.title).toEqual("something new");
  expect(updatedTask.description).toEqual("updated desc");
  expect(updatedTask.author).toEqual("myself");
});
