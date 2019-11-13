import { removeFiles } from '@graphback/core';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { buildSchemaText } from '../../../utils/graphqlUtils';
import { SchemaProvider } from './SchemaProvider';

/**
 * Provides old and new schema from a local filesystem
 *
 * @export
 * @class InputModelProvider
 * @extends {SchemaProvider}
 */
export class InputModelProvider implements SchemaProvider {
  private schemaDir: string;
  constructor(schemaDir: string) {
    this.schemaDir = schemaDir;
  }

  public getSchemaText(): string {
    return buildSchemaText(this.schemaDir);
  }
}
