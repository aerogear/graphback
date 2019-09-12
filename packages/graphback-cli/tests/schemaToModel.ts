import ava, { ExecutionContext } from 'ava';
import { readFileSync } from 'fs';
import { buildSchema, GraphQLSchema } from 'graphql';
import { removeOperationsFromSchema } from '../src/utils/openApiHelpers';

const schemaText = readFileSync(`${__dirname}/mock.graphql`, 'utf8')

let schema: GraphQLSchema

ava.before((t: ExecutionContext) => {
    schema = buildSchema(schemaText)
})

ava('Test if schema has query and mutations removed', async (t: ExecutionContext) => {
    const newSchema = removeOperationsFromSchema(schema);
    t.is(newSchema.getQueryType(), undefined);
    t.is(newSchema.getMutationType(), undefined);
});

