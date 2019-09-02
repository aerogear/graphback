import { parse, visit } from 'graphql';
import { Config, INTERFACE_TYPE_DEFINITION, InterfaceType, Type } from './ContextTypes'
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

    const schemaDef = visit(astNode, { leave: inputTypeVisitor });

    return schemaDef.definitions.map((t: Type) => {
      return {
        ...t,
        config: { ...defaultConfig, ...t.config }
      }
    })
  } catch (err) {
    throw err
  }
}
