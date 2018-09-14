import { readFileSync } from 'fs';
import * as knex from 'knex'
import { join } from 'path'
import { PostgresSchemaManager } from '../src/DataResourcesManager';
import { GraphQLBackendCreator, IGraphQLBackend } from "../src/GraphQLBackend";

const schemaText = readFileSync(join(__dirname, './Note.graphql'), 'utf8');
const backend = new GraphQLBackendCreator(schemaText, { generateGraphQLSchema: true, createDatabaseSchema: false })

// UI part
const db = knex({
  client: 'pg',
  connection: {
    'user': 'postgresql',
    'password': 'postgres',
    'database': 'memeolist_db',
    'host': '127.0.0.1',
    'port': '15432'
  }
})

backend.registerDataResourcesManager(new PostgresSchemaManager(db, 'test_'));

backend.createBackend().then((genenerated: IGraphQLBackend) => {
  console.error("Query")
  console.error(genenerated.schema)
  console.error("Resolvers")
  console.error(JSON.stringify(genenerated.resolvers, undefined, 4))
  db.schema.hasTable('test_note').then((exists: boolean) => {
    if (!exists) {
      console.error("Schema created")
    }
  });
});


