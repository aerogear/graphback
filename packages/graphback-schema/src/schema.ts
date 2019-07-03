interface Definition {
  name: string
  fields: string[]
}

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

const scalars = ['ID', 'String', 'Boolean', 'Int', 'Float']

const validateFields = (types: string[], fields: string[]): string[] => {  
  return fields.filter((s: string) => {
    const removedDefs = s.replace('[]','').replace('!','')
    const splitType = removedDefs.split(': ')[1]
    if(types.includes(splitType)) {
      return false
    }
    if(scalars.includes(splitType)) {
      return true
    }

    return false
  })
}

const inputFields = (fields: string[]): string[] => {
  return fields.filter((f: string) => !f.startsWith('id'))
}

const inputs = (defs: Definition[]): string => {
  const types = defs.map((d: Definition) => d.name)
  const newDefs = defs.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": inputFields(validateFields(types, d.fields))
    }
  })

  return `${defs.map((d: Definition) => `input ${d.name}Input {
  ${inputFields(validateFields(types, d.fields)).join('\n  ')}
}`).join('\n\n')}
`
}

const nodeTypes = (defs: Definition[]): string => {
  const types = defs.map((d: Definition) => d.name)
  
  return `${defs.map((d: Definition) => `type ${d.name} implements Node {
  ${validateFields(types, d.fields).join('\n  ')}
}`).join('\n\n')}
`
}

const filters = (defs: Definition[]): string => {
  const types = defs.map((d: Definition) => d.name)

  return `${defs.map((d: Definition) => `type ${d.name}Filter {
  ${validateFields(types, d.fields).map((s:string) => s.replace('!','')).join('\n  ')}
}`).join('\n\n')}
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

export const generateSchema = (definitions: Definition[]): string => {
  const types = definitions.map((d: Definition) => d.name)

  return [node, inputs(definitions), nodeTypes(definitions), filters(definitions), pagination(types), query(types), mutations(types), subscriptions(types)].join('\n')
}