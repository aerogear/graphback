import { GraphbackCRUDGeneratorConfig } from "@graphback/core";
import { loadConfig } from 'graphql-config';

export interface GraphbackConfig {
    model: string,
    crud: GraphbackCRUDGeneratorConfig,
    plugins: any
}
export interface GraphbackServerConfig {
    graphback: GraphbackConfig
}

export interface ConfigOverrides {
    modeldir: string
}

export async function getGraphbackServerConfig(overrideopts?: ConfigOverrides): Promise<GraphbackServerConfig> {
    const graphbackServerConfig: GraphbackServerConfig = {
        graphback: {
            //  Default schema
            model: null,
            // Global configuration for CRUD generator
            crud: {
                create: true,
                update: true,
                find: true,
                findOne: true,
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
                'graphback-client': {
                    format: 'graphql',
                    outputPath: './client/src/graphql'

                }
            }
        }
    }

    try {
        // Try to load the local config

        const configLoaderOpts = {
            extensions: [() => ({ name: 'graphback' })],
            throwOnMissing: true,
            throwOnEmpty: true,
        }

        // This statement throws if no config file is present
        const localGraphQLConfig = await loadConfig(configLoaderOpts);

        // Get the 'graphback' config
        const localGraphbackConfig = localGraphQLConfig.getDefault().extension('graphback');

        // If config has crud options, use those
        if (localGraphbackConfig.crud) {
            graphbackServerConfig.graphback.crud = localGraphbackConfig.crud;
        }

        // Use model from config if specified
        if (localGraphbackConfig.model) {
            graphbackServerConfig.graphback.model = localGraphbackConfig.model;
        }
    } catch (e) {
        console.log('Could not read graphql config, trying default config options.');
    }

    // Model argument takes priority over config file
    if (overrideopts && overrideopts.modeldir) {
        graphbackServerConfig.graphback.model = overrideopts.modeldir;
    }

    // If this is still null, then no model specified
    if (graphbackServerConfig.graphback.model == null) {
        throw Error("No model folder specified. Please either specify the model folder in graphql config file or in the command arguments");
    }
    return graphbackServerConfig;
}
