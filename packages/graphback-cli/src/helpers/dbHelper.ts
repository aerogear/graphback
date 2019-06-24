import * as execa from 'execa'
import { accessSync, readFileSync } from 'fs'
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, KnexResolverManager, PostgresSchemaManager } from 'graphback';
import { logError, logInfo } from '../utils'

const dockerComposeUp = async(): Promise<void> => {
  await execa('docker-compose', ['up', '-d']).stdout.pipe(process.stdout)
}

export const createResources = async(): Promise<void> => {
  try{
    accessSync(`${process.cwd()}/model`)
    const models = new GlobSync('model/*.graphql', { cwd: process.cwd()})
    
    if(models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    const path: string = `${process.cwd()}`
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')
    const { dbConfig } = JSON.parse(readFileSync(`${path}/config.json`, 'utf8'))

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText)
    
    const manager = new PostgresSchemaManager(dbConfig);
    backend.registerDataResourcesManager(manager);

    await backend.createDatabase()

  } catch(err) {
    // tslint:disable-next-line: no-console
    console.log(err)
    // logError(`model directory not found. Make you sure you are in the root of your project.`)
  }
}

export const createDB = async(): Promise<void> => {
  // await dockerComposeUp()
  await createResources()
  logInfo("Database Created")
}