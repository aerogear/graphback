import { readFileSync } from 'fs';
import { join } from 'path';
import { GlobSync } from 'glob';

/**
 * Loads the schema text from the schema files
 *
 * @export
 * @param {string} schemaPath
 * @returns {string}
 */
export function loadSchema(schemaPath: string): string {
  const files = new GlobSync(schemaPath);

  if (files.found.length === 0) {
    throw new Error('Missing GraphQL schema');
  }

  return files.found.map((f: string) => {
    return readFileSync(f, 'utf8');
  }).join('\n');
}

