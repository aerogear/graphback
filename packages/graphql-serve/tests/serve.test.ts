import { serveHandler } from '../src/components'
beforeEach(() => {
  process.chdir(__dirname)
})

test('printSchema from GraphQL file', async () => {
  const modelFile = './files/user-model.graphql'

  const server = await serveHandler({ model: modelFile, port: 8080 })

  expect(server.getHttpPort()).toBe(8080)
})

// test('printSchema from directory', async () => {
//   const modelFile = './files'

//   const schemaSDL = await printSchemaHandler({ model: modelFile })

//   expect(schemaSDL).toBeDefined()
//   expect(schemaSDL).toMatchSnapshot()
// })
