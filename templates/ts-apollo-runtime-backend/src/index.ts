// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import http from "http"
import { createRuntime } from './runtime'
import { printSchema } from 'graphql'

const app = express()

app.use(cors())

// connect to db
const { schema, resolvers } = createRuntime();

const apolloConfig = {
  typeDefs: printSchema(schema),
  resolvers,
  playground: true,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
}

const apolloServer = new ApolloServer(apolloConfig)

apolloServer.applyMiddleware({ app })

const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000/graphql`)
})
