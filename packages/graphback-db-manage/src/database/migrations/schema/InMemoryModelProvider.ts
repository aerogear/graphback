import { SchemaProvider } from './SchemaProvider';

/**
 * Provides old and new schema from application memory
 *
 * @export
 * @class InMemoryModelProvider
 * @extends {SchemaProvider}
 */
export class InMemoryModelProvider implements SchemaProvider {
  private oldSchemaText: string;
  private newSchemaText: string;
  constructor(oldSchemaText: string, newSchemaText: string) {
    this.oldSchemaText = oldSchemaText;
    this.newSchemaText = newSchemaText;
  }

  public getSchemaText(): string {
    return this.newSchemaText;
  }
}
