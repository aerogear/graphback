import { DocumentNode, parse, visit } from 'graphql';
import { applyGeneratorDirectives } from './directives';
import { inputTypeVisitor } from './InputTypeVisitor';

export interface FieldContext {
  name: string
  // tslint:disable-next-line
  type: string
  isArray: boolean
  isType: boolean
  isNull: boolean
  directives: object
  hasDirectives: boolean
}

export interface InputContext {
  name: string
  fields: FieldContext[]
  directives: object
  hasDirectives: boolean
}

/**
 * create input context to be reused for 
 * schema, resolvers generation 
 * and database creation
 */
export class GraphbackContextCreator {
  private schema: string
  private astNode: DocumentNode
  private inputContext: InputContext[]

  constructor(schemaText: string) {
    this.schema = applyGeneratorDirectives(schemaText)
    this.astNode = parse(this.schema)
  }

  public createInputContext() {
    this.inputContext = visit(this.astNode, { leave: inputTypeVisitor }).definitions
    
    return this.inputContext
  }
}