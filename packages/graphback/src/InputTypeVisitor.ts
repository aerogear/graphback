import { ArgumentNode, BooleanValueNode, DirectiveDefinitionNode, DirectiveNode, FieldDefinitionNode, ListTypeNode, NamedTypeNode, NameNode, NonNullTypeNode, ObjectTypeDefinitionNode, StringValueNode } from 'graphql';

const scalars = ['ID', 'Int', 'Float', 'String', 'Boolean']

const defaultConfig = {
  paginate: false,
  create: true,
  update: true,
  delete: true,
  find: true,
  findAll: true
}

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
      "directives": Object.assign({}, ...node.directives),
      "hasDirectives": node.directives.length > 0
    }
  },

  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    return {
      "name": node.name,
      "fields": node.fields,
      "config": {...defaultConfig, ...Object.assign({}, ...node.directives).Model}
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
    if(node.value.toString() === "true") {
      value = true
    } else if(node.value.toString() === "false") {
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
  }
}