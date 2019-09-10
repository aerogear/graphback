import chalk from 'chalk';
import * as execa from 'execa'
import { readFileSync, unlinkSync } from 'fs'
import { GlobSync } from 'glob'
import { DatabaseSchemaManager, GraphQLBackendCreator } from 'graphback';
import { logError, logInfo } from '../utils'
import { checkDirectory } from './common'

const configPath = `${process.cwd()}/graphback.json`

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
    const { database, dbConfig } = JSON.parse(readFileSync(configPath, 'utf8'))
    if(database === 'sqlite3') {
      const sqliteFile = new GlobSync('*.sqlite', { cwd: process.cwd() })
      if(sqliteFile.found.length) {
        unlinkSync(`${process.cwd()}/${sqliteFile.found[0]}`)
      }
    } else {
      const manager = new DatabaseSchemaManager(database, dbConfig);
      // tslint:disable-next-line: await-promise
      await manager.getConnection().raw('DROP SCHEMA public CASCADE;')
      // tslint:disable-next-line: await-promise
      await manager.getConnection().raw('CREATE SCHEMA public;')
    }
  } catch (err) {
    handleError(err)
  }
}

export const createDBResources = async (pathForModel: string): Promise<void> => {
  try {
    const { database, dbConfig, generation } = JSON.parse(readFileSync(configPath, "utf8"))

    const models = new GlobSync(`${pathForModel}/*.graphql`)

    if(models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    if(database === 'sqlite3') {
      await execa('touch', ['db.sqlite'])
    }

    const schemaText: string = models.found.map((m: string) => readFileSync(`/${m}`, 'utf8')).join('\n')

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaText, generation)

    const manager = new DatabaseSchemaManager(database, dbConfig);
    backend.registerDataResourcesManager(manager);

    await backend.createDatabase()

  } catch(err) {
    handleError(err)
  }
}

const postCommandMessage = () => {
  logInfo(`
Database resources created.

Run ${chalk.cyan(`npm run develop`)} to start the server.
  `)
}

export const createDB = async (): Promise<void> => {
  const pathForModel = checkDirectory()
  await dropDBResources()
  await createDBResources(pathForModel)
  postCommandMessage()
  process.exit(0)
}
