import chalk from 'chalk';
import { readFileSync, renameSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob';
import { printSchema } from 'graphql';
import { loadConfig } from 'graphql-config';
import { safeLoad } from 'js-yaml'
import { createGraphQlSchema } from "openapi-to-graphql"
import { extensionName, graphbackConfigExtension } from '../config/extension';
import { logError, logInfo } from '../utils';
import { removeCommentsFromSchema, removeOperationsFromSchema } from "../utils/openApiHelpers"

/**
 * OpenAPI command line tool
 * 1. Reads all the OpenAPI yaml and json files from the model folder
 * 2. Generates GraphQL Schema
 * 3. Renames original OpenAPI definitions so they will not be processed anymore
 */
export const transformOpenApiSpec = async () => {
    const config = await loadConfig({
        extensions: [graphbackConfigExtension]
    });
    const project = config.getProject('default')
    const graphbackConfig = project.extension(extensionName);

    if (!graphbackConfig) {
        throw new Error(`You should provide a valid '${extensionName}' config to generate schema from data model`);
    }

    if (!graphbackConfig.model) {
        throw new Error(`' ${extensionName}' config missing 'model' value that is required`);
    }

    const models = new GlobSync(`${graphbackConfig.model}/*.yaml`)
    const jsonModels = new GlobSync(`${graphbackConfig.model}/*.json`)

    if (models.found.length === 0 && jsonModels.found.length === 0) {
        logError(`No OpenAPI file found inside model folder.`)
        process.exit(0)
    }

    for (const model of jsonModels.found) {
        await processSingleDefinition(model, false);
    }

    for (const model of models.found) {
        await processSingleDefinition(model, true);
    }

    logInfo(`
   Successfully generated GraphQL schema from OpenAPI definition.
   You can review your schema in model folder and modify it for your own needs. 
   You can then generate your backend using ${chalk.cyan(`generate`)} command that will create resolvers.
   OpenAPI files will not longer be processed by generator.`)
}

async function processSingleDefinition(model: string, isYaml: boolean) {
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
        schema = removeCommentsFromSchema(schema)
        schema = removeOperationsFromSchema(schema);
        const schemaString = printSchema(schema);

        writeFileSync(`${model}.graphql`, schemaString);
        renameSync(`${model}`, `${model}_processed`)
        logInfo(`   Finished transforming OpenAPI definition: ${model}`);
    }
    catch (err) {
        logInfo(`   Failed to process OpenAPI definition: ${model}. Error: ${err}`);
    }
}
