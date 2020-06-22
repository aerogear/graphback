import { printSchemaHandler } from '../src/components/printSchemaHandler'
import { buildSchema } from 'graphql'
import { expectedUserSchema } from './serve.test'

beforeEach(() => {
  process.chdir(__dirname)
})

test('printSchema from GraphQL file', async () => {
  const modelFile = './files/user-model.graphql'

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(schemaSDL).toMatchSnapshot()
  expect(buildSchema(schemaSDL).astNode).toEqual(buildSchema(expectedUserSchema).astNode)
})

test('printSchema from directory', async () => {
  const modelFile = './files'

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(buildSchema(schemaSDL).astNode).toEqual(buildSchema(expectedUserSchema).astNode)
})
