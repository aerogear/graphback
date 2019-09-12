import chalk from 'chalk';
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync, exists } from 'fs';
import { GlobSync } from 'glob'
import { ClientImplementation, GraphQLBackendCreator, IGraphQLBackend, OutputResolver, IGraphbackModule } from 'graphback'
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
  try {
    const models = new GlobSync('model/*.graphql', { cwd: process.cwd() })

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }
    const configPath = `${process.cwd()}/config.json`

    const { database, generation, client } = JSON.parse(readFileSync(configPath, "utf8"))

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')

    const modulesPath: string = `${path}/src/modules`

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(models.found, generation)

    const generated: IGraphQLBackend = await backend.createBackend(database)

    let generatedClient
    let clientPath: string
    if (client) {
      generatedClient = await backend.createClient()
      clientPath = `${process.cwd()}/client`
      if (!existsSync(clientPath)) {
        mkdirSync(clientPath)
      }
    }

    generated.modules.forEach((m: IGraphbackModule) => {
      const modulePath = `${modulesPath}/${m.name.toLowerCase()}`;
      const resolverPath = `${modulePath}/resolvers`;

      if (!existsSync(modulePath)) {
        mkdirSync(modulePath, { recursive: true });
      }
      writeFileSync(`${modulePath}/${m.name}.ts`, m.schema);

      if (!existsSync(resolverPath)) {
        mkdirSync(resolverPath);
      }

      writeFileSync(`${resolverPath}/index.ts`, m.resolvers.index);

      if (!existsSync(`${resolverPath}/custom`)) {
        mkdirSync(`${resolverPath}/custom`)
      }

      if (!existsSync(`${resolverPath}/generated`)) {
        mkdirSync(`${resolverPath}/generated`)
      }

      m.resolvers.custom.forEach((output: OutputResolver) => {
        if (!existsSync(`${resolverPath}/custom/${output.name}.ts`) || output.name === 'index') {
          writeFileSync(`${resolverPath}/custom/${output.name}.ts`, output.output)
        }
      });

      const resolverFiles = readdirSync(`${resolverPath}/generated`)
      resolverFiles.forEach((file: string) => unlinkSync(`${resolverPath}/generated/${file}`))

      m.resolvers.types.forEach((output: OutputResolver) => writeFileSync(`${resolverPath}/generated/${output.name}.ts`, output.output))

      writeFileSync(`${modulePath}/index.ts`, m.index);
    });

    writeFileSync(`${modulesPath}/app.ts`, generated.appModule.index)

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
  checkDirectory()
  await generateBackend()
  postCommandMessage(cliName)
}
