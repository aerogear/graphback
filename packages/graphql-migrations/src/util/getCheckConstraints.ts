import Knex from 'knex'

const queries: any = {
  pg: (knex: Knex, tableName: string, schemaName: string) => ({
    sql: `select
    c.conname as "indexName",
    array_to_string(array_agg(a.attname), ',') as "columnNames",
    c.consrc as "expression"
  from
    pg_class t,
    pg_constraint c,
    pg_namespace n,
    pg_attribute a
  where
    c.conrelid = t.oid
    and n.oid = c.connamespace
    and a.attrelid = t.oid
    and a.attnum = ANY(c.conkey)
    and c.contype = 'c'
    and t.relname = ?
    and n.nspname = ?
  group by
    t.relname,
    c.conname,
    c.consrc;`,
    bindings: [tableName, schemaName],
    output: (resp: any) => resp.rows.map((row: any) => {
      let values = null
      const result = /\(ARRAY\[(.+)\]\)/.exec(row.expression)
      if (result) {
        values = result[1].split(',').map((str: string) => {
          const resultItem = /'(.+)'::text/.exec(str)
          if (resultItem) {
            return resultItem[1]
          }
          return str.trim()
        })
      }

      return {
        ...row,
        columnNames: row.columnNames.split(','),
        values,
      }
    }),
  }),
}

export default async function (
  knex: Knex,
  tableName: string,
  schemaName: string,
): Promise<Array<{ indexName: string, columnNames: string[], values: string[] }>> {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.warn(`${knex.client.config.client} column unique constraints not supported`)
    return []
  }
  const { sql, bindings, output } = query(knex, tableName, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
