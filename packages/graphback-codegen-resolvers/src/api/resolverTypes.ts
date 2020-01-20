/**
 * Context used to generate resolvers. 
 * It categorizes resolvers to types and relations. 
 */
export interface TargetResolverContext {
    relations?: string[]
    queries?: string[]
    mutations?: string[]
    subscriptions?: string[],
}

/**
 * Interface containing all required metadata that will be used to build resolvers.
 */
export interface ResolverTypeContext {
    name: string
    context: TargetResolverContext
}

export interface CustomResolverContext {
    name: string
    implementation: string
    operationType?: string
}

export interface ResolverRelationContext {
    typeName: string
    implementation: string
}

export interface OutputResolvers {
    name: string
    output: string
}

export interface GeneratedResolvers {
    types: OutputResolvers[],
    index: string,
    custom: OutputResolvers[],
}