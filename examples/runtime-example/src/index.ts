import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import http from "http"
import { createRuntime } from './runtime'

async function start() {
  const app = express()

  app.use(cors())

  // connect to db
  const schema = await createRuntime();

  const apolloConfig = {
    schema
  }

  const apolloServer = new ApolloServer(apolloConfig)

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀  Server ready at http://localhost:4000/graphql`)
  })
}

start();
