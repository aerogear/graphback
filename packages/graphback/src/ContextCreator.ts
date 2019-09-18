import { parse, visit } from 'graphql';
import { INTERFACE_TYPE_DEFINITION, InterfaceType, OBJECT_TYPE_DEFINITION, OBJECT_TYPE_EXTENSION, Type } from './ContextTypes'
import { applyGeneratorDirectives } from './directives';
import { GraphQLGeneratorConfig } from "./GraphQLGeneratorConfig";
import { inputTypeVisitor } from './InputTypeVisitor';
import { filterInterfaceTypes, filterObjectExtensions, filterObjectTypes } from './utils';

/**
 * create input context to be reused for
 * schema, resolvers generation
 * and database creation
 */
export const createInputContext = (schemaText: string, defaultConfig: GraphQLGeneratorConfig): Type[] => {
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



    const extendNodes = filterObjectExtensions(context)

    const interfaces = filterInterfaceTypes(context)

    context = filterObjectTypes(context)

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
