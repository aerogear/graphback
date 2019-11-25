import Knex from 'knex'

const queries: any = {
  pg: (knex: Knex, tableName: string, schemaName: string) => ({
    sql: `SELECT
    kcu.column_name as "column",
    ccu.table_name AS "foreignTable",
    ccu.column_name AS "foreignColumn"
FROM
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
where tc.constraint_type = 'FOREIGN KEY' and tc.table_name = ? and tc.table_schema = ?;`,
    bindings: [tableName, schemaName],
    output: (resp: any) => resp.rows,
  }),
}

export default async function (
  knex: Knex,
  tableName: string,
  schemaName: string,
): Promise<Array<{ column: string, foreignTable: string, foreignColumn: string }>> {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.warn(`${knex.client.config.client} foreign keys not supported`)
    return []
  }
  const { sql, bindings, output } = query(knex, tableName, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
