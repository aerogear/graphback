import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

export const pubsub = new RedisPubSub({
  publisher: new Redis(6789),
  subscriber: new Redis(6789)
})
