import * as execa from 'execa'
import { lstatSync, readdirSync } from 'fs'
import { prompt as ask } from 'inquirer'
import { ncp } from 'ncp'
import { join } from 'path'
import { promisify } from 'util'
import * as yargs from 'yargs'
import { logInfo } from '../utils'

const copyAsync = promisify(ncp)

type Params = { name?: string }

function getTemplateDir(): string {
  return `${__dirname.split('packages')[0]}templates`
}

const isDirectory = (dir: string) => lstatSync(dir).isDirectory()

function getDirectories(templateDir: string): string[] {  
  return readdirSync(templateDir).filter((name: string) => isDirectory(join(templateDir, name)))
}

async function chooseTemplate(): Promise<string> {
  const { templateName } = await ask([
    {
      type: 'list',
      name: 'templateName',
      message: 'Choose a template to bootstrap',
      choices: getDirectories(getTemplateDir())
    }
  ])

  return templateName
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
  const templateName = await chooseTemplate()
  const templateDir = getTemplateDir()
  logInfo(`Bootstraping graphql server :dizzy: :sparkles:`)
  await copyAsync(`${templateDir}/${templateName}`, `${process.cwd()}/${name}`)
  await execa.shell(`cd ${name}`)
  logInfo(`Installing dependencies...`)
  await execa.shell(`npm i`)
  logInfo('GraphQL server successfully bootstrapped :rocket:')
}