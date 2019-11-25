import Knex from 'knex'

const queries: any = {
  pg: (knex: Knex, tableName: string, schemaName: string) => ({
    sql: `select
    i.relname as "indexName",
    array_to_string(array_agg(a.attname), ',') as "columnNames",
    null as "type"
from
    pg_class t,
    pg_class i,
    pg_index ix,
    pg_attribute a,
    pg_namespace n
where
    t.oid = ix.indrelid
    and i.oid = ix.indexrelid
    and a.attrelid = t.oid
    and a.attnum = ANY(ix.indkey)
    and t.relkind = 'r'
    and t.relname = ?
    and t.relnamespace = n.oid
    and n.nspname = ?
group by
    t.relname,
    i.relname
order by
    t.relname,
    i.relname;`,
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
): Promise<Array<{ indexName: string, columnNames: string[], type: string | null }>> {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.warn(`${knex.client.config.client} column index not supported`)
    return []
  }
  const { sql, bindings, output } = query(knex, tableName, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
