const express = require('express')
const cors = require('cors')

const { VoyagerServer } = require('@aerogear/voyager-server')
const { altairExpress } = require('altair-express-middleware')

const config = require('./config/config')
const connect = require('./db')
const {typeDefs, resolvers} = require('./mapping')

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
    context: async ({
      req
    }) => {
      // pass request + db ref into context for each resolver
      return {
        req: req,
        db: client
      }
    }
  }

  const voyagerConfig = {
  }

  const apolloServer = VoyagerServer(apolloConfig, voyagerConfig)

  apolloServer.applyMiddleware({ app })

  const server = app.listen(config.port, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}/graphql`)
  })
}

start()
