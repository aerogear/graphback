import chalk from 'chalk';
import * as execa from 'execa'
import * as figlet from 'figlet'
import { accessSync, mkdirSync, writeFileSync } from 'fs'
import { prompt as ask } from 'inquirer'
import ora from 'ora'
import { chooseDatabase, createConfig } from '../templates/configTemplates'
import { addModel, createModel } from '../templates/modelTemplates';
import { allTemplates, extractTemplate } from '../templates/starterTemplates'
import { Template } from '../templates/templateMetadata'
import { logError, logInfo } from '../utils'

/**
 * Install dependencies, currently only npm
 * @param name project folder name
 */
async function installDependencies(name: string, database: string): Promise<void> {
  process.chdir(name)
  const spinner = ora('Installing dependencies').start()
  await execa('npm', ['i'])
  if (database === 'pg') {
    await execa('npm', ['i', '-S', 'pg'])
  } else if (database === 'sqlite3') {
    await execa('npm', ['i', '-S', 'sqlite3'])
  }
  spinner.succeed()
}

/**
 * Check if directory exists
 * @param path path of the directory
 * @param name name of the project folder
 */
function checkDirectory(path: string, name: string): void {
  try {
    accessSync(path)
    logError(`A folder with name ${name} exists. Remove it or try another name.`)
    process.exit(0)
  } catch (error) {
    return
  }
}

/**
 * choose a template from available templates
 */
async function chooseTemplate(): Promise<Template> {
  const { templateName } = await ask([
    {
      type: 'list',
      name: 'templateName',
      message: 'Choose a template to bootstrap',
      choices: allTemplates.map((t: Template) => t.name)
    }
  ])

  return allTemplates.find((t: Template) => t.name === templateName)
}

/**
 * check if template name is valid or not
 * @param templateName name of the template provided
 */
function checkTemplateName(templateName: string): void {
  const availableTemplates = allTemplates.map((t: Template) => t.name)
  if (availableTemplates.includes(templateName)) {
    return
  }
  logError("Template with given name doesn't exist. Give one of available ones or simply choose by not providing a template name")
  process.exit(0)
}

/**
 * assign template details from the given input or choice
 * @param templateName name of the template provided(if any)
 */
async function assignTemplate(templateName: string): Promise<Template> {
  let template
  if (templateName) {
    checkTemplateName(templateName)
    template = allTemplates.find((t: Template) => t.name === templateName)
  } else {
    template = await chooseTemplate()
  }

  return template
}

function postSetupMessage(name: string): string {
  return `
GraphQL server successfully bootstrapped :rocket:
Next Steps:
1. Change directory into project folder - ${chalk.cyan(`cd ${name}`)}
2. Edit the .graphql file inside ${chalk.cyan(`model`)} with your GraphQL types.
3. Run ${chalk.cyan(`graphback generate`)} to generate schema and resolvers
4. Run ${chalk.cyan(`docker-compose up -d`)} to run your database
   and ${chalk.cyan(`graphback db`)} to create database resources in postgres
5. Run ${chalk.cyan(`graphback watch`)} to start the server and watch for changes
   in model.
`
}

/**
 * Build template from user provided url
 */
function buildTemplateFromGithub(templateUrl: string) {
  const url = templateUrl.split("#")
  
  return {
    name: "Users Github template",
    description: "User provided template",
    repo: {
      uri: url[0],
      branch: url[1] || "master",
      path: "/template"
    }
  };
}

/**
 * init command handler
 * @param name name of project folder
 * @param templateName name of the template provided(if any)
 * @param templateUrl github url to the template
 */
export async function init(name: string, templateName?: string, templateUrl?: string) {
  logInfo(chalk.yellow(
    figlet.textSync('Graphback', { horizontalLayout: 'full' })
  ))
  const path: string = `${process.cwd()}/${name}`
  checkDirectory(path, name)
  let template: Template;
  if (templateUrl) {
    template = buildTemplateFromGithub(templateUrl);
  } else {
    template = await assignTemplate(templateName)
  }

  const [modelName, content] = await createModel()
  const database = await chooseDatabase()
  mkdirSync(path)
  logInfo(`
Bootstraping graphql server :dizzy: :sparkles:`)
  await extractTemplate(template, name)
  addModel(name, modelName, content)
  await Promise.all([installDependencies(name, database), createConfig(database)])
  logInfo(postSetupMessage(name))
}