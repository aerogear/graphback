import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { SchemaGenerator } from '../dist/index'

ava('Test for schema generation', async (t: ExecutionContext) => {
  const mockSchema = readFileSync(`${__dirname}/mocks/schema.graphql`, 'utf8')
  const schemaGenerator = new SchemaGenerator(mockSchema)
  const output = await schemaGenerator.generate()

  t.assert(typeof output === 'string')
});