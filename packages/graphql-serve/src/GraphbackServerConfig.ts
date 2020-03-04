import { GraphbackCRUDGeneratorConfig } from "@graphback/core";
import { getConfig } from "./runtime";

export interface GraphbackServerConfig {
    model: string,
    crud: GraphbackCRUDGeneratorConfig,
    plugins: any
}

export async function getGraphbackServerConfig(modeldir: string) {
    const graphbackConfigOpts: GraphbackServerConfig = {
        //  Default schema
        model: null,
        // Global configuration for CRUD generator
        crud: {
            create: true,
            update: true,
            findAll: true,
            find: true,
            delete: true,
            subCreate: true,
            subUpdate: true,
            subDelete: true,
        },
        plugins: {
            'graphback-schema': {
                format: 'graphql',
                outputPath: './server/src/schema'
            },
            'graphback-client':{
                format: 'graphql',
                outputPath: './client/src/graphql'
            },
            'graphback-resolvers':{
                format: 'ts',
                outputPath: './server/src/resolvers'
            }
        }
    }
    try {
        // getConfig throws when config file is missing
        const localGraphbackConfig = await getConfig('graphback');

        // If config file exists and has crud options, use those
        if (localGraphbackConfig.crud) {
            graphbackConfigOpts.crud = localGraphbackConfig.crud;
        }

        // Use model from config file if specified
        if (localGraphbackConfig.model) {
            graphbackConfigOpts.model = localGraphbackConfig.model;
        }
    } catch (e) {
        console.log('Could not read graphql config, trying default crud options.');
    }

    // Model argument takes priority over config file
    if (modeldir) {
        graphbackConfigOpts.model = modeldir;
    }

    // If this is still null, then no model specified
    if (graphbackConfigOpts.model == null) {
        throw Error("No model folder specified. Please either specify the model folder in graphql config file or in the --model argument");
    }
    return graphbackConfigOpts;
}
  