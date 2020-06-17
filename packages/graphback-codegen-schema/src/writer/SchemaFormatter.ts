/**
 * Schema formatter that provides ability to wrap schema string with language specific code
 * that can simplify importing and using it within server side code.
 *
 * @see jsSchemaFormatter
 * @see tsSchemaFormatter
 * @see gqlSchemaFormatter
 *
 */
export interface SchemaFormatter {
  /**
   * Transform schema string to new format.
   * Can be used to wrap schema into js or typescript import format that can be added to the file
   *
   * @param schemaString
   */
  format(schemaString: string): string
}
