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
export async function generateBackend(pathProvided: string): Promise<void> {
  try {
    const configPath = `${process.cwd()}/config.json`

    const { paths, database, generation, client } = JSON.parse(readFileSync(configPath, "utf8"))

    console.log(pathProvided)

    const models = new GlobSync(`${pathProvided}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${pathProvided} folder.`)
      process.exit(0)
    }

    const schemaText: string = models.found.map((m: string) => readFileSync(`/${m}`, 'utf8')).join('\n')

    let pathForSchema: string

    if (paths.schema === "/src/schema") {
      pathForSchema = `${process.cwd()}${paths.schema}`
    } else {
      pathForSchema = `${paths.schema}`
    }
    const outputSchemaPath: string = `${pathForSchema}/generated.ts`

    let customResolversPath
    let generatedResolversPath

    if (paths.customResolvers === "/src/resolvers") {
      customResolversPath = `${process.cwd()}/src/resolvers`
    } else {
      customResolversPath = paths.customResolvers
    }

    const customResolvers: string = customResolversPath

    if (paths.generatedResolvers === "/src/resolvers") {
      generatedResolversPath = `${process.cwd()}/src/resolvers`
    } else {
      generatedResolversPath = paths.generatedResolvers
    }
    const generatedResolvers: string = generatedResolversPath

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, generation)
    const generated: IGraphQLBackend = await backend.createBackend(database)

    let generatedClient
    let clientPath: string

    if (client) {
      generatedClient = await backend.createClient()
      if (paths.client === "/client") {
        clientPath = `${process.cwd()}/client`
      } else {
        clientPath = paths.client
      }
      if (!existsSync(clientPath)) {
        mkdirSync(clientPath)
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
  const path = checkDirectory()
  await generateBackend(path)
  postCommandMessage(cliName)
}