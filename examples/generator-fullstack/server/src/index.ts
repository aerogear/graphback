import cors from 'cors';
import express from 'express';
import http from 'http';

import { ApolloServer, PubSub } from "apollo-server-express"
import { loadConfig } from 'graphql-config';
import { join } from 'path';
import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import resolvers from './resolvers/resolvers'
import knex from 'knex'
import { createCRUDResolversRuntimeContext } from './resolvers/crudContext';
import { buildSchema } from 'graphql';

async function start() {
  const app = express();

  app.use(cors());

  app.get('/health', (req, res) => res.sendStatus(200));

  const config = await loadConfig({
    extensions: [() => ({ name: 'graphback' })]
  });

  const generateConfig = await config!.getDefault().extension('graphback');

  // connect to db
  // TODO Embed knex as part of the runtime codegeneration
  const db = knex({
    client: generateConfig.dbmigrations.database,
    connection: generateConfig.dbmigrations.dbConfig,
  })

  const pubSub = new PubSub();

  // TODO - yes
  const schema = buildSchema(loadSchemaFiles(join(__dirname, '/schema/')).join('\n'));
  const context = createCRUDResolversRuntimeContext(schema, db as any, pubSub);
  const apolloServer = new ApolloServer({
    typeDefs: loadSchemaFiles(join(__dirname, '/schema/')),
    resolvers,
    context,
    playground: true,
  } as any)

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  const port = process.env.PORT || 4000;

  httpServer.listen({ port }, () => {
    console.log(`🚀  Server ready at http://localhost:${port}/graphql`)
  })
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
