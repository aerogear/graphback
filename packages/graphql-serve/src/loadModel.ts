/* eslint-disable @typescript-eslint/no-use-before-define */
import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { GraphQLSchema } from 'graphql';
import { existsSync, lstatSync } from 'fs';
import { join } from 'path';

/**
 * Loads the schema object from the directory or URL
 *
 * @export
 * @param {string} modelDir
 * @returns {string}
 */
export async function loadModel(modelPath: string): Promise<GraphQLSchema> {
  modelPath = resolveModelPath(modelPath)

  const modelDefs = await loadSchema(modelPath, {
    loaders: [
      new GraphQLFileLoader()
    ]
  })

  return modelDefs
}

function resolveModelPath(modelPath: string): string {
  if (typeof modelPath === 'string' && existsSync(modelPath) && lstatSync(modelPath).isDirectory()) {
    modelPath = join(process.cwd(), modelPath, '*.graphql')
  }

  return modelPath
}
