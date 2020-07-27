import { withFilter, ResolverFn } from 'graphql-subscriptions'

/**
 *
 * @param {ResolverFn} asyncIterator - PubSub asyncIterator
 * @param {any} filter - Simple filter object to filter subscriptions
 * @param {string} subscriptionName - The name of the subscription
 */
export function withSubscriptionFilter(asyncIterator: ResolverFn, filter: any, subscriptionName: string): ResolverFn {
  if (!filter) {
    return asyncIterator
  }

  return withFilter(asyncIterator, (payload: any) => {
    const subscriptionPayload = payload[subscriptionName]

    for (const key of Object.keys(filter)) {
      if (!subscriptionPayload[key] || subscriptionPayload[key].toString() !== filter[key].toString()) {
        return false
      }
    }

    return true
  })
}
