import cors from "cors"
import express from "express"
import http from "http"

import { ApolloServer, makeExecutableSchema } from "apollo-server-express"

import config from "./config/config"
import { connect } from "./db"
import { resolvers, typeDefs } from "./mapping"
import { pubsub } from './subscriptions'

async function start() {
  const app = express()

  app.use(cors())

  app.get("/health", (req, res) => res.sendStatus(200))

  // connect to db
  const client = await connect(config.db);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  const apolloConfig = {
    schema,
    context: async ({
      req
    }: {req: express.Request}) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: client,
        pubsub
      }
    }
  }

  const apolloServer = new ApolloServer(apolloConfig)

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: config.port }, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}/graphql`)
  })
}

start()
