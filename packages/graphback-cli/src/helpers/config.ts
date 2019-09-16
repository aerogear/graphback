import chalk from 'chalk';
import * as figlet from 'figlet'
import { askForClient, chooseDatabase, createConfig } from '../templates/configTemplates'
import { addModel, createModel } from '../templates/modelTemplates';
import { logInfo } from '../utils';

function postSetupMessage(commandRoot: string): string {
  return `
Graphback configuration successfully bootstrapped :rocket:

Next Steps:
1. Review your configuration in "graphback.json" file
2. Edit the .graphql file inside ${chalk.cyan(`model`)} with your GraphQL types.
3. Run ${chalk.cyan(`${commandRoot}generate`)} to generate schema and resolvers
`
}


/**
 * init command handler
 * @param name name of project folder
 * @param templateName name of the template provided(if any)
 * @param templateUrl github url to the template
 */
export async function initConfig(commandRoot?: string) {
  logInfo(chalk.yellow(
    figlet.textSync('Graphback', { horizontalLayout: 'full' })
  ))

  const [modelName, content] = await createModel()
  const database = await chooseDatabase()
  const client = await askForClient()
  addModel("", modelName, content)
  await createConfig(database, client)
  logInfo(postSetupMessage(commandRoot))
}