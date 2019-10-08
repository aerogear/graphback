import { readFileSync } from 'fs';
import { sync } from 'glob';
import { buildSchema, GraphQLSchema } from 'graphql';
import { join } from 'path';
import { ResolverType } from '../generators/resolvers';
import { InputModelTypeContext, INTERFACE_TYPE_DEFINITION, OBJECT_TYPE_DEFINITION, OBJECT_TYPE_EXTENSION } from '../input/ContextTypes';

export const getFieldName = (typeName: string, action: ResolverType, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}

export const getTableName = (typeName: string): string => {
  return typeName.toLowerCase()
}

export const filterObjectTypes = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION);

export const filterInterfaceTypes = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === INTERFACE_TYPE_DEFINITION);

export const filterObjectExtensions = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_EXTENSION);

/**
 * Generate a string literal with the following format:
 *
 * `implements InterfaceA & InterfaceB & Interface C ...`
 *
 * @param names String[] - list of interface names
 */
export const createImplementsInterfaceString = (names: string[]) => {
  return `implements ${names.map((name: string) => name).join(' & ')} `;
}

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
