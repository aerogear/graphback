import { buildSchema } from 'graphql';
import { GraphbackCoreMetadata, GraphbackCRUDGeneratorConfig, getModelByName, GraphbackPluginEngine } from '../src'

const setup = (model: string, config?: { crudMethods?: GraphbackCRUDGeneratorConfig }) => {
  const pluginEngine = new GraphbackPluginEngine({ schema: buildSchema(model) })
  const metadata = pluginEngine.createResources();

  return { metadata }
}

test('Model has default crud configuration', async () => {

  const { metadata } = setup(`

"""
@model
"""
type Comment {
  id: ID!
}

"""
@model
@delta
"""
type Note {
  id: ID!
  title: String!
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]
}`)


  const models = metadata.getModelDefinitions();

  const { crudOptions, fields, relationships, primaryKey } = getModelByName('Note', models)

  expect(crudOptions).toBeDefined()
  expect(relationships).toHaveLength(1)
  expect(fields).toEqual({
    id: {
      name: 'id',
      type: 'ID',
      transient: false
    },
    title: {
      name: 'title',
      type: 'String',
      transient: false
    },
    comments: {
      name: 'id', // indicates that the id field should be selected
      type: 'ID',
      transient: false
    }
  })
  expect(primaryKey).toEqual({
    name: 'id',
    type: 'ID'
  })
});

test('Model has default crud configuration', async () => {

  const { metadata } = setup(`
"""
@model
"""
type Note {
  id: ID!
  title: String!
}`)


  const models = metadata.getModelDefinitions();

  const { crudOptions } = getModelByName('Note', models)

  expect(crudOptions).toEqual({
    findOne: true,
    find: true,
    create: true,
    update: true,
    delete: true,
    subCreate: true,
    subDelete: true,
    subUpdate: true
  })
});

test('Override CRUD config for model', async () => {

  const { metadata } = setup(`
"""
@model(create: false)
"""
type Note {
  id: ID!
  title: String!
}

"""
@model
"""
type Comment {
  id: ID!
  title: String!
}
`)

  const models = metadata.getModelDefinitions();

  const note = getModelByName('Note', models)
  const comment = getModelByName('Comment', models)

  expect(note.crudOptions.create).toBe(false)
  expect(comment.crudOptions.create).toBe(true)
});

