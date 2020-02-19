import { join } from 'path';
import chokidar from 'chokidar';
import { debounce } from 'debounce';
import { GraphbackCRUDGeneratorConfig, GraphbackGenerator } from "graphback"
import { loadConfig } from 'graphql-config';
import { graphbackExtension, graphbackConfigExtension } from '../config/graphbackExtension';

export interface GraphbackCLIConfig {
  model: string
  crud: GraphbackCRUDGeneratorConfig;
  plugins: any
}

export interface CliFlags {
  silent?: boolean, watch?: boolean, project?: 'default' | string
}

export const generateUsingPlugins = async (cliFlags: CliFlags) => {
  const config = await loadConfig({
    rootDir: process.cwd(),
    extensions: [graphbackConfigExtension]
  });
  const project = config.getProject(cliFlags.project || 'default');
  const graphbackConfig = project.extension(graphbackExtension);

  if (!graphbackConfig) {
    throw new Error(`You should provide a valid '${graphbackExtension}' config to generate schema from data model`);
  }

  if (!graphbackConfig.model) {
    throw new Error(`' ${graphbackExtension}' config missing 'model' value that is required`);
  }

  if (graphbackConfig.plugins && graphbackConfig.plugins.length === 0) {
    throw new Error(`'${graphbackExtension}' config 'plugins' section is empty. No code will be generated`);
  }

  const runGeneration = async () => {
    try {
      const schemaDocument = await project.loadSchema(join(config.dirpath, graphbackConfig.model, '/**/*.graphql'));
      const generator = new GraphbackGenerator(schemaDocument, graphbackConfig);
      generator.generateSourceCode();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error when executing generate", e);
    }
    // eslint-disable-next-line no-console
    console.info('Watching for changes...');
  };
  const debouncedExec = debounce(runGeneration, 100);

  if (cliFlags.watch) {
    chokidar.watch(graphbackConfig.model, {
      persistent: true,
      cwd: config.dirpath,
    }).on('all', debouncedExec);
  } else {
    const schemaDocument = await project.loadSchema(join(config.dirpath, graphbackConfig.model, '/**/*.graphql'));
    const generator = new GraphbackGenerator(schemaDocument, graphbackConfig);
    generator.generateSourceCode();
  }
};

