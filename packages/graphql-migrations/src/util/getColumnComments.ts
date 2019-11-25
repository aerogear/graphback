import Knex from 'knex'

const queries: any = {
  pg: (knex: Knex, tableName: string, schemaName: string) => ({
    sql: `SELECT a.attname as column,
    pg_catalog.col_description(a.attrelid, a.attnum) as comment
  FROM pg_catalog.pg_attribute a
  WHERE a.attrelid = (SELECT c.oid
  FROM pg_catalog.pg_class c
       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
  WHERE c.relname = ?
    AND n.nspname = ?) AND a.attnum > 0 AND NOT a.attisdropped;`,
    bindings: [tableName, schemaName],
    output: (resp: any) => resp.rows,
  }),
}

export default async function (
  knex: Knex,
  tableName: string,
  schemaName: string,
): Promise<Array<{ column: string, comment: string }>> {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.warn(`${knex.client.config.client} doesn't support column comment`)
    return []
  }
  const { sql, bindings, output } = query(knex, tableName, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
