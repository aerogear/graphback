import * as execa from 'execa'
import { accessSync, mkdirSync } from 'fs'
import { prompt as ask } from 'inquirer'
import ora from 'ora'
import * as yargs from 'yargs'
import { extractTemplate } from '../helpers/extractTemplate'
import { allTemplates, Template } from '../helpers/template'
import { logError, logInfo } from '../utils'

type Params = { name?: string }


async function installDependencies(name: string): Promise<void> {
  process.chdir(name)
  const spinner = ora('Installing dependencies').start()
  await execa('npm', ['i'])
  spinner.succeed()
}

async function makeDirectory(path: string, name: string): Promise<void> {
  try {
    accessSync(path)
    logError(`A folder with name ${name} exists. Remove it or try another name.`)
    process.exit(0)
  } catch (error) {
    mkdirSync(path)
  }
}

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

export const command = 'init <name>'

export const desc = 'Create project'

export const builder = (yargs: yargs.Arguments) => {
  yargs.positional('name', {
    describe: 'Project name',
    type: 'string'
  })
}

export async function handler({ name }: Params) {
  const path = `${process.cwd()}/${name}`
  await makeDirectory(path, name)
  logInfo(`Bootstraping graphql server :dizzy: :sparkles:`)
  const template = await chooseTemplate()
  await extractTemplate(template, name)
  await installDependencies(name)
  logInfo('GraphQL server successfully bootstrapped :rocket:')
}