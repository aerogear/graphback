import { ArgumentNode, BooleanValueNode, DirectiveDefinitionNode, DirectiveNode, FieldDefinitionNode, InputValueDefinitionNode, InterfaceTypeDefinitionNode, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode, ObjectTypeDefinitionNode, StringValueNode } from 'graphql';
import { parseFieldAnnotations, parseTypeAnnotations } from './annotations';

const scalars = ['ID', 'Int', 'Float', 'String', 'Boolean']

/**
 * Default visitor that creates unified format based on GraphQL schema model
 * Visitor reduces complexity of the schema and exposes all available information from the model 
 * 
 * @see InputModelTypeContext for object that is returned as result of the vist operation
 */
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
    if (node.arguments.length) {
      return {
        ...node.type,
        "name": node.name,
        "annotations": parseFieldAnnotations(node),
        "directives": node.directives,
        "arguments": node.arguments
      }
    } else {
      return {
        ...node.type,
        "name": node.name,
        "annotations": parseFieldAnnotations(node),
        "directives": node.directives
      }
    }
  },

  InterfaceTypeDefinition: (node: InterfaceTypeDefinitionNode) => {
    const config = parseTypeAnnotations(node)

    return {
      "kind": node.kind,
      "name": node.name,
      "fields": node.fields,
      "config": config
    }
  },


  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    const config = parseTypeAnnotations(node)

    return {
      "kind": node.kind,
      "name": node.name,
      "fields": node.fields,
      "interfaces": node.interfaces,
      "config": config
    }
  },

  Argument: (node: ArgumentNode) => {
    let value
    if (node.value.toString() === "true") {
      value = true
    } else if (node.value.toString() === "false") {
      value = false
    } else {
      value = node.value
    }

    return {
      [node.name.toString()]: value
    }
  },

  BooleanValue: (node: BooleanValueNode) => {
    return `${node.value}`
  },

  StringValue: (node: StringValueNode): string => {
    return node.value
  },

  InputValueDefinition: (node: InputValueDefinitionNode) => {
    return {
      "name": node.name,
      "value": node.type
    }
  }
}
