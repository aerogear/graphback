import ava, { ExecutionContext } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { getPrimaryKey } from '../src/db/getPrimaryKey'
import { getModelTypesFromSchema } from '../src/plugin/getModelTypesFromSchema';

ava('should get primary from id: ID field', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """ @db.model """
    type User {
        id: ID!
        email: String!
    }`);

    const models = getModelTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    const primaryKey = getPrimaryKey(userModel);

    t.assert(primaryKey.name === 'id');
});

ava('should get first primary key from @db.primary annotation', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """ @db.model """
    type User {
        id: ID!
        """
        @db.primary
        """
        email: String!
        """
        @db.primary
        """
        name: String
    }`);

    const models = getModelTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    const primaryKey = getPrimaryKey(userModel);

    t.assert(primaryKey.name === 'email');
});