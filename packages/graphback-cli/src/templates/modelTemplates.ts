import { readFileSync, writeFileSync } from 'fs';
import { prompt as ask } from 'inquirer'
import ora from 'ora'
import { GraphQLModel } from './templateMetadata'

const modelsPath = `${__dirname}/resources/models`

/**
 * Default model
 */
export const defaultModel: string = readFileSync(`${modelsPath}/Default.graphql`, 'utf8')

/**
 * Available example models
 */
export const allModels: GraphQLModel[] = [
  {
    name: 'Note',
    content: readFileSync(`${modelsPath}/Note.graphql`, 'utf8')
  },
  {
    name: 'Shop',
    content: readFileSync(`${modelsPath}/Shop.graphql`, 'utf8')
  },
  {
    name: 'Tasks',
    content: readFileSync(`${modelsPath}/Tasks.graphql`, 'utf8')
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
  const spinner = ora('Creating model').start()
  writeFileSync(path, content)
  spinner.succeed()
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