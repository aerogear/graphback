import cors from "cors"
import express from "express"
import http from "http"

import { ApolloServer } from "apollo-server-express"

import config from "./config/config"
import { AppModule } from './modules/app';

async function start() {
  const app = express()

  app.use(cors())

  app.get("/health", (req, res) => res.sendStatus(200))

  const { schema } = AppModule;

  const apolloServer = new ApolloServer({ schema });

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: config.port }, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}/graphql`)
  })
}

start()
