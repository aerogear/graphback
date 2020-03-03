import { readFileSync } from 'fs';
import { join } from 'path';
import { GlobSync } from 'glob';

/**
 * Loads the schema text from the model directory
 *
 * @export
 * @param {string} modelDir
 * @returns {string}
 */
export function loadSchema(modelDir: string): string {
  const modelPath = join(process.cwd(), modelDir, '*.graphql');

  const files = new GlobSync(modelPath);

  if (files.found.length === 0) {
    throw new Error('Missing GraphQL schema');
  }

  return files.found.map((f: string) => {
    return readFileSync(f, 'utf8');
  }).join('\n');
}