import { GraphQLSchema } from 'graphql';
import { SchemaComposer } from 'graphql-compose-extended';

export function printSchemaWithDirectives(schemaOrSDL: GraphQLSchema | string): string {
  const schemaComposer = new SchemaComposer(schemaOrSDL)

  return schemaComposer.toSDL({ exclude: ['String', 'ID', 'Boolean', 'Float', 'Int'] });
}
