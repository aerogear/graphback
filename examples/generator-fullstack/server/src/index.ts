import cors from 'cors';
import express from 'express';
import http from 'http';

import { ApolloServer } from "apollo-server-express"
import { loadConfig } from 'graphql-config';
import { makeExecutableSchema } from 'graphql-tools';

import { createKnexRuntimeContext } from '@graphback/runtime'
import { PubSub } from 'graphql-subscriptions';
import { connect } from './db'
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

async function start() {
  const app = express();

  app.use(cors());

  app.get('/health', (req, res) => res.sendStatus(200));

  const config = await loadConfig({
    extensions: [() => ({ name: 'generate' })]
  });

  const generateConfig = await config!.getDefault().extension('generate');

  // connect to db
  const db = await connect(generateConfig.db.dbConfig);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  const pubSub = new PubSub();
  const context = createKnexRuntimeContext(db, pubSub, schema);
  const apolloConfig = {
    schema,
    context
  }

  const apolloServer = new ApolloServer(apolloConfig)

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: 4000 }, () => {
    // tslint:disable-next-line: no-console
    console.log(`🚀  Server ready at http://localhost:4000/graphql`)
  })
}

start().catch((err) => console.error(err));
