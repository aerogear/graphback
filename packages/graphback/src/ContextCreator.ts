import { parse, visit } from 'graphql';
import { Config, INTERFACE_TYPE_DEFINITION, InterfaceType, OBJECT_TYPE_DEFINITION, OBJECT_TYPE_EXTENSION, Type } from './ContextTypes'
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

    let context =  schemaDef.definitions.map((t: Type) => {
      return {
        ...t,
        config: { ...defaultConfig, ...t.config }
      }
    })



    const extendNodes = context.filter((t: Type) => t.kind === OBJECT_TYPE_EXTENSION)

    const interfaces = context.filter((t: Type) => t.kind === INTERFACE_TYPE_DEFINITION)

    context = context.filter((t: Type) => t.kind !== OBJECT_TYPE_EXTENSION && t.kind !== INTERFACE_TYPE_DEFINITION)

    return [...context.map((t: Type) => {
      const extendNode = extendNodes.find((node: Type) => node.name === t.name)

      if(extendNode) {
        return {
          ...t,
          fields: [...t.fields, ...extendNode.fields],
          config: {...t.config, ...extendNode.config},
          interfaces: [...t.interfaces, ...extendNode.interfaces]
        }
      } else {
        return t
      }
    }), ...interfaces]
  } catch (err) {
    throw err
  }
}
