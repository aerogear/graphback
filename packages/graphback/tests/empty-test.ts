import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { createInputContext, Type } from '../src';
import { maybeNullFieldArgs } from '../src/schema/targetSchemaContext';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

const defautConfig = {
  "create": true,
  "update": true,
  "findAll": true,
  "find": true,
  "delete": false,
  "subCreate": false,
  "subUpdate": false,
  "subDelete": true,
  "disableGen": false
}

let inputContext: Type[]

ava.before((t: ExecutionContext) => {
  inputContext = createInputContext(schemaText, defautConfig)
})

ava('Test for schema string output from custom input', async (t: ExecutionContext) => {
  const output = `likeNote(id: ID!): Note!`
  const mutationField = inputContext.filter((t: Type) => t.name === 'Mutation')[0].fields[0]
  t.is(maybeNullFieldArgs(mutationField), output)
});

