import * as yargs from 'yargs'
import { init } from '../utils/initHelper'

type Params = { name?: string, templateName?: string }

export const command = 'init <name> [templateName]'

export const desc = 'Create project'

export const builder = (args: yargs.Arguments) => {
  args.positional('name', {
    describe: 'Project name',
    type: 'string',
  })
  args.positional('templateName', {
    describe: 'Name of the template',
    type: 'string'
  })
}

export async function handler({ name, templateName }: Params) {
  await init(name, templateName)
}