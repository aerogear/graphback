import { existsSync } from 'fs'
import { configInstance } from '../config/ConfigBuilder';
import { logError } from '../utils'


export const checkDirectory = () => {

  if (configInstance.isValid()) {
    if (existsSync(configInstance.config.files.model)) {
      return;
    }
  }

  logError(`Model not found, make sure you are in root directory of your project and that you have
    specified the correct path to your .graphql file`)
  process.exit(0)
}