import { GraphbackCRUDGeneratorConfig } from "@graphback/core"
import { CodeFileLoader } from '@graphql-toolkit/code-file-loader';
import chokidar from 'chokidar';
import { debounce } from 'debounce';
import { join } from 'path';
import { GraphbackGenerator } from 'graphback';
import { GraphQLExtensionDeclaration, loadConfig } from 'graphql-config';

export interface GenerateConfig {
  model: string
  crud: GraphbackCRUDGeneratorConfig;
  plugins: any[],
  knexdb: { database: string; dbConfig: any; };
}

export interface CliFlags {
  silent: boolean, watch: boolean
}

const extensionName = 'graphback';

/**
 * Config extension that register graphback plugin
 * @param api 
 */
export const GenerateConfigExtension: GraphQLExtensionDeclaration = api => {
  // Schema
  api.loaders.schema.register(new CodeFileLoader());

  return {
    name: extensionName
  };
};

export const generateUsingEngine = async (cliFlags: CliFlags) => {
  try {
    const config = await loadConfig({
      extensions: [GenerateConfigExtension]
    });
    // TODO support namespace
    const project = config.getDefault();

    const graphbackConfig: GenerateConfig = project.extension(extensionName);

    if (!graphbackConfig) {
      throw new Error(`You should provide a valid '${extensionName}' config to generate schema from data model`);
    }

    if (!graphbackConfig.model) {
      throw new Error(`' ${extensionName}' config missing 'model' value that is required`);
    }

    if (graphbackConfig.plugins && graphbackConfig.plugins.length === 0) {
      throw new Error(`'${extensionName}' config 'plugins' section is empty. No code will be generated`);
    }
    // TODO default plugin config
    console.log(JSON.stringify(graphbackConfig))

    const runGeneration = async () => {
      try {
        const schemaDocument = await project.loadSchema(join(config.dirpath, graphbackConfig.model, '/**/*.graphql'));
        // TODO validation
        const engine = new GraphbackGenerator(schemaDocument, graphbackConfig as any)
        engine.buildServer();
      } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("error when executing generate", e);
      }
      // tslint:disable-next-line: no-console
      console.info('Watching for changes...');
    }
    const debouncedExec = debounce(runGeneration, 100);

    if (cliFlags.watch) {
      chokidar.watch(graphbackConfig.model, {
        persistent: true,
        cwd: config.dirpath,
      }).on('all', debouncedExec);
    } else {
      const schemaDocument = await project.loadSchema(join(config.dirpath, graphbackConfig.model, '/**/*.graphql'));
      const generator = new GraphbackGenerator(schemaDocument, graphbackConfig)
      generator.buildServer();
      process.exit(0);
    }

  } catch (e) {
    // tslint:disable-next-line: no-console
    console.log("error when executing generate", e);
  }
}

