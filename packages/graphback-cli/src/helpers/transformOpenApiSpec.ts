import chalk from 'chalk';
import { readFileSync, renameSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob';
import { printSchema } from 'graphql';
import { safeLoad } from 'js-yaml'
import { createGraphQlSchema } from "openapi-to-graphql"
import { logError, logInfo } from '../utils';
import { removeCommentsFromSchema, removeOperationsFromSchema } from "../utils/openApiHelpers"
/**
 * Configuration options for OpenAPI generator
 */
interface OpenApiConfig {
    /**
     * Transform OpenAPI to GraphQL Schema 
     * 
     * @default false
     */
    includeComments: boolean,

    /**
     * Migration migrates GraphQL schema only once.
     * Use this flag to continusly migrate OpenAPI definition in model folder
     * 
     * @default false
     */
    reuseOpenAPIModel: boolean

    /**
     * Removes queries and mutations comming from OpenAPI spec
     * 
     * @default false
     */
    includeQueriesAndMutations: boolean
}

/**
 * OpenAPI command line tool
 * 1. Reads all the OpenAPI yaml and json files from the model folder
 * 2. Generates GraphQL Schema
 * 3. Renames original OpenAPI definitions so they will not be processed anymore
 */
export const transformOpenApiSpec = async () => {
    const models = new GlobSync('model/*.yaml', { cwd: process.cwd() })
    const jsonModels = new GlobSync('model/*.json', { cwd: process.cwd() })

    if (models.found.length === 0 && jsonModels.found.length === 0) {
        logError(`No OpenAPI file found inside ${process.cwd()}/model folder.`)
        process.exit(0)
    }

    const configPath = `${process.cwd()}/config.json`
    let { openApi } = JSON.parse(readFileSync(configPath, "utf8"))
    openApi = openApi || {};

    const path: string = process.cwd()
    for (const model of jsonModels.found) {
        await processSingleDefinition(model, path, false, openApi);
    }

    for (const model of models.found) {
        await processSingleDefinition(model, path, true, openApi);
    }

    logInfo(`
   Successfully generated GraphQL schema from OpenAPI definition.
   You can review your schema in model folder and OpenAPI it for your own needs. 
   You can then generate your backend using ${chalk.cyan(`graphback generate`)} command that will create resolvers.
   OpenAPI files will not longer be processed by generator.`)
}

async function processSingleDefinition(model: string, path: string, isYaml: boolean, openApiConfig: OpenApiConfig) {
    logInfo(`   Processing OpenAPI definition: ${model}`);
    const schemaText: string = readFileSync(`${path}/${model}`, 'utf8');
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

        writeFileSync(`${path}/${model}.graphql`, schemaString);
        if (!openApiConfig.reuseOpenAPIModel) {
            renameSync(`${path}/${model}`, `${path}/${model}_processed`)
        }
        logInfo(`   Finished transforming OpenAPI definition: ${model}`);
    }
    catch (err) {
        logInfo(`   Failed to process OpenAPI definition: ${model}. Error: ${err}`);
    }
}
