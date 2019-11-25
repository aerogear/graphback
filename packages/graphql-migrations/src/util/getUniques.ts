import Knex from 'knex'

const queries: any = {
  pg: (knex: Knex, tableName: string, schemaName: string) => ({
    sql: `select
    c.conname as "indexName",
    array_to_string(array_agg(a.attname), ',') as "columnNames"
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
    and c.contype = 'u'
    and t.relname = ?
    and n.nspname = ?
  group by
    t.relname,
    c.conname;`,
    bindings: [tableName, schemaName],
    output: (resp: any) => resp.rows.map((row: any) => ({
      ...row,
      columnNames: row.columnNames.split(','),
    })),
  }),
}

export default async function (
  knex: Knex,
  tableName: string,
  schemaName: string,
): Promise<Array<{ indexName: string, columnNames: string[] }>> {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.warn(`${knex.client.config.client} column unique constraints not supported`)
    return []
  }
  const { sql, bindings, output } = query(knex, tableName, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
