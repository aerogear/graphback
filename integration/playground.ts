// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { TestxServer } from 'graphql-testx';
import { migrateDB } from '../packages/graphql-migrations';
import { schema } from './schemas/relations-schema.graphql';

(async () => {
 
  const server = new TestxServer({
    schema
  });

  await server.start();

  const migration = await migrateDB({

    client: "sqlite3",
    connection: { filename: "./test.sql" }
  }, schema);

  console.log(JSON.stringify(migration, undefined, 2));
  // start the server

  console.log(await server.getDatabaseSchema());
  // retrieve the server url
  console.log(`Running on ${await server.httpUrl()}`);

  // TODO test actual runtime execution logic by executing queries and mutations

})().catch(e => console.error(e))

