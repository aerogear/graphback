export enum DatabaseChangeType {
  createTable = 'CREATE_TABLE',
  alterTable = 'ALTER_TABLE'
}

export interface DatabaseChange {
  // tslint:disable-next-line: no-reserved-keywords
  type: DatabaseChangeType
  sql: string
}
