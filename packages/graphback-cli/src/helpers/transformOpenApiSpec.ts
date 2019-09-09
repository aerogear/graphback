import chalk from 'chalk';
import { readFileSync, writeFileSync, renameSync } from 'fs';
import { GlobSync } from 'glob';
import { printSchema } from 'graphql'
import { safeLoad } from 'js-yaml'
import { createGraphQlSchema } from "openapi-to-graphql"
import { logError, logInfo } from '../utils';

/**
 * OpenAPI command line tool
 * 1. Reads all the OpenAPI yaml and json files from the model folder
 * 2. Generates GraphQL Schema
 * 3. Renames original OpenApi definitions so they will not be processed anymore
 */
export const transformOpenApiSpec = async () => {
    const models = new GlobSync('model/*.yaml', { cwd: process.cwd() })
    const jsonModels = new GlobSync('model/*.json', { cwd: process.cwd() })

    if (models.found.length === 0 && jsonModels.found.length === 0) {
        logError(`No OpenApi file found inside ${process.cwd()}/model folder.`)
        process.exit(0)
    }
    // TODO - add config for including custom methods
    const path: string = process.cwd()
    for (const model of jsonModels.found) {
        await processSingleDefinition(model, path, true);
    }

    for (const model of models.found) {
        await processSingleDefinition(model, path, true);
    }

    logInfo(`
    Successfully generated GraphQL schema from OpenApi definition.
    You can review your schema in model folder and adjust it for your own needs. 
    You can then generate your backend using ${chalk.cyan(`graphback generate`)} command that will create resolvers.
    OpenApi files will not longer be processed by generator.
    `)
}

async function processSingleDefinition(model: string, path: string, isYaml: boolean) {
    logInfo(`   Processing OpenApi definition: ${model}`);
    const schemaText: string = readFileSync(`${path}/${model}`, 'utf8');
    let parsedObject;
    if (isYaml) {
        parsedObject = safeLoad(schemaText);
    } else {
        parsedObject = JSON.parse(schemaText);
    }
    try {
        const { schema } = await createGraphQlSchema(parsedObject, { strict: false, fillEmptyResponses: true });
        const schemaString = printSchema(schema);
        writeFileSync(`${path}/${model}.graphql`, schemaString);
        renameSync(`${path}/${model}`, `${path}/${model}_processed`)
        logInfo(`   Finished transforming OpenApi definition: ${model}`);
    }
    catch (err) {
        logInfo(`   Failed to process OpenApi definition: ${model}. Error: ${err}`);
    }
}

