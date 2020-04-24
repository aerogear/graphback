import { GraphQLSchema } from 'graphql';
import { filterNonModelTypes } from '@graphback/core'
import { SchemaComposer } from 'graphql-compose'

export interface SchemaTransformerPlugin {
  transform(schema: GraphQLSchema): GraphQLSchema
}

export const removeNonModelTypesFromSchema: SchemaTransformerPlugin = {
  transform(schema: GraphQLSchema): GraphQLSchema {
    const nonModelTypes = filterNonModelTypes(schema)

    if (!nonModelTypes.length) {
      return schema
    }

    const schemaComposer = new SchemaComposer(schema)
    for (const userType of nonModelTypes) {
      schemaComposer.delete('StringInput')
    }

    const x = schemaComposer.toSDL()
    console.log(x)

    return schemaComposer.buildSchema()
  }
}
