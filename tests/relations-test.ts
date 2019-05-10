import ava, { ExecutionContext } from 'ava';
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
  'database': 'users',
  'host': '127.0.0.1',
  'port': '5432'
}

const manager = new PostgresSchemaManager(connectionConfig);

ava.before(() => {
  backend.registerDataResourcesManager(manager);
  const resolverManager = new KnexResolverManager();
  backend.registerResolverManager(resolverManager);
})

ava('Test if we can query data from relation', async (t: ExecutionContext) => {
  const generated = await backend.createBackend();
  await manager.getConnection().table('note').insert({ title: 'first note', description: 'this is a new note' })
  await manager.getConnection().table('comment').insert({ title: 'comment', description: 'new comment', noteId: 1 })
  const query = await manager.getConnection().table('comment').innerJoin('note', 'comment.noteId', '=', 'note.id')
  t.assert(!!query)
});
