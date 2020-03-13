//eslint-disable-next-line @typescript-eslint/tslint/config
import { buildSchema, GraphQLObjectType } from 'graphql';
import { getPrimaryKey } from '../src/db/getPrimaryKey'
import { getModelTypesFromSchema } from '../src/plugin/getModelTypesFromSchema';

test('should get primary from id: ID field', () => {
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

test('should get primary key from @db.primary annotation', () => {
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

test('should throw an error if no primary key in model', () => {
    const schema = buildSchema(`
    """ @db.model """
    type User {
        email: ID!
        name: String!
    }`);

    const models = getModelTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    expect(() => getPrimaryKey(userModel)).toThrowError('User type has no primary field.')
});

test('should throw an error if multiple @db.primary annotations', () => {
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

    expect(() => getPrimaryKey(userModel)).toThrow()
});