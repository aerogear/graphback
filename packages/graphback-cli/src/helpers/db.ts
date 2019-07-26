import chalk from 'chalk';
import { readFileSync } from 'fs'
import { GlobSync } from 'glob'
import { GraphQLBackendCreator, PostgresSchemaManager } from 'graphback';
import { logError, logInfo } from '../utils'
import { checkDirectory } from './common'

const handleError = (err: { code: string; message: string; }): void => {
  if(err.code === 'ECONNREFUSED') {
    logError('Database not running. Run docker-compose up -d or docker-compose start to start the database.')
  } else {
    logError(err.message)
  }
  process.exit(0)
}

export const dropDBResources = async(): Promise<void> => {
  try {
    const { dbConfig } = JSON.parse(readFileSync(`${process.cwd()}/config.json`, 'utf8'))
    const manager = new PostgresSchemaManager(dbConfig);
    // tslint:disable-next-line: await-promise
    await manager.getConnection().raw('DROP SCHEMA public CASCADE;')
    // tslint:disable-next-line: await-promise
    await manager.getConnection().raw('CREATE SCHEMA public;')
  } catch (err) {
    handleError(err)
  }
}

export const createDBResources = async(): Promise<void> => {
  try{
    const models = new GlobSync('model/*.graphql', { cwd: process.cwd()})
    
    if(models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    const configPath = `${process.cwd()}/config.json`

    const file = readFileSync(configPath, "utf8");
    let genConfig = {};
    if (file) {
      genConfig = JSON.parse(file).generation
    }

    const path: string = process.cwd()
    const schemaText: string = models.found.map((m: string) => readFileSync(`${path}/${m}`, 'utf8')).join('\n')
    const { dbConfig } = JSON.parse(readFileSync(`${path}/config.json`, 'utf8'))

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, genConfig)
    
    const manager = new PostgresSchemaManager(dbConfig);
    backend.registerDataResourcesManager(manager);
    
    await backend.createDatabase()
    
  } catch(err) {
    handleError(err)
  }
}

const postCommandMessage = () => {
  logInfo(`
Database resources created.
Run ${chalk.cyan(`graphback watch`)} to start the server and watch for changes.
  `)
}

export const createDB = async(): Promise<void> => {
  checkDirectory()
  await dropDBResources()
  await createDBResources()
  postCommandMessage()
  process.exit(0)
}