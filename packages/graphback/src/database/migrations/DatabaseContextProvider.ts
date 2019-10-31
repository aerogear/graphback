import { InputModelTypeContext } from '@graphback/codegen-input';

/**
 * Provides context for database creation and queries.
 * Common object used to
 */
export interface DatabaseContextProvider {

  /**
   * Get field name with namespace (for relational systems it could be an table name or collection for non sql databases.)
   * This can be used to separate existing schemas to separate projects
   *
   * @param field GraphQL Type used to retrieve namespace
   */
  getFieldName(field: InputModelTypeContext)
}

/**
 * Allows to build prefixed references to the database
 */
export class DefaultDataContextProvider implements DatabaseContextProvider {

  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  public getFieldName(field: InputModelTypeContext) {
    return this.prefix + field.name.toLowerCase();
  }
}
