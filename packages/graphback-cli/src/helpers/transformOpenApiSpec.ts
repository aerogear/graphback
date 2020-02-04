import chalk from 'chalk';
import { readFileSync, renameSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob';
import { printSchema } from 'graphql';
import { safeLoad } from 'js-yaml'
import { createGraphQlSchema } from "openapi-to-graphql"
import { ConfigBuilder } from '../config/ConfigBuilder';
import { OpenApiConfig } from '../config/OpenApiConfig';
import { logError, logInfo } from '../utils';
import { removeCommentsFromSchema, removeOperationsFromSchema } from "../utils/openApiHelpers"
import { checkDirectory } from './common';

/**
 * OpenAPI command line tool
 * 1. Reads all the OpenAPI yaml and json files from the model folder
 * 2. Generates GraphQL Schema
 * 3. Renames original OpenAPI definitions so they will not be processed anymore
 */
export const transformOpenApiSpec = async () => {
    const configInstance = new ConfigBuilder();
    checkDirectory(configInstance);

    const { folders } = configInstance.config;
    const openApi = configInstance.config.openApi || {
        includeComments : false,
        reuseOpenAPIModel: false,
        includeQueriesAndMutations: false
    }

    const models = new GlobSync(`${folders.model}/*.yaml`)
    const jsonModels = new GlobSync(`${folders.model}/*.json`)

    if (models.found.length === 0 && jsonModels.found.length === 0) {
        logError(`No OpenAPI file found inside model folder.`)
        process.exit(0)
    }

    for (const model of jsonModels.found) {
        await processSingleDefinition(model, false, openApi);
    }

    for (const model of models.found) {
        await processSingleDefinition(model, true, openApi);
    }

    logInfo(`
   Successfully generated GraphQL schema from OpenAPI definition.
   You can review your schema in model folder and modify it for your own needs.
   You can then generate your backend using ${chalk.cyan(`generate`)} command that will create resolvers.
   OpenAPI files will not longer be processed by generator.`)
}

async function processSingleDefinition(model: string, isYaml: boolean, openApiConfig: OpenApiConfig) {
    logInfo(`   Processing OpenAPI definition: ${model}`);
    const schemaText: string = readFileSync(`${model}`, 'utf8');
    let parsedObject;
    if (isYaml) {
        parsedObject = safeLoad(schemaText);
    } else {
        parsedObject = JSON.parse(schemaText);
    }
    try {
        let { schema } = await createGraphQlSchema(parsedObject, {
            strict: true,
            fillEmptyResponses: true,
            equivalentToMessages: false,

        });
        if (!openApiConfig.includeComments) {
            schema = removeCommentsFromSchema(schema)
        }
        if (!openApiConfig.includeQueriesAndMutations) {
            schema = removeOperationsFromSchema(schema);
        }

        const schemaString = printSchema(schema);

        writeFileSync(`${model}.graphql`, schemaString);
        if (!openApiConfig.reuseOpenAPIModel) {
            renameSync(`${model}`, `${model}_processed`)
        }
        logInfo(`   Finished transforming OpenAPI definition: ${model}`);
    }
    catch (err) {
        logInfo(`   Failed to process OpenAPI definition: ${model}. Error: ${err}`);
    }
}
