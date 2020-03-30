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
    await execa('npm', ['i', '-S', '@graphback/runtime-knex'])
  } else if (database === 'MongoDB') {
    await execa('npm', ['i', '-S', 'mongodb'])
    await execa('npm', ['i', '-S', '@graphback/runtime-mongo'])
  }
}

function postSetupMessage(): string {
  return `
Graphback configuration successfully bootstrapped :rocket:

Next Steps:
1. Review your configuration in your ${chalk.green('.graphqlrc')} file
2. Edit the ${chalk.green('*.graphql')} files inside your model folder
3. Run ${chalk.cyan('graphback generate')} to generate your schema and resolvers
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

  const model = options.model || await createModel()
  const database = options.database || await chooseDatabase()
  const client = options.client || await askForClient()
  if (model) {
    addModel("", model.modelName, model.content)
  }
  if (!options.skipInstall) {
    await installDependencies(database)
  }
  if (!options.skipConfig) {
    await createConfig(database, client)
  }
  logInfo(postSetupMessage())
}
