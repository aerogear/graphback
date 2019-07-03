import { FieldDefinitionNode, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode, ObjectTypeDefinitionNode } from 'graphql';

export const visitor = {
  Name: (node: NameNode): string => {
    return node.value
  },

  ListType: (node: ListTypeNode): string => {

    return `${node.type}[]`;
  },

  NamedType: (node: NamedTypeNode): string => {
    return `${node.name}`
  },

  NonNullType: (node: NonNullTypeNode): string => {
    return `${node.type}!`
  },

  FieldDefinition: (node: FieldDefinitionNode) => {
    return `${node.name}: ${node.type}`
  },

  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    return {
      "name": node.name,
      "fields": node.fields
    }
  }
}