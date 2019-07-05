import { DirectiveDefinitionNode, FieldDefinitionNode, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode, ObjectTypeDefinitionNode } from 'graphql';

const scalars = ['ID', 'Int', 'Float', 'String', 'Boolean']

export const inputTypeVisitor = {
  
  Name: (node: NameNode): string => {
    return node.value
  },
  
  ListType: (node: ListTypeNode): object => {
    return {
      ...node.type,
      "isArray": true,
    };
  },
  
  NamedType: (node: NamedTypeNode): object => {
    return {
      "type": node.name,
      "isArray": false,
      "isNull": true,
      "isType": !scalars.includes(node.name.toString())
    }
  },
  
  NonNullType: (node: NonNullTypeNode): object => {
    return {
      ...node.type,
      "isNull": false
    }
  },
  
  FieldDefinition: (node: FieldDefinitionNode) => {
    return {
      ...node.type,
      "name": node.name,
      "directives": node.directives,
      "hasDirectives": node.directives.length > 0
    }
  },

  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    return {
      "name": node.name,
      "fields": node.fields
    }
  },

  DirectiveDefinition: (node: DirectiveDefinitionNode) => {
    // tslint:disable-next-line: no-null-keyword
    return null
  },
}