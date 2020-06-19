/* eslint-disable @typescript-eslint/no-use-before-define */
import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { UrlLoader } from '@graphql-tools/url-loader'
import { GraphQLSchema } from 'graphql';
import { UniversalLoader } from 'graphql-config';
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

  const graphqlLoader = getLoader(modelPath)

  const modelDefs = await loadSchema(modelPath, {
    loaders: [
      graphqlLoader
    ]
  })

  return modelDefs
}

function resolveModelPath(modelPath: string): string {
  if (typeof modelPath === 'string' && existsSync(modelPath) && lstatSync(modelPath).isDirectory()) {
   modelPath = join(process.cwd(), modelPath, '*.graphql')
  } else if (!isUrl(modelPath)) {
    modelPath = join(process.cwd(), modelPath)
  }

  return modelPath
}

function isUrl(maybeUrl: string): boolean {
  const url = new RegExp(/https?:\/\//)

  const matches = url.exec(maybeUrl)

  return !!matches
}


function getLoader(modelPath: string): UniversalLoader {
  if (isUrl(modelPath)) {
    return new UrlLoader()
  }

  return new GraphQLFileLoader()
}
