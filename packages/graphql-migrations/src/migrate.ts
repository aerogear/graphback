import { buildSchema } from 'graphql'
import { Config } from 'knex'
import { generateAbstractDatabase, NameTransform, ScalarMap } from './abstract/generateAbstractDatabase'
import { read } from './connector/read'
import { write } from './connector/write'
import { computeDiff } from './diff/computeDiff'
import { Operation } from './diff/Operation'
import { MigratePlugin } from './plugin/MigratePlugin'
import { defaultNameTransform } from './util/defaultNameTransforms'

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
  transformTableName?: NameTransform | null
  /**
   * Transform the column names.
   */
  transformColumnName?: NameTransform | null
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
}

export const defaultOptions: MigrateOptions = {
  dbSchemaName: 'public',
  dbTablePrefix: '',
  dbColumnPrefix: '',
  updateComments: false,
  transformTableName: defaultNameTransform,
  transformColumnName: defaultNameTransform,
  scalarMap: null,
  mapListToJson: true,
  plugins: [],
  debug: false,
}

export async function migrate(
  config: Config,
  schemaText: string,
  options: MigrateOptions = {},
): Promise<Operation[]> {
  // Default options
  const finalOptions = {
    ...defaultOptions,
    ...options,
  }
  if (finalOptions.debug) {
    config = {
      ...config,
      debug: true,
    }
  }
  // Read current
  const existingAdb = await read(
    config,
    finalOptions.dbSchemaName,
    finalOptions.dbTablePrefix,
    finalOptions.dbColumnPrefix,
  )

  const schema = buildSchema(schemaText)
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
  const ops = await computeDiff(existingAdb, newAdb, {
    updateComments: finalOptions.updateComments,
  })
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

  return ops
}
