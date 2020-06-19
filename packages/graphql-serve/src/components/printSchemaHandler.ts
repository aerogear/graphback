import { GraphbackPlugin, GraphbackPluginEngine, printSchemaWithDirectives } from 'graphback'
import { loadModel } from '../loadSchema';
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';

export const printSchemaHandler = async (argv: { model?: string }): Promise<void> => {
  console.log(argv.model)
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

  console.log("Generated schema:\n");
  console.log(printSchemaWithDirectives(schema));
}
