import express from 'express'
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
import knex from 'knex'

export interface GraphQLContext {
  pubsub: RedisPubSub | PubSub
  req: express.Request
  db: knex<any, unknown[]>
}
