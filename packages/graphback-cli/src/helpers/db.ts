import * as execa from 'execa'
import { GlobSync } from 'glob'
import { migrate } from 'graphql-migrations';
import * as Knex from 'knex';
import { ConfigBuilder } from '../config/ConfigBuilder';
import { ProjectConfig } from '../config/ProjectConfig';
import { logError, logInfo } from '../utils'
import { checkDirectory } from './common'
import { loadSchema } from './loadSchema';

const handleError = (err: { code: string; message: string; }): void => {
  if (err.code === 'ECONNREFUSED') {
    logError('Database not running. Run docker-compose up -d or docker-compose start to start the database.')
  } else {
    logError(err.message)
  }
  process.exit(0)
}

export const createDBResources = async (config: ProjectConfig): Promise<any[]> => {
  let databaseOperations: any[];
  try {
    const { db: { database }, folders } = config;

    const models = new GlobSync(`${folders.model}/*.graphql`)

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`)
      process.exit(0)
    }

    if (database === 'sqlite3') {
      await execa('touch', ['db.sqlite'])
    }

    const dbConfig = {
      client: config.db.database,
      connection: config.db.dbConfig
    }

    const schemaText = loadSchema(folders.model);

    databaseOperations = await migrate(dbConfig, schemaText);
    
  } catch (err) {
    handleError(err)
  }

  return databaseOperations;
}

export const postCommandMessage = (message: string) => {
  logInfo(message);
}

export const createDB = async (): Promise<any[]> => {
  const configInstance = new ConfigBuilder();

  checkDirectory(configInstance)

  // tslint:disable-next-line: no-unnecessary-local-variable
  const operations = await createDBResources(configInstance.config)

  return operations
}
