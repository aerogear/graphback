//tslint:disable

import { parseMarker } from 'graphql-metadata'
import { buildSchema } from "graphql";
import { getBusinessTypesFromSchema } from './utils'

export const schemaText = `
""" @model """
type Note {
    id: ID!
    title: String!
  }
  
`

export const schema = buildSchema(schemaText);

const note = getBusinessTypesFromSchema(schema)[0];

console.log(parseMarker('models', note.description))