import { withFilter, ResolverFn } from 'graphql-subscriptions'

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
