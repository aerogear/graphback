import { SchemaGenerator } from 'graphback-schema'
import { GraphbackContextCreator, InputContext } from './ContextCreator';
import { applyGeneratorDirectives } from './directives';

/**
 * Graphback backend generator
 * Will create input context and pipe it to generate
 * schema and resolvers
 */
export class GraphQLBackend {
  private schema: string
  private inputContext: InputContext[]

  constructor(schemaText: string) {
    this.schema = applyGeneratorDirectives(schemaText)
    this.inputContext = new GraphbackContextCreator(this.schema).createInputContext()
  }

  public generateResources() {
    const backend: IGraphQLBackend = {}
    
    const schemaGen = new SchemaGenerator(this.inputContext)
    backend.schema = schemaGen.generate()

    return backend
  }
  
}

export interface IGraphQLBackend {
  // Human readable schema that should be replaced with current one
  schema?: string,
  // Resolvers that should be mounted to schema`
  resolvers?: string
}