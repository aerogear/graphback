import express = require('express')
import cors = require('cors')

import { ApolloServer } from 'apollo-server-express'
import { altairExpress } from 'altair-express-middleware'

import config from './config/config'
import { connect } from './db'
import { typeDefs, resolvers } from './mapping'

async function start() {
  const app = express()

  app.use(cors())

  app.get('/health', (req, res) => res.sendStatus(200))

  app.use('/graphql', altairExpress(config.altairConfig))

  // connect to db
  const client = await connect(config.db);

  const apolloConfig = {
    typeDefs,
    resolvers,
    playground: false,
    context: async (
      req
    ) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: client,
        serverName: "graphback"
      }
    }
  }

  const apolloServer = new ApolloServer(apolloConfig)

  apolloServer.applyMiddleware({ app })

  const server = app.listen(config.port, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}/graphql`)
  })
}

start()
