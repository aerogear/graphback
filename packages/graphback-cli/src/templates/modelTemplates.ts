import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { prompt as ask } from 'inquirer'
import { logInfo } from '../utils'

export interface GraphQLModel {
  name: string
  content: string
}

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
  const path = resolve(projectName, "model");
  const filePath = resolve(path, `${modelName}.graphql`)
  if (!existsSync(path)) {
    mkdirSync(path)
  }
  logInfo(`Creating model in ${filePath}`)
  writeFileSync(filePath, content)
}

export interface ModelTemplate {
  modelName: string,
  content: string
}

/**
 * Ask user to include model or not
 */
export async function createModel(): Promise<ModelTemplate | undefined> {
  const { includeModel } = await ask([
    {
      type: 'confirm',
      name: 'includeModel',
      message: 'Do you want to include an example model?'
    }
  ])

  if (includeModel) {
    const { modelName } = await ask([
      {
        type: 'list',
        name: 'modelName',
        message: 'Choose one of the example models',
        choices: allModels.map((m: GraphQLModel) => m.name)
      }
    ])

    const content = allModels.find((m: GraphQLModel) => m.name === modelName).content

    return { modelName, content }
  }

  return undefined
}