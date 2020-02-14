//eslint-disable-next-line @typescript-eslint/tslint/config
import ava, { ExecutionContext } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { getPrimaryKey } from '../src/db/getPrimaryKey'
import { getModelTypesFromSchema } from '../src/plugin/getModelTypesFromSchema';

ava('should get primary from id: ID field', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """ @model """
    type User {
        id: ID!
        email: String!
    }`);

    const models = getModelTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    const primaryKey = getPrimaryKey(userModel);

    t.assert(primaryKey.name === 'id');
});

ava('should get primary key from @db.primary annotation', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """ @model """
    type User {
        id: ID!
        """
        @db.primary
        """
        email: String!
        name: String
    }`);

    const models = getModelTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    const primaryKey = getPrimaryKey(userModel);

    t.assert(primaryKey.name === 'email');
});

ava('should throw an error if no primary key in model', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """ @db.model """
    type User {
        email: ID!
        name: String!
    }`);

    const models = getModelTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    t.throws(() => getPrimaryKey(userModel), 'User type has no primary field.')
});

ava('should throw an error if multiple @db.primary annotations', (t: ExecutionContext) => {
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

    t.throws(() => getPrimaryKey(userModel))
});