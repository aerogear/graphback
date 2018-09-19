import { Type } from 'graphql-codegen-core';


/**
 * Provides context for database execution parameters.
 */
export interface DatabaseContextProvider {

  /**
   * Get namespace (for relational systems it could be an table name or collection for non sql databases.)
   * @param field GraphQL Type used to retrieve namespace
   */
  getNamespace(field: Type)
}

/**
 * Allows to build prefixed references to the database
 */
export class DefaultDataContextProvider implements DatabaseContextProvider {

  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  public getNamespace(field: Type) {
    return this.prefix + field.name.toLowerCase();
  }
}
