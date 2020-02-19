import { CodeFileLoader } from '@graphql-toolkit/code-file-loader';
import { GraphQLExtensionDeclaration, loadConfig } from 'graphql-config';


export const dbmigrationsExtension = 'dbmigrations';

/**
 * Config extension that register dbmigrations
 * @param api
 */
// eslint-disable-next-line @typescript-eslint/tslint/config
export const dbMigrationConfigExtension: GraphQLExtensionDeclaration = api => {
  //Schema
  api.loaders.schema.register(new CodeFileLoader());

  return {
    name: dbmigrationsExtension
  };
};
