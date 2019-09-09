import { accessSync, readFileSync } from 'fs'
import { logError } from '../utils'


export const checkDirectory = (): string => {

  const configPath = `${process.cwd()}/config.json`

  const { paths } = JSON.parse(readFileSync(configPath, "utf8"))

  try {
    accessSync(`${process.cwd()}/${paths.model}`)

    return `${process.cwd()}/${paths.model}`;
  } catch (err) {
    logError(`model directory not found. Make you sure you are in the root of your project.`)
    process.exit(0)

    return " "
  }
}