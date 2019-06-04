import { ResolverType } from './ResolverType'

export interface ResolverInstance {

  fieldName: string,

  resolverType: 'Mutation' | 'Query',
  
  schemaDefinition: string,
  
  implementation: string
}
