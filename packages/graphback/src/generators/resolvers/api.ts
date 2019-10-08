
/**
 * Context used to generate resolvers. 
 * It categorizes resolvers to types and relations. 
 */
export interface TargetResolverContext {
    relations?: string[]
    queries?: string[]
    mutations?: string[]
    subscriptions?: string[],
    subscriptionTypes?: string
}

// TODO comments
export interface TypeContext {
    name: string
    context: TargetResolverContext
}

// TODO too generic name
export interface Custom {
    name: string
    implementation: string
    operationType?: string
}
export interface Relation {
    typeName: string
    implementation: string
}

export interface OutputResolver {
    name: string
    output: string
  }