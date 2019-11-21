import { parse, visit } from 'graphql';
import { InputModelTypeContext } from '../api/ContextTypes'
import { GraphbackCRUDGeneratorConfig } from "../api/GraphbackCRUDGeneratorConfig";
import { applyGeneratorDirectives } from './directives'
import { filterInterfaceTypes, filterObjectExtensions, filterObjectTypes } from './graphqlUtils';

import { InputContextCreator } from '../api';
import { inputTypeVisitor } from './InputTypeVisitor';



/**
 * Create input context to be reused for:
 * - schema
 * - various generators
 * - database creation
 */
export const graphQLInputContext: InputContextCreator = {

  createModelContext(schemaText: string, defaultConfig: GraphbackCRUDGeneratorConfig): InputModelTypeContext[] {
    const schema = applyGeneratorDirectives(schemaText)

    const astNode = parse(schema)
    const schemaDef = visit(astNode, { leave: inputTypeVisitor });
    const context = applyDefaultConfig(schemaDef, defaultConfig)
    const interfaces = filterInterfaceTypes(context)
    const finalTypes = applyExtensionsToOriginalTypes(context)

    return [...finalTypes, ...interfaces]

  }
}

// tslint:disable-next-line: no-any
function applyExtensionsToOriginalTypes(context: any) {
  const extendNodes = filterObjectExtensions(context)
  const filteredContext = filterObjectTypes(context)

  return filteredContext.map((t: InputModelTypeContext) => {
    const extendNode = extendNodes.find((node: InputModelTypeContext) => node.name === t.name);
    if (extendNode) {
      return {
        ...t,
        fields: [...t.fields, ...extendNode.fields],
        config: { ...t.config, ...extendNode.config },
        interfaces: [...t.interfaces, ...extendNode.interfaces]
      };
    }
    else {
      return t;
    }
  });
}

// tslint:disable-next-line: no-any
function applyDefaultConfig(schemaDef: any, defaultConfig: GraphbackCRUDGeneratorConfig) {
  return schemaDef.definitions.map((t: InputModelTypeContext) => {
    return {
      ...t,
      config: { ...defaultConfig, ...t.config }
    };
  });
}

