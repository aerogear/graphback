import { readFileSync } from 'fs';
import { join } from 'path'
import { enableDebug, GraphQLBackendCreator, IGraphQLBackend, KnexResolverManager, PostgresSchemaManager } from '../src/index';

// Enable debug logger
enableDebug();

const schemaText = readFileSync(join(__dirname, './Test.graphql'), 'utf8');
const backend = new GraphQLBackendCreator(schemaText)

const connectionConfig = {
  'user': 'postgresql',
  'password': 'postgres',
  'database': 'memeolist_db',
  'host': '127.0.0.1',
  'port': '15432'
}

const manager = new PostgresSchemaManager(connectionConfig);
backend.registerDataResourcesManager(manager);

const resolverManager = new KnexResolverManager();
backend.registerResolverManager(resolverManager);

backend.createBackend().then(async(generated: IGraphQLBackend) => {
  console.error("Query")
  console.error(generated.schema)
  console.error("Resolvers")
  console.error(JSON.stringify(generated.resolvers, undefined, 4))

  //TEST FOR RELATION

  await manager.getConnection().table('note').insert({ title: 'first note', description: 'this is a new note' })
  await manager.getConnection().table('comment').insert({ title: 'comment', description: 'new comment', noteId: 1 })
  const query = await manager.getConnection().table('comment').innerJoin('note', 'comment.noteId', '=', 'note.id')
  if(query) {
    console.error('Relation exists. Test passed')
  }
});

