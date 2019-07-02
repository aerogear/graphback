import { codegen } from '@graphql-codegen/core'
import { readFileSync } from "fs";
import { buildSchema, parse, printSchema } from 'graphql';
import { plugin } from './plugin'

const schemaText = readFileSync(`${__dirname}/schema.graphql`, 'utf8')
const schema = buildSchema(schemaText)
const parsedSchema = parse(printSchema(schema))

const config = {
  filename: '',
  schema: parsedSchema,
  plugins: [
    {schema: {}}
  ],
  config: {},
  documents: [],
  pluginMap: {
    schema: {
      plugin: plugin
    }
  }
}

export const generate = async() => {
  // tslint:disable-next-line: no-unnecessary-local-variable
  const output = await codegen(config)

  return output
}