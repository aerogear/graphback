import { init } from '../helpers/initHelper'

type Params = { name?: string, templateName?: string }

export const command = 'init <name> [templateName]'

export const desc = 'Create project'

// tslint:disable-next-line: typedef
export const builder = (args) => {
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