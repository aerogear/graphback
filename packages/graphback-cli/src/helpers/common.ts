import { accessSync } from 'fs'
import { logError } from '../utils'


export const checkDirectory = (): void => {
  try{
    accessSync(`${process.cwd()}/model`)
  } catch(err) {
    logError(`model directory not found. Make you sure you are in the root of your project.`)
    process.exit(0)
  }
}