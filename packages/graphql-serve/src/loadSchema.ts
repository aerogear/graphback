import { join } from 'path';
import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { GraphQLSchema } from 'graphql';

/**
 * Loads the schema text from the model directory
 *
 * @export
 * @param {string} modelDir
 * @returns {string}
 */
export function loadModel(modelDir: string): Promise<GraphQLSchema> {
  const modelPath = join(process.cwd(), modelDir, '*.graphql');

  const modelDefs = loadSchema(modelPath, {
    loaders: [
      new GraphQLFileLoader()
    ]
  })

  return modelDefs
}
