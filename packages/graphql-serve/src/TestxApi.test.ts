import test from "ava";
import { isTestxApiMethod } from "./TestxApi";
import { TestxServer } from "./TestxServer";

test("is TestxApi method", t => {
  const testx = new TestxServer({ schema: "type Foo { id: Int! }" });
  t.true(isTestxApiMethod(testx, "setData"));
  t.true(isTestxApiMethod(testx, "start"));
  t.false(isTestxApiMethod(testx, "foo"));
});
