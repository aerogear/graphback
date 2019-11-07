import { SchemaProvider } from './migrations';

export interface DatabaseConnectionOptions {
  // tslint:disable-next-line: no-any
  client: any;
  // tslint:disable-next-line: no-any
  connectionOptions: any;
  schemaProvider: SchemaProvider;
}
