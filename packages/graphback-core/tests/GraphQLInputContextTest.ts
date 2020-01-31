// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')
const schemaTextAnnotations = readFileSync(`${__dirname}/mockAnnotations.graphql`, 'utf8')

ava('Test config', async (t: ExecutionContext) => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
  }

  t.snapshot(defautConfig);
});
