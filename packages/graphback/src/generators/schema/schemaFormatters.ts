import { SchemaFormatter } from './SchemaGenerator'

/**
 * Typescript string template that formats schema into common js module that can be imported 
 * easily in server side application
 */
export const tsSchemaFormatter: SchemaFormatter = {
  format: (schemaString: string) => {
    return `
export const schemaString = \`
${schemaString}
\`;
`
  }
}

/**
 * JS string template that formats schema into common js module that can be imported 
 * easily in server side application
 */
export const jsSchemaFormatter: SchemaFormatter = {
  format: (schemaString: string) => {
    return `
const schemaString = \`
${schemaString}
\`;

module.exports = { schemaString };
`
  }
}
 