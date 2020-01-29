import { GraphbackDataProvider } from "@graphback/runtime";

export interface DatabaseSchema {
  [table: string]: string[];
}

export interface DatabaseImportData {
  [table: string]: {
    [column: string]: unknown;
  }[];
}

/**
 * This is the basic interface for a custom database for the TestxServer.
 *
 * The main implementation is the SQLiteDatabase.
 *
 * If using the GraphbackServer to generate the GraphQL resolvers the
 *  database schema must be compatible with Graphback. You can do so
 *  using the graphql-migrations package.
 *
 * @experimental - this interface is most likely to change in future release
 *                  please keep an eye on the breaking changes
 */
export interface Database {
  /**
   * Return the GraphbackDataProvider that will be used from GraphbackServer
   * to read and write to the database.
   *
   * Only required if using the GraphbackServer which is the default one.
   */
  getProvider(): GraphbackDataProvider;

  /**
   * Optional method used by the TestxServer.getDatabaseSchema() method.
   */
  getSchema(): Promise<DatabaseSchema>;

  /**
   * Optional, yet really important method used by the
   *  TestxServer.cleanDatabase() and by the TestxServer.setData() methods.
   */
  clean(): Promise<void>;

  /**
   * Optional method used by the TestxServer.setData() method.
   */
  importData(data: DatabaseImportData): Promise<void>;

  /**
   * Close any database connection or asynchronous functions in order
   *  to release the release the process.
   *
   * Used by TestxServer.close() method.
   */
  close(): Promise<void>;
}
