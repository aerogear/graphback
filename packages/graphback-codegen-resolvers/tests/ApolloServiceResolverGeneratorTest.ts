// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { graphQLInputContext } from '@graphback/core/src';
import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { generateResolvers } from '../src';

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
    "subDelete": true,
    "disableGen": true
  }
  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)
  const resolvers = generateResolvers(inputContext, {
    format: 'ts', types: {
      resolverType: 'Resolvers',
      typesImportStatement: "import { Resolvers} from '../../generated-types"
    }
  })
  t.snapshot(resolvers);
});

ava('Test snapshot resolvers js', async (t: ExecutionContext) => {
  const defautConfig = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true,
    "disableGen": true
  }
  const inputContext = graphQLInputContext.createModelContext(schemaText, defautConfig)
  const resolvers = generateResolvers(inputContext, { format: 'js' })
  t.snapshot(resolvers);
});