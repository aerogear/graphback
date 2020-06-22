import { GraphbackPlugin, GraphbackPluginEngine, printSchemaWithDirectives } from 'graphback'
import { loadModel } from '../loadModel';
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';

export const printSchemaHandler = async (argv: { model?: string }): Promise<string> => {
  const schemaText = await loadModel(argv.model);

  const schemaPlugins: GraphbackPlugin[] = [
    new SchemaCRUDPlugin
  ]

  const pluginEngine = new GraphbackPluginEngine({
    schema: schemaText,
    plugins: schemaPlugins,
    config: { crudMethods: {} }
  })

  const metadata = pluginEngine.createResources()

  const schema = metadata.getSchema();

  const printedSchema = printSchemaWithDirectives(schema)

  return printedSchema
}
