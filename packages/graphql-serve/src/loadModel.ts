/* eslint-disable @typescript-eslint/no-use-before-define */
import { loadSchemaSync } from '@graphql-tools/load'
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
export function loadModel(modelPath: string): GraphQLSchema {
  modelPath = resolveModelPath(modelPath)

  const modelDefs = loadSchemaSync(modelPath, {
    loaders: [
      new GraphQLFileLoader()
    ]
  })

  return modelDefs
}

function resolveModelPath(modelPath: string): string {
  let fullModelPath = join(process.cwd(), modelPath)
  if (typeof modelPath === 'string' && existsSync(fullModelPath) && lstatSync(fullModelPath).isDirectory()) {
    fullModelPath = join(fullModelPath, '*.graphql')
  }

  return fullModelPath
}
