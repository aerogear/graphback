import * as Knex from 'knex';

export const connect = (
  client: string,
  dbConnectionOptions: Knex.ConnectionConfig | Knex.Sqlite3ConnectionConfig,
) => {
  switch (client) {
    case 'pg':
      return Knex({
        client: 'pg',
        connection: dbConnectionOptions,
      });
    case 'sqlite3':
      return Knex({
        client: 'sqlite3',
        connection: dbConnectionOptions,
      });
    default:
      return undefined;
  }
};
