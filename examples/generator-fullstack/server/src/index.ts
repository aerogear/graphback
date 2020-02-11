import cors from 'cors';
import express from 'express';
import http from 'http';

import { ApolloServer, PubSub } from "apollo-server-express"

async function start() {
  const app = express();

  app.use(cors());

  app.get('/health', (req, res) => res.sendStatus(200));

  
  const apolloServer = createApolloServer();

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
