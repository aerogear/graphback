import { parse, visit } from 'graphql';
import { GraphQLGeneratorConfig } from "../GraphQLGeneratorConfig";
import { filterInterfaceTypes, filterObjectExtensions, filterObjectTypes } from '../utils/graphqlUtils';
import { ModelTypeContext } from './ContextTypes'
import { applyGeneratorDirectives } from './directives';
import { inputTypeVisitor } from './InputTypeVisitor';

/**
 * create input context to be reused for
 * schema, resolvers generation
 * and database creation
 */
export const createInputContext = (schemaText: string, defaultConfig: GraphQLGeneratorConfig): ModelTypeContext[] => {
  const schema = applyGeneratorDirectives(schemaText)
  try {
    const astNode = parse(schema)

    const schemaDef = visit(astNode, { leave: inputTypeVisitor });

    let context =  schemaDef.definitions.map((t: ModelTypeContext) => {
      return {
        ...t,
        config: { ...defaultConfig, ...t.config }
      }
    })



    const extendNodes = filterObjectExtensions(context)

    const interfaces = filterInterfaceTypes(context)

    context = filterObjectTypes(context)

    return [...context.map((t: ModelTypeContext) => {
      const extendNode = extendNodes.find((node: ModelTypeContext) => node.name === t.name)

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
