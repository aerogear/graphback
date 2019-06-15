import chalk from 'chalk';
import { accessSync, readFileSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, IGraphQLBackend, KnexResolverManager } from 'graphback'
import { logError, logInfo } from '../utils';

/**
 * Message after command execution
 */
function postCommandMessage(): void {
  logInfo(`
Successfully generated schema and resolvers :tada:.  

Next steps:
1. Run ${chalk.cyan(`graphback db`)} to create postgres database.
2. Run ${chalk.cyan(`docker-compose up -d`)} followed by ${chalk.cyan(`npm start`)}
`)
}

/**
 * Generate schema and resolvers using graphback-core and
 * write them into generated folder
 */
async function generateBackend(): Promise<void> {
  try{
    accessSync(`${process.cwd()}/model`)
    const models = new GlobSync('model/*.graphql', { cwd: process.cwd()})
    
    if(models.found.length === 0) {
      logError(`No graphql file found inside ./model folder.`)
      process.exit(0)
    }

    const path: string = `${process.cwd()}`
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')

    const outputSchemaPath: string = `${process.cwd()}/generated/schema.graphql`
    const outputResolverPath: string = `${process.cwd()}/generated/resolvers.ts`
    
    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText)
    
    const resolverManager = new KnexResolverManager();
    backend.registerResolverManager(resolverManager);
    
    const generated: IGraphQLBackend = await backend.createBackend()
    
    writeFileSync(outputSchemaPath, generated.schema)
    writeFileSync(outputResolverPath, generated.resolvers)
  } catch(err) {
    logError(`model directory not found. Make you sure you are in the root of your project.`)
  }
}

/**
 * exported generate handler
 */
export async function generate(): Promise<void> {
  await generateBackend()
  postCommandMessage()
}