import http from 'http';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'
import { createApolloServer } from './graphql';

dotenv.config()

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
