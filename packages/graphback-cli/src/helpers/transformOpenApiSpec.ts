import { readFileSync, writeFileSync} from 'fs';
import { GlobSync } from 'glob';
import { printSchema } from 'graphql'
import { safeLoad } from 'js-yaml'
import { createGraphQlSchema } from "openapi-to-graphql"
import { logError } from '../utils';


export const transformOpenApiSpec = async () => {
    const models = new GlobSync('model/*.yaml', { cwd: process.cwd() })
    const configPath = `${process.cwd()}/config.json`

    if (models.found.length === 0) {
        logError(`No OpenApi file found inside ${process.cwd()}/model folder.`)
        process.exit(0)
    }
    if (models.found.length !== 1) {
        logError(`Only single OpenApi file is supported. Check ${process.cwd()}/model folder.`)
        process.exit(0)
    }

    // TODO flag for generating database vs using it as api gateway. 
    // const { database, generation, client } = JSON.parse(readFileSync(configPath, "utf8"))

    const path: string = process.cwd()
    const schemaText: string = readFileSync(`${path}/${models.found[0]}`, 'utf8');
    const yamlObj = safeLoad(schemaText);
    const { schema } = await createGraphQlSchema(yamlObj, { strict: false })
    const schemaString = printSchema(schema);
    writeFileSync(`${path}/${models.found[0]}.graphql`, schemaString)
}

