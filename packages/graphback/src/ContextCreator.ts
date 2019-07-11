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

export interface Config {
  paginate: boolean
  create: boolean
  update: boolean
  //tslint:disable-next-line
  delete: boolean
  find: boolean
  findAll: boolean
}

export interface InputContext {
  name: string
  fields: FieldContext[]
  config: Config
}

 
/**
 * create input context to be reused for 
 * schema, resolvers generation 
 * and database creation
 */
export const createInputContext =  (schemaText: string) => {
    const schema = applyGeneratorDirectives(schemaText)
    try {
      const astNode = parse(schema)

      return visit(astNode, { leave: inputTypeVisitor }).definitions
    } catch (error) {
      return;
    }
}