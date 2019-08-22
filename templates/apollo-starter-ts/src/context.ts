import express from 'express'
import knex from 'knex'

export interface GraphQLContext {
  pubsub: any
  req: express.Request
  db: knex<any, unknown[]>
}
