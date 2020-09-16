import { GraphQLSchema, buildSchema, assertObjectType, GraphQLResolveInfo } from "graphql"
import { GraphbackCoreMetadata } from "../src/plugin/GraphbackCoreMetadata";
import { ModelDefinition } from '../src/plugin/ModelDefinition'
import { getModelFieldsFromResolverFields } from '../src/plugin/getSelectedFieldsFromResolverInfo';
import { GraphbackPluginEngine } from "../src";

describe('getSelectedFieldsFromResolverInfo', () => {

  const setup = (schemaAST: string): { schema: GraphQLSchema, metadata: GraphbackCoreMetadata } => {
    const schema = buildSchema(schemaAST);

    const pluginEngine = new GraphbackPluginEngine({ schema });

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