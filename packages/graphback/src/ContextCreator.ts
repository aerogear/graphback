import { parse, visit } from 'graphql';
import { Config, Type } from './ContextTypes'
import { applyGeneratorDirectives } from './directives';
import { inputTypeVisitor } from './InputTypeVisitor';

/**
 * create input context to be reused for 
 * schema, resolvers generation 
 * and database creation
 */

export const createInputContext = (schemaText: string, defaultConfig: Config): Type[] => {
  const schema = applyGeneratorDirectives(schemaText)
  try {
    const astNode = parse(schema)

    return visit(astNode, { leave: inputTypeVisitor }).definitions.map((t: Type) => {
      return {
        ...t,
        config: {...defaultConfig, ...t.config}
      }
    })
  } catch(err) {
    throw err
  }
}