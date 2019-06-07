import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path'
import { enableDebug, GraphQLBackendCreator, IGraphQLBackend, KnexResolverManager, PostgresSchemaManager } from '../src/index';

// Enable debug logger
enableDebug();

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

const resolverManager = new KnexResolverManager();
backend.registerResolverManager(resolverManager);

backend.createBackend().then(async(generated: IGraphQLBackend) => {
  console.error("Query")
  console.error(generated.schema)
  console.error("Resolvers")
  console.error(generated.resolvers)
  await writeFileSync(`${process.cwd()}/Schema.graphql`, generated.schema)
  await writeFileSync(`${process.cwd()}/Resolvers.ts`, generated.resolvers)
});

