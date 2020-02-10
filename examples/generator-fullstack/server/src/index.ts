import cors from 'cors';
import express from 'express';
import http from 'http';

import { ApolloServer, PubSub } from "apollo-server-express"
import { loadConfig } from 'graphql-config';
import { join } from 'path';

import { createKnexRuntimeContext } from '@graphback/runtime'
import { loadResolversFiles, loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { buildSchema } from 'graphql';
import knex from 'knex'

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

  const typeDefs = loadSchemaFiles(join(__dirname, '/schema/'));
  const schema = buildSchema(typeDefs.join('\n'));

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: loadResolversFiles(join(__dirname, '/resolvers/')),
    context: createKnexRuntimeContext(db as any, pubSub, schema),
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
