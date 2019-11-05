export interface SchemaProvider {
  getCurrentSchemaText(): string;
  getPreviousSchemaText(): string;
  updatePreviousSchema(currentSchema: string): void;
}
