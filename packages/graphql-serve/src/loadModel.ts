import { loadSchema } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { UrlLoader } from '@graphql-tools/url-loader'
import { GraphQLSchema } from 'graphql';
import { UniversalLoader } from 'graphql-config';

/**
 * Loads the schema object from the directory or URL
 *
 * @export
 * @param {string} modelDir
 * @returns {string}
 */
export async function loadModel(modelPath: string): Promise<GraphQLSchema> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const graphqlLoader = getLoader(modelPath)

  const modelDefs = await loadSchema(modelPath, {
    loaders: [
      graphqlLoader
    ]
  })

  return modelDefs
}

function getLoader(modelPath: string): UniversalLoader {
  if (modelPath.startsWith('http')) {
    return new UrlLoader()
  }

  return new GraphQLFileLoader()
}
