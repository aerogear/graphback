import chalk from 'chalk';
import * as execa from 'execa'
import * as figlet from 'figlet'
import { askForClient, chooseDatabase, createConfig } from '../templates/configTemplates'
import { addModel, createModel, ModelTemplate } from '../templates/modelTemplates';
import { logInfo } from '../utils';

/**
 * Install dependencies, currently only npm
 */
export async function installDependencies(database: string): Promise<void> {
  logInfo('Installing dependencies')
  await execa('npm', ['i'])
  if (database === 'pg') {
    await execa('npm', ['i', '-S', 'pg'])
  } else if (database === 'sqlite3') {
    await execa('npm', ['i', '-S', 'sqlite3'])
  }
  //Using opiniated layer
  await execa('npm', ['i', '-S', '@graphback/runtime-knex'])
}

function postSetupMessage(): string {
  return `
Graphback configuration successfully bootstrapped :rocket:

Next Steps:
1. Review your configuration in "graphqlrc.yaml" file
2. Edit the *.graphql files inside your model folder.
3. Run  generate command to generate your schema and resolvers
`
}

/**
 * initConfig options
 */
export interface InitOptions {
  client?: boolean,
  //Type of database
  database?: string
  //example model
  model?: ModelTemplate
  //skip install
  skipInstall?: boolean
  // Skip config generation
  skipConfig?: boolean
}

/**
 * config command handler
 * @param options used for initializting config without asking user for input
 */
export async function initConfig(options: InitOptions = {}) {
  logInfo(chalk.yellow(
    figlet.textSync('Graphback', { horizontalLayout: 'full' })
  ));

  const { modelName, content } = options.model || await createModel()
  const database = options.database || await chooseDatabase()
  const client = options.client || await askForClient()
  addModel("", modelName, content)
  if (!options.skipInstall) {
    await installDependencies(database)
  }
  if (!options.skipConfig) {
    await createConfig(database, client)
  }
  logInfo(postSetupMessage())
}
