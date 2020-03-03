import { readFileSync } from 'fs';
import test, { ExecutionContext } from 'ava';
import { buildSchema, print } from 'graphql';
import { SchemaComposer } from 'graphql-compose';
import { stripAnnotations } from 'graphql-metadata';
import { GraphbackCoreMetadata, GraphbackPlugin, GraphbackPluginEngine } from '../src'

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

/**
 * Testing engine
 */
class TestPlugin extends GraphbackPlugin {
  private generateCallback: any;

  //eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(generateCallback: any) {
    super();
    this.generateCallback = generateCallback;
  }

  public transformSchema(metadata: GraphbackCoreMetadata): SchemaComposer<any> {
    const schemaComposer = metadata.getSchemaComposer();
    schemaComposer.Query.setDescription('test');

    return schemaComposer;
  }

  /**
   * Create resources like files etc. for this plugin.
   * This method should write resources to filesystem
   */
  public createResources(metadata: GraphbackCoreMetadata) {
    this.logError("I love")
    this.logWarning("High code coverage")
    this.generateCallback(metadata);
  }

  public getPluginName() {
    return "test"
  }
}

test('Test plugin engine', async (t: ExecutionContext) => {
  const crudMethods = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  const engine = new GraphbackPluginEngine(new SchemaComposer(buildSchema(schemaText)), { crudMethods: crudMethods });
  t.plan(6);
  t.throws(engine.createResources)
  const plugin = new TestPlugin((callbackModel: any) => {
    //eslint-disable-next-line dot-notation
    t.context['model'] = callbackModel;
    t.pass();
  })

  engine.registerPlugin(plugin, plugin, plugin)
  const model = engine.createResources();

  const printedModels = model.getModelDefinitions().map((element: any) => print(element.graphqlType.astNode))
  t.snapshot(printedModels);
  t.true(model.getSchemaComposer().Query.getDescription() === 'test');
});
