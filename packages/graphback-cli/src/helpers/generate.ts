import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, IGraphQLBackend } from 'graphback'
import { logError, logInfo } from '../utils';
import { checkDirectory } from './common';

/**
 * Message after command execution
 */
function postCommandMessage(): void {
  logInfo(`
Successfully generated schema and resolvers :tada:.  

Next steps:
1. Run ${chalk.cyan(`docker-compose up -d`)} or ${chalk.cyan(`docker-compose start`)} 
   followed by ${chalk.cyan(`graphback db`)} to create database.
2. Run ${chalk.cyan(`graphback watch`)} to start the server.
`)
}

/**
 * Generate schema and resolvers using graphback-core and
 * write them into generated folder
 */
export async function generateBackend(): Promise<void> {
  try {
    const models = new GlobSync('model/*.graphql', { cwd: process.cwd() })

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }
    const configPath = `${process.cwd()}/config.json`

    const file = readFileSync(configPath, "utf8");
    let genConfig = {};
    if (file) {
      genConfig = JSON.parse(file).generation
    }

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')

    const outputSchemaPath: string = `${process.cwd()}/generated/schema.ts`
    const outputResolverPath: string = `${process.cwd()}/generated/resolvers.ts`

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, genConfig)

    const generated: IGraphQLBackend = await backend.createBackend()

    writeFileSync(outputSchemaPath, generated.schema)
    writeFileSync(outputResolverPath, generated.resolvers)
  } catch (err) {
    logError(err)
  }
}

/**
 * exported generate handler
 */
export async function generate(): Promise<void> {
  checkDirectory()
  await generateBackend()
  postCommandMessage()
}