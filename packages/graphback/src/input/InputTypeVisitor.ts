import { ArgumentNode, BooleanValueNode, DirectiveDefinitionNode, DirectiveNode, FieldDefinitionNode, InputValueDefinitionNode, InterfaceTypeDefinitionNode, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode, ObjectTypeDefinitionNode, StringValueNode } from 'graphql';

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
    if (node.arguments.length) {
      return {
        ...node.type,
        "name": node.name,
        "directives": Object.assign({}, ...node.directives),
        "hasDirectives": node.directives.length > 0,
        "arguments": node.arguments
      }
    } else {
      return {
        ...node.type,
        "name": node.name,
        "directives": Object.assign({}, ...node.directives),
        "hasDirectives": node.directives.length > 0,
      }
    }
  },

  InterfaceTypeDefinition: (node: InterfaceTypeDefinitionNode) => {
    let config = {};

    node.directives.forEach((directive: object) => {
      config = Object.assign(config, directive);
    })

    return {
      "kind": node.kind,
      "name": node.name,
      "fields": node.fields,
      "config": config
    }
  },


  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    let config = {}

    node.directives.forEach((directive: object) => {
      config = Object.assign(config, directive)
    });

    Object.keys(config).forEach((key: string) => {
      if (Object.keys(config[key]).length) {
        config[key] = config[key].enable
      } else {
        config[key] = true
      }
    })

    return {
      "kind": node.kind,
      "name": node.name,
      "fields": node.fields,
      "interfaces": node.interfaces,
      "config": config
    }
  },

  DirectiveDefinition: (node: DirectiveDefinitionNode) => {
    // tslint:disable-next-line: no-null-keyword
    return null
  },

  Directive: (node: DirectiveNode) => {
    return {
      [node.name.toString()]: Object.assign({}, ...node.arguments)
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
