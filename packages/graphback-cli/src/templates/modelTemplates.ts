import { writeFileSync } from 'fs';
import { prompt as ask } from 'inquirer'
import ora from 'ora'
import { Model } from './templateMetadata'

export const defaultModel: string = `# type Note {
#   id: ID!
#   title: String!
#   description: String!
#   ## Relationship
#   comment: [Comment]!

# }

# type Comment {
#   id: ID!
#   title: String!
#   description: String!
# }
`

export const allModels: Model[] = [
  {
    name: 'Note',
    content: `type Note {
  id: ID!
  title: String!
  description: String!
  ## Relationship
  comment: [Comment]!

}

type Comment {
  id: ID!
  title: String!
  description: String!
}
`
  },
  {
    name: 'Shop',
    content: `type Shop {
  id: ID!
  name: String!
  ## Relationship
  product: [Product!]!
}

type Customer {
  id: ID!
  name: String!
}

type Product {
  id: ID!
  name: String!
  quantity: Number!
}
`
  }
]

export function addModel(projectName: string, modelName: string, content: string): void {
  const path = `${process.cwd()}/${projectName}/model/${modelName}.graphql`
  const spinner = ora('Creating model').start()
  writeFileSync(path, content)
  spinner.succeed()
}

export async function createModel(): Promise<string[]> {
  const { includeModel } = await ask([
    {
      type: 'confirm',
      name: 'includeModel',
      message: 'Do you want to include a example model?'
    }
  ])

  if(includeModel) {
    const { modelName } = await ask([
      {
        type: 'list',
        name: 'modelName',
        message: 'Choose one of the example models',
        choices: allModels.map((m: Model) => m.name)
      }
    ])

    const content = allModels.find((m: Model) => m.name===modelName).content
    
    return [modelName, content]
  }
  const defaultName = 'Model'

  return [defaultName , defaultModel]
}