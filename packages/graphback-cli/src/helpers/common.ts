import { accessSync, readFileSync } from 'fs'
import { logError } from '../utils'


export const checkDirectory = (): void => {
  const configPath = `${process.cwd()}/.graphback`
  const { paths } = JSON.parse(readFileSync(configPath, "utf8"))

  try {
    accessSync(`${paths.model}`)
  } catch (err) {
    logError(`model directory not found. Make you sure you are in the root of your project.`)
    process.exit(0)
  }
}