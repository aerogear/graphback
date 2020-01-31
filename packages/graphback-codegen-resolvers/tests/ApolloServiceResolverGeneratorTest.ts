import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

ava('Test snapshot resolvers ts', async (t: ExecutionContext) => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true
  }
  // TODO
  t.snapshot(defautConfig);
});
