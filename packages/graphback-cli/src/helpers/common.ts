import { existsSync } from 'fs'
import { ConfigBuilder } from '../config/ConfigBuilder';
import { logError } from '../utils'

export const checkDirectory = (configInstance: ConfigBuilder) => {
  if (configInstance.isValid()) {
    if (existsSync(configInstance.config.folders.model)) {
      return;
    }
  }

  logError(`Model not found, make sure you are in root directory of your project and that you have
    specified the correct path to your .graphql file`)
  process.exit(0)
}