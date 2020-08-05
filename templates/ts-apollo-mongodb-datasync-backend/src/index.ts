// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()
import path from 'path'
import http from "http"
import { ApolloServer } from "apollo-server-express"
import { buildGraphbackAPI } from 'graphback'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { createDataSyncAPI, ServerSideConflictResolution } from '@graphback/datasync'
// eslint-disable-next-line @typescript-eslint/tslint/config
import cors from "cors"
// eslint-disable-next-line @typescript-eslint/tslint/config
import express from "express"
import { PubSub } from "graphql-subscriptions";
import { connectDB } from './db'

async function start() {
  const app = express()

  app.use(cors())

  const modelDefs = loadSchemaSync(path.resolve('./model/*.graphql'), {
    loaders: [
      new GraphQLFileLoader()
    ]
  })

  const db = await connectDB()

  const { typeDefs, resolvers, contextCreator } = createDataSyncAPI(modelDefs, db, { Comment: { enabled: true, conflictResolution: ServerSideConflictResolution }});

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextCreator
  })

  apolloServer.applyMiddleware({ app })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀  Server ready at http://localhost:4000/graphql`)
  })
}

start().catch((err: any) => console.log(err))
