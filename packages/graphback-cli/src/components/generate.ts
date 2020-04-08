import { join } from 'path';
import { existsSync, lstatSync } from 'fs';
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

  const modelPath = getModelPath(config.dirpath, graphbackConfig.model)

  if (cliFlags.watch) {
    chokidar.watch(modelPath, {
      persistent: true,
      cwd: config.dirpath,
    }).on('all', debouncedExec);
  } else {
    
    const schemaDocument = await project.loadSchema(modelPath);
    const generator = new GraphbackGenerator(schemaDocument, graphbackConfig);
    generator.generateSourceCode();
  }
};

/**
 * 
 * Formats the model path or list of paths to ensure
 *   * only paths from inside the project are allowed
 *   * if a directory is supplied *.graphql is appended
 * 
 * @param baseDir the base directory that should be appended to the path or paths
 * @param model a path or a list of paths
 */
function getModelPath(baseDir: string, model: string | Array<string>): string | Array<string> {
  if (typeof model === 'string' && existsSync(model) && lstatSync(model).isDirectory()) {
    return join(baseDir, model, '/**/*.graphql')
  } else if (typeof model === 'string') {
    return join(baseDir, model)
  } else if (Array.isArray(model)) {
    return model.map((path) => join(baseDir, path))
  }
  return model
}
