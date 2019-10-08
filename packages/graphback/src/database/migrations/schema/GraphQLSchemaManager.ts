import { Change, diff } from '@graphql-inspector/core';
import { buildSchema } from 'graphql';
import { SchemaProvider } from './SchemaProvider';

export interface SchemaManagerOptions {
  provider: SchemaProvider
}

/**
 * Manages GraphQL schemas
 *
 * @export
 * @class GraphQLSchemaManager
 */
export class GraphQLSchemaManager {
  public provider: SchemaProvider;
  private previousSchemaText: string;
  private currentSchemaText: string;
  constructor(options: SchemaManagerOptions) {
    this.provider = options.provider;
    this.previousSchemaText = this.provider.getPreviousSchemaText();
    this.currentSchemaText = this.provider.getCurrentSchemaText();
  }

  /**
   * Get the difference between the current and previous schemas
   *
   * @returns {Change[]}
   * @memberof GraphQLSchemaManager
   */
  public getChanges(): Change[] {
    let changes: Change[] = [];

    if (!this.previousSchemaText || !this.previousSchemaText.length) {
      return changes;
    }

    const oldSchema = buildSchema(this.previousSchemaText);
    const newSchema = buildSchema(this.currentSchemaText);

    if (oldSchema && newSchema) {
      changes = diff(oldSchema, newSchema);
    }

    return changes;
  }

  public updateOldSchema() {
    this.provider.updatePreviousSchema(this.currentSchemaText);
  }
}
