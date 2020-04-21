// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import http from "http"
import { printSchema } from 'graphql'
import { createRuntime } from './runtime'

const app = express()

app.use(cors())

// connect to db
const { schema, resolvers } = createRuntime();

const apolloServer = new ApolloServer({
  typeDefs: printSchema(schema),
  resolvers
})

apolloServer.applyMiddleware({ app })

const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000/graphql`)
})
