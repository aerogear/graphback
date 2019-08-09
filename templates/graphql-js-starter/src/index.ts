import cors from "cors"
import express from "express"
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import http from "http"

import config from "./config/config"
import { connect } from "./db"
import { root, typeDefs } from "./mapping"
import { pubsub } from './subscriptions'

const schema = buildSchema(typeDefs)

async function start() {
  const app = express()

  app.use(cors())

  app.get("/health", (req, res) => res.sendStatus(200))

  // connect to db
  const client = await connect(config.db);

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: async ({
      req
    }: {req: Express.Request}) => {
      return {
        req,
        db: client,
        pubsub
      }
    }
  }))

  app.listen(config.port, () => console.log(`Server ready at http://localhost:${config.port}/graphql`))
}

start()
