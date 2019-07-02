const node = `interface Node {
  id: ID!
}
`

const pagination = (types: string[]): string => {
  return `type PaginationInfo {
  totalPages: Int!
  totalItems: Int!
  page: Int!
  perPage: Int!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
}

${types.map((name: string) => `type ${name}Pagination {
  items: [${name}]!
  pageInfo: PaginationInfo!
}
`).join('\n')}
`
}


const find = (name: string): string => {
  const fieldName = getFieldName(name, Crud.FIND)
  
  return `${fieldName}(fields: ${name}Filter!): ${name}!`
}

const update = (name: string): string => {
  const fieldName = getFieldName(name, Crud.UPDATE)

  return `${fieldName}(id: ID!, input: ${name}Input!): ${name}!`
}

const create = (name: string): string => {
  const fieldName = getFieldName(name, Crud.CREATE)
  
  return `${fieldName}(input: ${name}Input!): ${name}!`
}

const del = (name: string): string => {
  const fieldName = getFieldName(name, Crud.DELETE)
  
  return `${fieldName}(id: ID!): ID!`
}

const findAll = (name: string): string => {
  const fieldName = getFieldName(name, Crud.FIND_ALL)
  
  return `${fieldName}: ${name}Pagination`
}

const query = (types: string[]): string => {
  return `type Query {
    ${types.map(find).join('\n  ')}
    ${types.map(findAll).join('\n  ')}
  }
  `
}

const mutations = (types: string[]): string => {
  return `type Mutation {
    ${types.map(create).join('\n  ')}
    ${types.map(update).join('\n  ')}
    ${types.map(del).join('\n  ')}
  }
  `
}

const newSub = (name: string) => `new${name}: ${name}!`
const updatedSub = (name: string) => `updated${name}: ${name}!`
const deletedSub = (name: string) => `deleted${name}: ID!`

const subscriptions = (types: string[]): string => {
  return `type Subscription {
  ${types.map(newSub).join('\n  ')}
  ${types.map(updatedSub).join('\n  ')}
  ${types.map(deletedSub).join('\n  ')}
}`
}

export const generateSchema = (definitions: string[]): string => [node, pagination(definitions), query(definitions), mutations(definitions), subscriptions(definitions)].join('\n')

enum Crud {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  FIND = "find",
  FIND_ALL = "findAll"
}

const getFieldName = (typeName: string, action: Crud, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}