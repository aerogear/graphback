import * as execa from 'execa'
import { GlobSync } from 'glob'
import { loadConfig } from 'graphql-config';
import { migrateDB, MigrateOptions, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { graphbackExtension, graphbackConfigExtension } from '../config/graphbackExtension';
import { dbmigrationsExtension, dbMigrationConfigExtension } from '../config/dbmigrationsExtension';
import { logError, logInfo } from '../utils'
import { loadSchema } from './loadSchema';

const handleError = (err: { code: string; message: string; }): void => {
  if (err.code === 'ECONNREFUSED') {
    logError('Database not running. Run docker-compose up -d or docker-compose start to start the database.')
  } else {
    logError(err.message)
  }
  process.exit(0)
};

export const createDBResources = async (cliFlags: { project?: string }): Promise<any> => {
  let databaseOperations: any;
  try {
    const config = await loadConfig({
      rootDir: process.cwd(),
      extensions: [graphbackConfigExtension, dbMigrationConfigExtension]
    });
    const project = config.getProject(cliFlags.project || 'default');
    const graphbackConfig = project.extension(graphbackExtension);
    const dbMigrationConfig = project.extension(dbmigrationsExtension);

    if (!graphbackConfig) {
      throw new Error(`You should provide a valid '${graphbackExtension}' config to generate schema from data model`);
    }

    if (!dbMigrationConfig) {
      throw new Error(`You should provide a valid '${dbmigrationsExtension}' config to migrate schema`);
    }

    if (!graphbackConfig.model) {
      throw new Error(`'${graphbackExtension}' config missing 'model' value that is required`);
    }

    const models = new GlobSync(`${graphbackConfig.model}/*.graphql`);

    if (models.found.length === 0) {
      logError(`No graphql file found inside ${process.cwd()}/model folder.`);
      process.exit(0)
    }

    // if (!graphbackConfig.dbmigrations) {
    //   throw new Error(`'${graphbackExtension}' config missing 'dbmigrations' section that that is required. Please check example application for more information`);
    // }

    if (dbMigrationConfig.client === 'sqlite3') {
      logInfo(`SQLLite database will need to be recreated from scratch with every migration. Please manually remove/backup existing SQLLite database file before migration`);
      await execa('touch', [dbMigrationConfig.connection.filename])
    }

    const migrateOptions: MigrateOptions = {
      //Do not perform delete operations on tables
      operationFilter: removeNonSafeOperationsFilter
    };

    const schemaText = loadSchema(project.schema.toString());
    databaseOperations = await migrateDB(dbMigrationConfig, schemaText, migrateOptions);
  } catch (err) {
    handleError(err)
  }

  return databaseOperations;
};


export const createDB = async (): Promise<any> => {
  return createDBResources({})
};
