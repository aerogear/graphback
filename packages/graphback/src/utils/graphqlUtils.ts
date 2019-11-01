import { readFileSync } from 'fs';
import { sync } from 'glob';
import { buildSchema, GraphQLSchema } from 'graphql';
import { join } from 'path';

/**
 * Collects all GraphQL files in a directory and reads the content into a string.
 *
 * @param schemaDir - The directory of the schema file(s)
 */
export const buildSchemaText = (schemaDir: string): string => {
  const schemaPath = join(schemaDir, '*.graphql');
  const files = sync(schemaPath);

  if (files.length === 0) {
    return undefined;
  }

  const schemaText = files
    // tslint:disable-next-line: no-unnecessary-callback-wrapper
    .map((f: string) => readFileSync(f))
    .join('\n');

  return schemaText.length ? schemaText : undefined;
}

/**
 * Builds a GraphQLSchema object from all .graphql files in a directory
 *
 * @param schemaDir - The directory of the schema files
 */
export const buildSchemaFromDir = (schemaDir: string): GraphQLSchema => {
  const schemaText = buildSchemaText(schemaDir);

  if (!schemaText) {
    return undefined;
  }

  return buildSchema(schemaText);
}
