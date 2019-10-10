export interface ISchemaProvider {
  getNewSchemaText(): string;
  getOldSchemaText(): string;
  updateOldSchema(newSchema: string);
}
