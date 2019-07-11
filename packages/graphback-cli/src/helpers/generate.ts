import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, IGraphQLBackend, KnexResolverManager } from 'graphback'
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

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')

    // TODO location of the generated content should not be hardcoded
    const outputSchemaPath: string = `${process.cwd()}/generated/schema.graphql`
    const outputResolverPath: string = `${process.cwd()}/generated/resolvers.ts`

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText);

    // TODO Abstraction to connect resolver managers
    // Add ability to discover and pick what implementation should be used
    const resolverManager = new KnexResolverManager();
    backend.registerResolverManager(resolverManager);

    const generated: IGraphQLBackend = await backend.createBackend()

    writeFileSync(outputSchemaPath, generated.schema)
    writeFileSync(outputResolverPath, generated.resolvers)
  } catch (err) {
    logError(err.messsage)
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