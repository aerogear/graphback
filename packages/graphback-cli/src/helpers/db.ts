import chalk from 'chalk';
import * as execa from 'execa'
import { readFileSync, unlinkSync } from 'fs'
import { GlobSync } from 'glob'
import { DatabaseSchemaManager, GraphQLBackendCreator } from 'graphback';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { logError, logInfo } from '../utils'
import { checkDirectory } from './common'


const handleError = (err: { code: string; message: string; }): void => {
  if (err.code === 'ECONNREFUSED') {
    logError('Database not running. Run docker-compose up -d or docker-compose start to start the database.')
  } else {
    logError(err.message)
  }
  process.exit(0)
}

export const dropDBResources = async (configInstance: ConfigBuilder): Promise<void> => {
  try {
    const { database, dbConfig } = configInstance.config.db
    if (database === 'sqlite3') {
      const sqliteFile = new GlobSync('*.sqlite', { cwd: process.cwd() })
      if (sqliteFile.found.length) {
        unlinkSync(`${process.cwd()}/${sqliteFile.found[0]}`)
      }
    } else {
      const manager = new DatabaseSchemaManager(database, dbConfig);

      await manager.getConnection().raw('DROP SCHEMA public CASCADE;')
      // tslint:disable-next-line: await-promise
      await manager.getConnection().raw('CREATE SCHEMA public;')
    }
  } catch (err) {
    handleError(err)
  }
}

export const createDBResources = async (configInstance: ConfigBuilder): Promise<void> => {
  try {
    const { db: { database, dbConfig }, graphqlCRUD, folders } = configInstance.config

    const models = new GlobSync(`${folders.model}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    if (database === 'sqlite3') {
      await execa('touch', ['db.sqlite'])
    }

    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(folders.model, graphqlCRUD)

    const manager = new DatabaseSchemaManager(database, dbConfig);

    backend.registerDataResourcesManager(manager);

    await backend.migrateDatabase(`${process.cwd()}/migrations`)

  } catch (err) {
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
  const configInstance = new ConfigBuilder();
  checkDirectory(configInstance)
  // await dropDBResources(configInstance)
  await createDBResources(configInstance)
  postCommandMessage()
}
