import { join } from 'path';
import { sync } from 'glob';
import { unlinkSync } from 'fs';

export const removeGraphqlFiles = (dir: string) => {
  const schemaPath = join(dir, '*.graphql');
  const files = sync(schemaPath);

  for (const gqlFile of files) {
    unlinkSync(gqlFile);
  }
}
