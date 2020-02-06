import { DatabaseNameTransform, defaultColumnNameTransform, defaultTableNameTransform } from '@graphback/core';
import { buildSchema, GraphQLSchema } from 'graphql'
import * as Knex from 'knex';
import { generateAbstractDatabase, ScalarMap } from './abstract/generateAbstractDatabase'
import { read } from './connector/read'
import { write } from './connector/write'
import { computeDiff } from './diff/computeDiff'
import { MigrationResults } from './diff/Operation'
import { MigrateOperationFilter } from './plugin/MigrateOperationFilter';
import { MigratePlugin } from './plugin/MigratePlugin'
import { removeDirectivesFromSchema } from './util/removeDirectivesFromSchema';

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
   * Transform the table names.
   */
  transformTableName?: DatabaseNameTransform | null
  /**
   * Transform the column names.
   */
  transformColumnName?: DatabaseNameTransform | null
  /**
   * Custom Scalar mapping
   */
  scalarMap?: ScalarMap | null
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
  transformTableName: defaultTableNameTransform,
  transformColumnName: defaultColumnNameTransform,
  scalarMap: null,
  mapListToJson: true,
  plugins: [],
  debug: false,
  removeDirectivesFromSchema: true
}

export async function migrateDB(
  config: Knex.Config,
  schemaText: string,
  options: MigrateOptions = {},
): Promise<MigrationResults> {
  // Default options
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

  let schema: GraphQLSchema;
  if (finalOptions.removeDirectivesFromSchema) {
    schema = removeDirectivesFromSchema(schemaText);
  } else {
    schema = buildSchema(schemaText)
  }

  // Read current
  const existingAdb = await read(
    config,
    finalOptions.dbSchemaName,
    finalOptions.dbTablePrefix,
    finalOptions.dbColumnPrefix,
  )

  // Generate new
  const newAdb = await generateAbstractDatabase(schema, {
    transformTableName: finalOptions.transformTableName,
    transformColumnName: finalOptions.transformColumnName,
    scalarMap: finalOptions.scalarMap,
  })
  if (finalOptions.debug) {
    console.log('BEFORE', JSON.stringify(existingAdb.tables, null, 2))
    console.log('AFTER', JSON.stringify(newAdb.tables, null, 2))
  }
  // Diff
  let ops = await computeDiff(existingAdb, newAdb, {
    updateComments: finalOptions.updateComments,
  })

  if (finalOptions.operationFilter) {
    ops = finalOptions.operationFilter.filter(ops);
  }

  if (finalOptions.debug) {
    console.log('OPERATIONS', ops)
  }
  // Write back to DB
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
