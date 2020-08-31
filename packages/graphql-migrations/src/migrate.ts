import { buildSchema, GraphQLSchema } from 'graphql'
import * as Knex from 'knex';
import { generateAbstractDatabase, ScalarMap } from './abstract/generateAbstractDatabase'
import { read } from './connector/read'
import { write } from './connector/write'
import { computeDiff } from './diff/computeDiff'
import { MigrationResults } from './diff/Operation'
import { MigrateOperationFilter } from './plugin/MigrateOperationFilter';
import { MigratePlugin } from './plugin/MigratePlugin'

export interface MigrateOptions {
  /**
   * Table schema: `<schemaName>.<tableName>`.
   */
  dbSchemaName?: string
  /**
   * Table name prefix: `<prefix><tableName>`.
   */
  dbTablePrefix?: string
  /**
   * Column name prefix: `<prefix><columnName>`.
   */
  dbColumnPrefix?: string
  /**
   * Overwrite table and column comments (not supported in some databases).
   */
  updateComments?: boolean
  /**
   * Custom Scalar mapping
   */
  scalarMap?: ScalarMap | undefined
  /**
   * Map scalar/enum lists to json column type by default.
   */
  mapListToJson?: boolean
  /**
   * List of graphql-migrations plugins
   */
  plugins?: MigratePlugin[],
  /**
   * Display debug information
   */
  debug?: boolean
  /**
   * Remove directives from the GraphQLSchema
   */
  removeDirectivesFromSchema?: boolean

  /**
   * Method that can be used to filter out operations that we do not want to execute.
   * For example if we want to prevent deletion of the tables filter can remove `table.drop` operations
   * from array
   */
  operationFilter?: MigrateOperationFilter
}

export const defaultOptions: MigrateOptions = {
  dbSchemaName: 'public',
  dbTablePrefix: '',
  dbColumnPrefix: '',
  updateComments: false,
  scalarMap: undefined,
  mapListToJson: true,
  plugins: [],
  debug: false,
  removeDirectivesFromSchema: true,
}

export async function migrateDB(
  config: Knex.Config,
  schema: GraphQLSchema | string,
  options: MigrateOptions = {},
): Promise<MigrationResults> {
  //Default options
  const finalOptions = {
    ...defaultOptions,
    ...options
  }

  if (config.client === 'sqlite3') {
    finalOptions.dbSchemaName = '';
  }

  if (finalOptions.debug) {
    config = {
      ...config,
      debug: true,
    }
  }

  //Read current
  const existingAdb = await read(
    config,
    finalOptions.dbSchemaName,
    finalOptions.dbTablePrefix,
    finalOptions.dbColumnPrefix,
  )

  let finalSchema: GraphQLSchema;
  if (typeof schema === "string") {
    finalSchema = buildSchema(schema);
  } else {
    finalSchema = schema
  }

  //Generate new
  const newAdb = await generateAbstractDatabase(finalSchema, {
    scalarMap: finalOptions.scalarMap,
    mapListToJson: finalOptions.mapListToJson
  })

  if (finalOptions.debug) {
    // eslint-disable-next-line no-console
    console.log('BEFORE', JSON.stringify(existingAdb.tables, undefined, 2))
    // eslint-disable-next-line no-console
    console.log('AFTER', JSON.stringify(newAdb.tables, undefined, 2))
  }

  //Diff
  let ops = await computeDiff(existingAdb, newAdb, {
    updateComments: finalOptions.updateComments,
  })

  if (finalOptions.operationFilter) {
    ops = finalOptions.operationFilter.filter(ops);
  }

  if (finalOptions.debug) {
    // eslint-disable-next-line no-console
    console.log('OPERATIONS', ops)
  }

  //Write back to DB
  await write(
    ops,
    config,
    finalOptions.dbSchemaName,
    finalOptions.dbTablePrefix,
    finalOptions.dbColumnPrefix,
    finalOptions.plugins,
  )

  return { results: ops, previousDB: existingAdb, newDB: newAdb }
}
