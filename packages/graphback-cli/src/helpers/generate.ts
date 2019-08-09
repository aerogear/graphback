import chalk from 'chalk';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { Config, GraphQLBackendCreator, IGraphQLBackend, OutputResolver } from 'graphback'
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

    const { database, generation } = JSON.parse(readFileSync(configPath, "utf8"))

    const { templateType } = JSON.parse(readFileSync(`${process.cwd()}/.template.json`, 'utf8'))

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')

    const outputSchemaPath: string = `${process.cwd()}/src/schema/generated.ts`
    const outputResolverPath: string = `${process.cwd()}/src/resolvers`

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, generation)

    const generated: IGraphQLBackend = await backend.createBackend(database, templateType)

    writeFileSync(outputSchemaPath, generated.schema)

    writeFileSync(`${outputResolverPath}/index.ts`, generated.resolvers.index)
    
    if(!existsSync(`${outputResolverPath}/custom`)) {
      mkdirSync(`${outputResolverPath}/custom`)
    }

    if(!existsSync(`${outputResolverPath}/generated`)) {
      mkdirSync(`${outputResolverPath}/generated`)
    }

    generated.resolvers.custom.forEach((output: OutputResolver) => {
      if(!existsSync(`${outputResolverPath}/custom/${output.name}.ts`) || output.name === 'index') {
        writeFileSync(`${outputResolverPath}/custom/${output.name}.ts`, output.output)
      }
    })

    const resolverFiles = readdirSync(`${outputResolverPath}/generated`)
    resolverFiles.forEach((file: string) => unlinkSync(`${outputResolverPath}/generated/${file}`))

    generated.resolvers.types.forEach((output: OutputResolver) => writeFileSync(`${outputResolverPath}/generated/${output.name}.ts`, output.output))
    
  } catch (err) {
    logError(err)
    process.exit(0)
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