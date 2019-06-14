import chalk from 'chalk';
import { accessSync, readFileSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, IGraphQLBackend, KnexResolverManager, PostgresSchemaManager } from 'graphback-core'
import { logError, logInfo } from '.';

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
    const model = new GlobSync('model/*.graphql', { cwd: process.cwd()})
    
    if(model.found.length === 0) {
      logError(`No graphql file found inside model.`)
      process.exit(0)
    }

    const path = `${process.cwd()}/${model.found[0]}`
    const schemaText = readFileSync(path, 'utf8')

    const outputSchemaPath = `${process.cwd()}/generated/schema.graphql`
    const outputResolverPath = `${process.cwd()}/generated/resolvers.ts`
    
    const backend = new GraphQLBackendCreator(schemaText)
    
    const connectionConfig = {
      'user': 'postgresql',
      'password': 'postgres',
      'database': 'users',
      'host': '127.0.0.1',
      'port': '5432'
    }
    
    const manager = new PostgresSchemaManager(connectionConfig);
    backend.registerDataResourcesManager(manager);
    
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