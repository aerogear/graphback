export interface Definition {
  name: string
  fields: string[]
}

export interface Context {
  types: string[]
  nodes: Definition[]
  inputFields: Definition[]
  filterFields: Definition[]
}

const scalars = ['ID', 'String', 'Boolean', 'Int', 'Float']

const validateFields = (fields: string[]): string[] => {  
  return fields.filter((s: string) => {
    const removedDefs = s.replace('[]','').replace('!','')
    const splitType = removedDefs.split(': ')[1]
    if(scalars.includes(splitType)) {
      return true
    }

    return false
  })
}

const inputFields = (fields: string[]): string[] => {
  return fields.filter((f: string) => !f.startsWith('id'))
}

export const buildContext = (definitions: Definition[]) => {
  const context: Context = {
    types: [],
    nodes: [],
    inputFields: [],
    filterFields: []
  }
  context.types = definitions.map((d: Definition) => d.name)
  context.nodes = definitions.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": validateFields(d.fields)
    }
  })
  context.inputFields = definitions.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": inputFields(validateFields(d.fields))
    }
  })
  context.filterFields = definitions.map((d: Definition) => {
    return {
      "name": d.name,
      "fields": validateFields(d.fields).map((s: string) => s.replace('!',''))
    }
  })

  return context
}