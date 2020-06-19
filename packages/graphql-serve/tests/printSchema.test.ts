import { join } from "path"
import { printSchemaHandler } from '../src/components/printSchemaHandler'

test('printSchema from GraphQL file', async () => {

  const modelFile = join(__dirname, './files/user-model.graphql')

  const schemaSDL = await printSchemaHandler({ model: modelFile })

  expect(schemaSDL).toBeDefined()
  expect(schemaSDL).toMatchSnapshot()
})

test('printSchema from remote URL', () => {

  const schemaSDL = printSchemaHandler({ model: 'https://raw.githubusercontent.com/aerogear/graphback/master/templates/ts-apollo-postgres-backend/model/datamodel.graphql' })
  expect(schemaSDL).toBeDefined()
  expect(schemaSDL).toMatchSnapshot()
})
