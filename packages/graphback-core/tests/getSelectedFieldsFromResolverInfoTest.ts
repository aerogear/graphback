/* eslint-disable import/no-extraneous-dependencies */
import { GraphQLSchema, buildSchema } from "graphql"
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'; 
import { GraphbackPluginEngine, GraphbackCoreMetadata, ModelDefinition, getModelFieldsFromResolverFields } from "@graphback/core";

describe('getSelectedFieldsFromResolverInfo', () => {

  const setup = (schemaAST: string): { schema: GraphQLSchema, metadata: GraphbackCoreMetadata } => {
    const schema = buildSchema(schemaAST);

    const pluginEngine = new GraphbackPluginEngine({ schema, plugins: [new SchemaCRUDPlugin()] });

    const metadata = pluginEngine.createResources()

    return { metadata, schema }
  }

  test('Ignore @transient annotated fields', () => {
    const { metadata } = setup(`
    """ @model """
type User {
  id: ID!
  forename: String
  surname: String
  """@transient"""
  fullName: String
}`);

    const userModel = metadata.getModelDefinitions().find((m: ModelDefinition) => m.graphqlType.name === 'User');

    const selectedFields = getModelFieldsFromResolverFields(['id', 'forename', 'surname', 'fullName'], userModel)

    expect(selectedFields).toEqual(['id', 'forename', 'surname'])
  })
})