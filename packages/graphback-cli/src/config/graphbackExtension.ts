import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLExtensionDeclaration } from 'graphql-config';


export const graphbackExtension = 'graphback';

/**
 * Config extension that register graphback plugin
 * @param api
 */
// eslint-disable-next-line @typescript-eslint/tslint/config
export const graphbackConfigExtension: GraphQLExtensionDeclaration = api => {
  //Schema
  api.loaders.schema.register(new GraphQLFileLoader());

  return {
    name: graphbackExtension
  };
};
