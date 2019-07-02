import { ObjectTypeDefinitionNode } from 'graphql';

export const visitor = {
  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    return node.name.value
  },
}