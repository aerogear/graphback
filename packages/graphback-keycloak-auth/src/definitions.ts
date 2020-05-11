export type AuthStrategy = 'owner' | 'role'

export type ModelOperation = 'create' | 'update' | 'delete' | 'read'

export interface ModelAuthRule {
  allow: AuthStrategy,
  operations?: ModelOperation[],
  roles?: string[],
  ownerField?: string
}

export interface ModelAuthConfig {
  name: string
  auth: {
    rules: ModelAuthRule[]
  }
}

export type ModelAuthConfigs = ModelAuthConfig[]

export interface ResolverAuthConfig {
  modelName: string,
  ownerAuth?: boolean,
  ownerField?: string
  roles: string[],
}

export interface ResolversAuthConfig {
  [key: string]: { [key:string]: ResolverAuthConfig }
  Query: { [key: string]: ResolverAuthConfig }
  Mutation: { [key: string]: ResolverAuthConfig }
}
