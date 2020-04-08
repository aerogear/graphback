// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()
import http from 'http';
import cors from 'cors';
import express from 'express';
import { createApolloServer } from './graphql';

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
