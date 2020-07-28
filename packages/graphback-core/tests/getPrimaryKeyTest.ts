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

test('should get primary from _id: GraphbackObjectID field', () => {
  const schema = buildSchema(`
  """ @model """
  type User {
      _id: GraphbackObjectID!
      email: String!
  }
  scalar GraphbackObjectID
  `);

  const models = getUserTypesFromSchema(schema);

  const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

  const primaryKey = getPrimaryKey(userModel);

  expect(primaryKey.name).toEqual('_id');
});

test('should get primary key from @id annotation', () => {
    const schema = buildSchema(`
    """ @model """
    type User {
        id: ID!
        """
        @id
        """
        email: String!
        name: String
    }

    """ @model """
    type Note {
        """
        @id
        """
        reference: String!
        id: ID!
    }
    `);

    const models = getUserTypesFromSchema(schema);

    const primaryKeys = models.map(userModel => getPrimaryKey(userModel).name);

    expect(primaryKeys).toEqual(['email', 'reference']);
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

test('should throw an error if multiple @id annotations', () => {
    const schema = buildSchema(`
    """ @model """
    type User {
        id: ID!
        """
        @id
        """
        email: String!
        """
        @id
        """
        name: String
    }`);

    const models = getUserTypesFromSchema(schema);

    const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

    expect(() => getPrimaryKey(userModel)).toThrow()
});

test('should throw an error if multiple @id annotations', () => {
  const schema = buildSchema(`
  """ @model """
  type User {
      id: ID!
      _id: GraphbackObjectID!
      email: String!
      name: String
  }
  scalar GraphbackObjectID
  `);

  const models = getUserTypesFromSchema(schema);

  const userModel = models.find((graphqlType: GraphQLObjectType) => graphqlType.name === 'User');

  expect(() => getPrimaryKey(userModel)).toThrow()
});
