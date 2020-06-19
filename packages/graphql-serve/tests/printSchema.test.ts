import { printSchemaHandler } from '../src/components/printSchemaHandler'

beforeEach(() => {
  process.chdir(__dirname)
})

test('printSchema from GraphQL file', async () => {
  const modelFile = './files/user-model.graphql'

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(schemaSDL).toMatchSnapshot()
})

test('printSchema from directory', async () => {
  const modelFile = './files'

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(schemaSDL).toMatchSnapshot()
})
