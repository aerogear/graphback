import { readFileSync } from 'fs';
import { join } from 'path'
import { enableDebug, GraphQLBackendCreator, IGraphQLBackend, PostgresSchemaManager } from '../src/index';

// Enable debug logger
enableDebug();
async function main() {
  const schemaText = readFileSync(join(__dirname, './Note.graphql'), 'utf8');
  const backend = new GraphQLBackendCreator(schemaText)
  
  const connectionConfig = {
    'user': 'postgresql',
    'password': 'postgres',
    'database': 'users',
    'host': '127.0.0.1',
    'port': '5432'
  }
  
  const manager = new PostgresSchemaManager(connectionConfig);
  backend.registerDataResourcesManager(manager);
  
  const generated = await backend.createBackend()
  // tslint:disable-next-line: no-console
  console.log(generated.schema)
  // tslint:disable-next-line: no-console
  console.log(generated.resolvers)

  await backend.createDatabase()
}

// tslint:disable-next-line: no-floating-promises
main()
