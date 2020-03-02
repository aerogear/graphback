#!/usr/bin/env node

import { readFileSync } from "fs";
import process from "process";

import { TestxServer } from "../src";

(async (): Promise<void> => {
  const schemaFile = process.argv[2];
  const schema = readFileSync(schemaFile, "utf8");

  const server = new TestxServer({ schema });
  await server.bootstrap();

  // tslint:disable-next-line:no-console
  console.log("GraphQL Schema\n", server.getGraphQlSchema());

  // tslint:disable-next-line:no-console
  console.log("DB Schema\n", await server.getDatabaseSchema());

  server.close();
})();
