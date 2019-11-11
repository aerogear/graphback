import { writeFileSync } from 'fs';
import { prompt as ask } from 'inquirer'
import { logInfo } from '../utils'
import { GraphQLModel } from './templateMetadata'

/**
 * Default model
 */
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
/**
 * Available example models
 */
export const allModels: GraphQLModel[] = [
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
  quantity: Int!
}
`
  }
]

/**
 * Create model inside the project/model
 * @param projectName name of project folder
 * @param modelName Name of graphql file
 * @param content Content of the graphql file
 */
export function addModel(projectName: string, modelName: string, content: string): void {
  const path = `${process.cwd()}/${projectName}/model/${modelName}.graphql`
  logInfo('Creating model')
  writeFileSync(path, content)
}

/**
 * Ask user to include model or not
 */
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
        choices: allModels.map((m: GraphQLModel) => m.name)
      }
    ])

    const content = allModels.find((m: GraphQLModel) => m.name===modelName).content
    
    return [modelName, content]
  }
  const defaultName = 'Default'

  return [defaultName , defaultModel]
}