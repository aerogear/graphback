//tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import { buildSchema, GraphQLObjectType } from 'graphql';
import { buildModelTableMap } from '../src/db/buildModelTableMap';

test('should build model-table mapping using default values', () => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        email: String!
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    expect(modelTableMap.tableName).toEqual('user');
    expect(modelTableMap.fieldMap).toEqual({});
});

test('should build mapping using custom values from mapping annotations', () => {
    const schema = buildSchema(`
    """
    @model
    @db(name: 'user_account')
    """
    type User {
        id: ID!
        """
        @db(name: 'user_email')
        """
        email: String!
        """
        @db(name: 'userName')
        """
        name: String!
        address: String
        """
        @db(name: 'AccountConfirmed')
        """
        accountConfirmed: Boolean
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    expect(modelTableMap.tableName).toEqual('user_account');
    expect(modelTableMap.fieldMap).toEqual(
        { email: 'user_email', name: 'userName', accountConfirmed: 'AccountConfirmed' }
    );
    expect(JSON.stringify(modelTableMap, undefined, 1)).toMatchSnapshot()
});

test('should use default ID field', () => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        secondaryID: ID!
        email: String!
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    expect(modelTableMap.idField).toEqual('id');
});

test('should use custom ID field from annotation', () => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        """
        @id
        @db(name: 'user_email')
        """
        email: String!
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    expect(modelTableMap.idField).toEqual('user_email');
});

test('should throw error if no ID Field', () => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        primary: ID!
        name: String!
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    expect(() => buildModelTableMap(userModel)).toThrowError('User type has no primary field.');
});
