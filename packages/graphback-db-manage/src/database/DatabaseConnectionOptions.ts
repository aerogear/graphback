import { MigrationProvider } from '../providers';
import * as knex from 'knex';
import { SchemaProvider } from './migrations';

export interface DatabaseStrategyOptions {
  schemaProvider: SchemaProvider;
  migrationProvider: MigrationProvider;
  // tslint:disable-next-line: no-any
  db: knex<any, unknown[]>;
}
