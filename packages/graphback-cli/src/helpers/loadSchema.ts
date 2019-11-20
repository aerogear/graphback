import { GraphQLSchema } from 'graphql';
import { loadConfig } from 'graphql-config';
import { logError } from '../utils';

/**
 * Loads the GraphQLSchema from .graphqlrc config file.
 *
 * @export
 * @returns {Promise<GraphQLSchema>}
 */
export async function loadSchema(): Promise<GraphQLSchema> {
  const config = await loadConfig({});

  let schema: GraphQLSchema;
  try {
    schema = await config.getDefault().getSchema();
  } catch (err) {
    logError('Invalid or missing GraphQL schema');
    process.exit(0);
  }

  return Promise.resolve(schema);
}
