import { parse, visit } from 'graphql';
import { Type } from './ContextTypes'
import { applyGeneratorDirectives } from './directives';
import { inputTypeVisitor } from './InputTypeVisitor';

/**
 * create input context to be reused for 
 * schema, resolvers generation 
 * and database creation
 */

export const createInputContext = (schemaText: string): Type[] => {
  const schema = applyGeneratorDirectives(schemaText)
  try {
    const astNode = parse(schema)
    
    return visit(astNode, { leave: inputTypeVisitor }).definitions
  } catch(err) {
    throw err
  }
}