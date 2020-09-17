import Knex from 'knex';

/**
 * Detect if the column is incrementable based on column information
 * 
 * @param {string} client - database client 
 * @param {Knex.ColumnInfo} columnInfo - metadata for column
 */
export function isAutoIncrementableColumn (client: string, columnInfo: Knex.ColumnInfo): boolean {
  switch (client) {
    case 'pg':
      return columnInfo.defaultValue?.toString().startsWith('nextval(');
    case 'sqlite3':
      // sqlite3 primary keys not supported
      return false;
    default:
      console.warn(`${client} increments column detection not supported`)

      return false;
  }
}