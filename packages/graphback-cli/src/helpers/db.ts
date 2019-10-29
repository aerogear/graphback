import * as execa from 'execa'
import { unlinkSync } from 'fs'
import { GlobSync } from 'glob'
import { DatabaseInitializationStrategy, DatabaseSchemaManager, GraphQLBackendCreator, InputModelProvider } from 'graphback';
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

export const createDBResources = async (configInstance: ConfigBuilder, initializationStrategy: DatabaseInitializationStrategy): Promise<void> => {
  try {
    const { db: { database }, graphqlCRUD, folders } = configInstance.config

    const models = new GlobSync(`${folders.model}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    if (database === 'sqlite3') {
      await execa('touch', ['db.sqlite'])
    }

    const schemaContext = new InputModelProvider(folders.migrations, folders.model)
    const backend: GraphQLBackendCreator = new GraphQLBackendCreator(schemaContext, graphqlCRUD)

    await backend.initializeDatabase(initializationStrategy);

  } catch (err) {
    handleError(err)
  }
}

export const postCommandMessage = (message: string) => {
  logInfo(message);
}

export const createDB = async (initializationStrategy: DatabaseInitializationStrategy): Promise<void> => {
  const configInstance = new ConfigBuilder();
  checkDirectory(configInstance)

  await createDBResources(configInstance, initializationStrategy)
}
