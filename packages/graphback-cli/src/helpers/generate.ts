import chalk from 'chalk';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { ClientImplementation, GraphQLBackendCreator, IGraphQLBackend, OutputResolver } from 'graphback'
import { join } from 'path'
import { logError, logInfo } from '../utils';
import { checkDirectory } from './common';

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
export async function generateBackend(pathForModel: string): Promise<void> {
  try {
    const configPath = `${process.cwd()}/config.json`

    const { paths, database, generation, client } = JSON.parse(readFileSync(configPath, "utf8"))

    const models = new GlobSync(`${pathForModel}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${pathForModel} folder.`)
      process.exit(0)
    }

    const schemaText: string = models.found.map((m: string) => readFileSync(`/${m}`, 'utf8')).join('\n')
    
    const pathForSchema: string = join(process.cwd(), paths.schema)
    const outputSchemaPath: string = `${pathForSchema}/generated.ts`

    const customResolvers: string = join(process.cwd(), paths.customResolvers)

    const generatedResolvers: string = join(process.cwd(), paths.generatedResolvers)

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, generation)
    const generated: IGraphQLBackend = await backend.createBackend(database)

    let generatedClient
    let clientPath: string

    if (client) {
      generatedClient = await backend.createClient()

        clientPath = join(process.cwd(), paths.client)
     
      if (!existsSync(clientPath)) {
        mkdirSync(clientPath, { recursive: true })
      }
    }
    if (!existsSync(`${pathForSchema}`)) {
      mkdirSync(`${pathForSchema}`, { recursive: true })
    }
    if (!existsSync(`${customResolvers}/custom`)) {
      mkdirSync(`${customResolvers}/custom`, { recursive: true })
    }
    if (!existsSync(`${generatedResolvers}/generated`)) {
      mkdirSync(`${generatedResolvers}/generated`, { recursive: true })
    }

    generated.resolvers.custom.forEach((output: OutputResolver) => {
      if (!existsSync(`${customResolvers}/custom/${output.name}.ts`) || output.name === 'index') {
        writeFileSync(`${customResolvers}/custom/${output.name}.ts`, output.output)
      }
    })

    writeFileSync(outputSchemaPath, generated.schema)
    writeFileSync(`${generatedResolvers}/index.ts`, generated.resolvers.index)

    const resolverFiles = readdirSync(`${generatedResolvers}/generated`)
    resolverFiles.forEach((file: string) => unlinkSync(`${generatedResolvers}/generated/${file}`))

    generated.resolvers.types.forEach((output: OutputResolver) => writeFileSync(`${generatedResolvers}/generated/${output.name}.ts`, output.output))

    if (client) {
      Object.keys(generatedClient).forEach((folder: string) => {
        const currentFolder = `${clientPath}/${folder}`
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
}

/**
 * exported generate handler
 */
export async function generate(cliName: string = "graphback"): Promise<void> {
  const pathForModel = checkDirectory()
  await generateBackend(pathForModel)
  postCommandMessage(cliName)
}