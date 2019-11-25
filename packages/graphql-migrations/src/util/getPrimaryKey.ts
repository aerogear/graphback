import Knex from 'knex'

const queries: any = {
  pg: (knex: Knex, tableName: string, schemaName: string) => ({
    sql: `SELECT
      c.column_name as column,
      tc.constraint_name as "indexName"
    FROM information_schema.table_constraints tc
    JOIN information_schema.constraint_column_usage ccu USING (constraint_schema, constraint_name)
    JOIN information_schema.columns c ON c.table_schema = tc.constraint_schema
      AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
    where tc.constraint_type = 'PRIMARY KEY' and tc.table_name = ? and tc.table_schema = ?;`,
    bindings: [tableName, schemaName],
    output: (resp: any) => resp.rows,
  }),
}

export default async function (
  knex: Knex,
  tableName: string,
  schemaName: string,
): Promise<Array<{ column: string, indexName: string }>> {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.warn(`${knex.client.config.client} primary keys not supported`)
    return []
  }
  const { sql, bindings, output } = query(knex, tableName, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
