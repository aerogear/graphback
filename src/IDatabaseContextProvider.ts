import { Type } from 'graphql-codegen-core';

/**
 * Provides context for database execution parameters.
 */
export interface IDatabaseContextProvider {

  /**
   * Get namespace (for relational systems it could be an table name or collection for non sql databases.)
   * @param field GraphQL Type used to retrieve namespace
   */
  getNamespace(field: Type)
}

/**
 * Allows to build prefixed references to the database
 */
export class PrefixedDataContextProvider implements IDatabaseContextProvider {

  private prefix: String;

  constructor(prefix: String) {
    this.prefix = prefix;
  }

  public getNamespace(field: Type) {
    return this.prefix + field.name.toLowerCase();
  }
}
