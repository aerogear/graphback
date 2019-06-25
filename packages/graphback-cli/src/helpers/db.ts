import { readFileSync } from 'fs'
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, PostgresSchemaManager } from 'graphback';
import { logError, logInfo } from '../utils'
import { checkDirectory } from './common'

export const createDBResources = async(): Promise<void> => {
  try{
    const models = new GlobSync('model/*.graphql', { cwd: process.cwd()})
    
    if(models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')
    const { dbConfig } = JSON.parse(readFileSync(`${path}/config.json`, 'utf8'))

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText)
    
    const manager = new PostgresSchemaManager(dbConfig);
    backend.registerDataResourcesManager(manager);

    await backend.createDatabase()

  } catch(err) {
    logError(err.message)
  }
}

export const createDB = async(): Promise<void> => {
  checkDirectory()
  await createDBResources()
  logInfo("Database Created")
}