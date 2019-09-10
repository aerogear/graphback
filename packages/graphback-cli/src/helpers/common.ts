import { accessSync, readFileSync } from 'fs'
import { join } from 'path'
import { logError } from '../utils'


export const checkDirectory = (): string => {

  let pathForModel

  try {

    const configPath = `${process.cwd()}/graphback.json`

    const { paths } = JSON.parse(readFileSync(configPath, "utf8"))
  
    pathForModel = join(process.cwd(), paths.model)

    accessSync(`${pathForModel}`)

  } catch (err) {
    logError(`Model not found, make sure you are in root directory of your project and that you have
    specified the correct path to your .graphql file`)
    process.exit(0)
  }

  return pathForModel
}
