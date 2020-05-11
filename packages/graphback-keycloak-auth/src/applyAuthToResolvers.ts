import { createResolverAuthConfig } from './createResolverAuthConfig'
import { authResolverWrapper } from './authResolverWrapper'
import { ModelAuthConfigs } from '.'

/**
 * 
 * @param resolversMap Resolver functions for your application
 * @param authInfo the auth config for the resolvers
 * 
 * Wraps the resolvers with a wrapper function that can perform auth checks
 * based on some config passed in
 */
export function applyAuthToResolvers(resolversMap: any, models: ModelAuthConfigs) {
  // parse the model config into auth configs per resolver
  const resolversAuthConfig = createResolverAuthConfig(models)
  console.log(resolversAuthConfig)
  for (const operationType of Object.keys(resolversAuthConfig)) {
    for (const operationName of Object.keys(resolversAuthConfig[operationType])) {
      const authConfig = resolversAuthConfig[operationType][operationName]
      if (operationType === 'Query' || operationName === 'Mutation') {
        if (resolversMap[operationType] && resolversMap[operationType][operationName]) {
          console.log(`wrapping resolver ${operationName} with auth`, authConfig)
          resolversMap[operationType][operationName] = authResolverWrapper(authConfig, resolversMap[operationType][operationName])
        }
      } else if (operationType === 'Subscription') {
        // todo wrap subscription resolvers?
      } else {
        // todo wrap/create resolvers for a field
      }
    }
  }

  return resolversMap
}