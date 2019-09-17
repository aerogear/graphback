import chalk from 'chalk';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync, readFile } from 'fs';
import { GlobSync } from 'glob'
import { ClientImplementation, GraphQLBackendCreator, IGraphQLBackend, OutputResolver } from 'graphback'
import { join } from 'path'
import { configInstance } from '../config/ConfigBuilder';
import { logError, logInfo } from '../utils';
import { checkDirectory } from './common';
import { diff } from '@graphql-inspector/core';


/**
 * Message after command execution
 */
function postCommandMessage(cliName: string): void {
  logInfo(`
Successfully generated schema and resolvers :tada:.  

Run ${chalk.cyan(`docker-compose up -d`)} or ${chalk.cyan(`docker-compose start`)} 
followed by ${chalk.cyan(`${cliName}db`)} to create database.
`)
}

/**
 * Generate schema and resolvers using graphback-core and
 * write them into generated folder
 */
export async function generateBackend(): Promise<void> {
  try {
    const { folders, graphqlCRUD, db: { database }, client } = configInstance.config;

    const models = new GlobSync(`${folders.model}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${folders.model} folder.`)
      process.exit(0)
    }

    const schemaText: string = models.found.map((m: string) => readFileSync(`/${m}`, 'utf8')).join('\n')

    const pathForSchema: string = join(process.cwd(), folders.schema)
    const outputSchemaPath: string = `${pathForSchema}/generated.ts`

    const customResolvers: string = join(process.cwd(), folders.customResolvers, `custom`)
    const generatedResolvers: string = join(process.cwd(), folders.generatedResolvers, `generated`)

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, graphqlCRUD)
    const generated: IGraphQLBackend = await backend.createBackend(database)

    checkAndCreateFolders(pathForSchema, customResolvers, generatedResolvers);

    generated.resolvers.custom.forEach((output: OutputResolver) => {
      if (!existsSync(`${customResolvers}/${output.name}.ts`) || output.name === 'index') {
        writeFileSync(`${customResolvers}/${output.name}.ts`, output.output)
      }
    })
    try {
      const oldSchema = readFileSync(outputSchemaPath, 'utf8')
      const diffChanges = diff(generated.schema, oldSchema)
      diffChanges.forEach((change) => {
        console.log("Change detected")
        console.log(`${JSON.stringify(change)}`);
      })
    } catch {
      // Ignore
    }



    writeFileSync(outputSchemaPath, generated.schema)
    writeFileSync(`${generatedResolvers}/index.ts`, generated.resolvers.index)

    generated.resolvers.types.forEach((output: OutputResolver) => writeFileSync(`${generatedResolvers}/${output.name}.ts`, output.output))

    if (client) {
      const generatedClient = await backend.createClient()
      if (!existsSync(folders.client)) {
        mkdirSync(folders.client, { recursive: true })
      }
      Object.keys(generatedClient).forEach((folder: string) => {
        const currentFolder = `${folders.client}/${folder}`
        if (!existsSync(currentFolder)) {
          mkdirSync(currentFolder)
        }
        generatedClient[folder].forEach((c: ClientImplementation) => writeFileSync(`${currentFolder}/${c.name}.ts`, c.implementation))
      })
    }
  } catch (err) {
    logError(err)
    process.exit(0)
  }

  function checkAndCreateFolders(pathForSchema: string, customResolvers: string, generatedResolvers: string) {
    if (!existsSync(pathForSchema)) {
      mkdirSync(pathForSchema, { recursive: true });
    }
    if (!existsSync(customResolvers)) {
      mkdirSync(customResolvers, { recursive: true });
    }
    if (!existsSync(generatedResolvers)) {
      mkdirSync(generatedResolvers, { recursive: true });
    }
  }
}

/**
 * exported generate handler
 */
export async function generate(cliName: string = "graphback"): Promise<void> {
  checkDirectory()
  await generateBackend()
  postCommandMessage(cliName)
}