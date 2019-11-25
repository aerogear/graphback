import Knex from 'knex'

const queries: any = {
  mssql: (knex: Knex, schemaName: string) => ({
    sql: `select table_name from information_schema.tables
    where table_type = 'BASE TABLE' and table_schema = ? and table_catalog = ?`,
    bindings: [schemaName, knex.client.database()],
    output: (resp: any) => resp.rows.map((table: any) => ({ name: table.table_name })),
  }),

  mysql: (knex: Knex) => ({
    sql: `select table_name, table_comment from information_schema.tables where table_schema = ?`,
    bindings: [knex.client.database()],
    output: (resp: any) => resp.map((table: any) => ({ name: table.table_name, comment: table.table_comment })),
  }),

  mysql2: (knex: Knex) => ({
    sql: `select table_name, table_comment from information_schema.tables where table_schema = ?`,
    bindings: [knex.client.database()],
    output: (resp: any) => resp.map((table: any) => ({ name: table.table_name, comment: table.table_comment })),
  }),

  oracle: () => ({
    sql: `select table_name from user_tables`,
    output: (resp: any) => resp.map((table: any) => ({ name: table.TABLE_NAME })),
  }),

  pg: (knex: Knex, schemaName: string) => ({
    sql: `select c.relname, d.description from pg_class c
    left join pg_namespace n on n.oid = c.relnamespace
    left join pg_description d on d.objoid = c.oid and d.objsubid = 0
    where c.relkind = 'r' and n.nspname = ?;`,
    bindings: [schemaName],
    output: (resp: any) => resp.rows.map((table: any) => ({ name: table.relname, comment: table.description })),
  }),

  sqlite3: () => ({
    sql: `SELECT name FROM sqlite_master WHERE type='table';`,
    output: (resp: any) => resp.map((table: any) => ({ name: table.name })),
  }),
}

export default async function (knex: Knex, schemaName: string) {
  const query = queries[knex.client.config.client]
  if (!query) {
    console.error(`Client ${knex.client.config.client} not supported`)
  }
  const { sql, bindings, output } = query(knex, schemaName)
  const resp = await knex.raw(sql, bindings)
  return output(resp)
}
