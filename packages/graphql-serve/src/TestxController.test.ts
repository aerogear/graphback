import test, { ExecutionContext } from "ava";
import { TestxServer } from "./TestxServer";
import { TestxController } from "./TestxController";
import axios from "axios";

function newTestxController(): TestxController {
  const server = new TestxServer({ schema: "type Foo { id: Int! }" });
  return new TestxController(server);
}

async function isNotConnectionRefused(
  t: ExecutionContext,
  url: string
): Promise<void> {
  try {
    await axios(url);
  } catch (e) {
    t.assert(e.code !== "ECONNREFUSED");
  }
}

test("start TestxController to a random port", async t => {
  t.plan(1);

  const controller = newTestxController();
  await controller.start();
  const url = await controller.httpUrl();

  await isNotConnectionRefused(t, url);

  await controller.close();
});

test("start TestxController to a specific port", async t => {
  t.plan(1);

  const controller = newTestxController();
  await controller.start(7896);
  await isNotConnectionRefused(t, "http://localhost:7896");

  await controller.close();
});

test("start TestxController multiple times", async t => {
  const controller = newTestxController();
  await controller.start();
  const urlV1 = await controller.httpUrl();

  await t.notThrowsAsync(
    async () => await controller.start(),
    "should not throw an error"
  );

  const urlV2 = await controller.httpUrl();
  t.assert(urlV1 === urlV2, "the url should not change");
});
