import chalk from 'chalk';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { GlobSync } from 'glob'
import { ClientImplementation, GraphQLBackendCreator, IGraphQLBackend, OutputResolver } from 'graphback'
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
export async function generateBackend(): Promise<void> {
  const configPath = `${process.cwd()}/.graphback`
  const { paths, database, generation, client } = JSON.parse(readFileSync(configPath, "utf8"))

  try {
    const models = new GlobSync(`${paths.model}/*.graphql`, { cwd: process.cwd() })

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')
    
    const outputSchemaPath: string = `${process.cwd()}${paths.schema}`
    const outputCustomResolverPath: string = `${process.cwd()}${paths.customResolvers}`
    const outputGeneratedResolverPath: string = `${process.cwd()}${paths.generatedResolvers}`

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, generation)

    const generated: IGraphQLBackend = await backend.createBackend(database)

    let generatedClient
    let clientPath: string
    if(client) {
      generatedClient = await backend.createClient()
      clientPath = `${process.cwd()}${paths.client}`
      if(!existsSync(clientPath)) {
        mkdirSync(`${clientPath}`, {recursive: true})
      }
    }

    if(!existsSync(`${outputCustomResolverPath}/custom/`)) {
      mkdirSync(`${outputCustomResolverPath}/custom`, {recursive: true})
    }

    if(!existsSync(`${outputSchemaPath}`)) {
      mkdirSync(`${outputSchemaPath}`, {recursive: true})
    }

    if(!existsSync(`${outputGeneratedResolverPath}/generated/`)) {
      mkdirSync(`${outputGeneratedResolverPath}/generated`, {recursive: true})
    }

    generated.resolvers.custom.forEach((output: OutputResolver) => {
      if(!existsSync(`${outputCustomResolverPath}/custom/${output.name}.ts`) || output.name === 'index') {
        writeFileSync(`${outputCustomResolverPath}/custom/${output.name}.ts`, output.output)
      }
    })

    const resolverFiles = readdirSync(`${outputGeneratedResolverPath}/generated`)
    resolverFiles.forEach((file: string) => unlinkSync(`${outputGeneratedResolverPath}/generated/${file}`))

    generated.resolvers.types.forEach((output: OutputResolver) => writeFileSync(`${outputGeneratedResolverPath}/generated/${output.name}.ts`, output.output))

    writeFileSync(`${outputSchemaPath}/generated.ts`, generated.schema)

    if (outputCustomResolverPath === outputGeneratedResolverPath){
    writeFileSync(`${outputCustomResolverPath}/index.ts`, generated.resolvers.index)
    } else {
    writeFileSync(`${outputGeneratedResolverPath}/index.ts`, generated.resolvers.index)
    }

    if(client) {
      Object.keys(generatedClient).forEach((folder: string) => {
        const currentFolder = `${clientPath}/${folder}`
        if(!existsSync(currentFolder)) {
          mkdirSync(currentFolder, {recursive: true})
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
  checkDirectory()
  await generateBackend()
  postCommandMessage(cliName)
}