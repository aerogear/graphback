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

ava.before(async () => {
  backend.registerDataResourcesManager(manager);
  const resolverManager = new KnexResolverManager();
  backend.registerResolverManager(resolverManager);
  const generated = await backend.createBackend();
  await manager.getConnection().table('board').insert({name: 'board'})
  await manager.getConnection().table('note').insert({ title: 'first note', description: 'this is a new note', boardId: 1 })
  await manager.getConnection().table('comment').insert({ text: 'new comment', noteId: 1 })
  await manager.getConnection().table('user').insert({name: 'user'})
  await manager.getConnection().table('note_user').insert({userId: 1, noteId: 1})
})

ava('Test if we can query data from database', async (t: ExecutionContext) => {
  const query = await manager.getConnection().select().from('note')
  t.assert(!!query)
});

ava('Test for 1:1 relation', async (t: ExecutionContext) => {
  try {
    await manager.getConnection().table('note').insert({ title: 'first note', description: 'this is a new note', boardId: 1 })
  } catch (error) {
    t.assert(!!error) //throw error since in 1:1 the foreign key is unique
  }
})

ava('Test for 1:m relation', async (t: ExecutionContext) => {
  const insert = await manager.getConnection().table('comment').insert({ text: 'another comment', noteId: 1 })
  const query = await manager.getConnection().table('comment').innerJoin('note', 'comment.noteId', '=', 'note.id')
  t.assert(query.length > 1)
})

ava('Test for n:m relation', async (t: ExecutionContext) => {
  const query = await manager.getConnection().table('note_user').innerJoin('user', 'note_user.userId', '=', 'user.id')
  const secondQuery = await manager.getConnection().table('note_user').innerJoin('note', 'note_user.noteId', '=', 'note.id')
  t.assert(!!query && !!secondQuery)
})

ava.after(async () => {
  await manager.getConnection().schema.dropTable('note_user')
                                      .dropTable('user')
                                      .dropTable('comment')
                                      .dropTable('note')
                                      .dropTable('board')
})
