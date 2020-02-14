import { CodeFileLoader } from '@graphql-toolkit/code-file-loader';
import { GraphQLExtensionDeclaration, loadConfig } from 'graphql-config';


export const extensionName = 'graphback';

/**
 * Config extension that register graphback plugin
 * @param api 
 */
//tslint:disable-next-line: typedef
export const graphbackConfigExtension: GraphQLExtensionDeclaration = api => {
    //Schema
    api.loaders.schema.register(new CodeFileLoader());

    return {
        name: extensionName
    };
};