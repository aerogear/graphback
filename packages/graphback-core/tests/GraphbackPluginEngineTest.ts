import { buildSchema } from "graphql";
import { GraphbackPluginEngine } from "../src";

describe('GraphbackPluginEngineTest', () => {
  const defaultModel = buildSchema(`
  """ @model """
type Note {
  """ @id """
  _id: ID!
  title: String!
  description: String
  """
  @oneToMany(field: 'note')
  """
  comments: [Comment]!
}

""" @model """
type Comment {
  """ @id """
  _id: ID!
  text: String
  description: String
}`);

  test('should create initial models', () => {
    const pluginEngine = new GraphbackPluginEngine({ schema: defaultModel });
    const metadata = pluginEngine.createResources();
    const models = metadata.getModelDefinitions();

    expect(models).toHaveLength(2);
  });
})