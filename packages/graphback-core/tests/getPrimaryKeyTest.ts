//eslint-disable-next-line @typescript-eslint/tslint/config
import { buildSchema, GraphQLObjectType } from 'graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getUserTypesFromSchema } from '@graphql-toolkit/common';
import { getPrimaryKey } from '../src/db/getPrimaryKey'

test('should get primary from id: ID field', () => {
    const schema = buildSchema(`
    """ @model """
    type User {
        id: ID!
        email: String!
    }`);

    const models = getUserTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    const primaryKey = getPrimaryKey(userModel);

    expect(primaryKey.name).toEqual('id');
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

    const models = getUserTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    const primaryKey = getPrimaryKey(userModel);

    expect(primaryKey.name).toEqual('email');
});

test('should throw an error if no primary key in model', () => {
    const schema = buildSchema(`
    """ @model """
    type User {
        email: ID!
        name: String!
    }`);

    const models = getUserTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    expect(() => getPrimaryKey(userModel)).toThrowError('User type has no primary field.')
});

test('should throw an error if multiple @db.primary annotations', () => {
    const schema = buildSchema(`
    """ @model """
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

    const models = getUserTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    expect(() => getPrimaryKey(userModel)).toThrow()
});
