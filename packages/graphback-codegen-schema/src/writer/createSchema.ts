import { InputModelTypeContext } from '@graphback/core'
import { SchemaGenerator, tsSchemaFormatter } from '..';
import { gqlSchemaFormatter, jsSchemaFormatter } from './schemaFormatters';
import { GraphQLSchema } from 'graphql';
import { printSortedSchema } from './schemaPrinter';

export interface SchemaWriterOptions {
    // output format
    format: 'ts' | 'js' | 'gql'
}

/**
 * Create resolvers function that 
 * @param inputContext 
 * @param options 
 */
export const writeSchema = (schema: GraphQLSchema, options: SchemaWriterOptions): string => {
    const schemaString = printSortedSchema(schema);
    if (options) {
        if (options.format === 'ts') {
            return tsSchemaFormatter.format(schemaString)
        }
        if (options.format === 'js') {
            return jsSchemaFormatter.format(schemaString)
        }
        if (options.format === 'gql') {
            return gqlSchemaFormatter.format(schemaString)
        }
    }
    throw Error("Invalid format specified. `options.format` supports only `ts`, `js` and `gql` flags");
}
