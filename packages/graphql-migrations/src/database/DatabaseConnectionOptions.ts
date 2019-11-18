import * as knex from 'knex';
import { MigrationProvider } from '../migrations/MigrationProvider';

export interface DatabaseStrategyOptions {
  migrationProvider: MigrationProvider;
  // tslint:disable-next-line: no-any
}
