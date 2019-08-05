import { readFileSync } from 'fs';
import { join } from 'path'
import { createInputContext, DatabaseSchemaManager, enableDebug, GraphQLBackendCreator  } from '../src/index';

const defautConfig = {
  "create": true,
  "update": true,
  "findAll": true,
  "find": true,
  "delete": false,
  "subCreate": false,
  "subUpdate": false,
  "subDelete": false
}

// Enable debug logger
enableDebug();
async function main() {
  const schemaText = readFileSync(join(__dirname, './Note.graphql'), 'utf8');
  const backend = new GraphQLBackendCreator(schemaText, defautConfig)
  
  const connectionConfig = {
    filename: "./db.sqlite"
  }
  
  const manager = new DatabaseSchemaManager('sqlite3', connectionConfig);
  backend.registerDataResourcesManager(manager);
  
  // const generated = await backend.createBackend()
  // tslint:disable-next-line: no-console
  // console.log(generated.schema)
  // tslint:disable-next-line: no-console
  // console.log(generated.resolvers)

  await backend.createDatabase()
}

// tslint:disable-next-line: no-floating-promises
main()
