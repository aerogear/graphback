// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { buildModelTableMap } from '../src/db/buildModelTableMap';

ava('should build model-table mapping using default values', (t: ExecutionContext) => {
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

    t.assert(modelTableMap.tableName === 'user');
    t.deepEqual(modelTableMap.fieldMap, {});
});

ava('should build mapping using custom values from mapping annotations', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """
    @model
    @db.name: 'user_account'
    """
    type User {
        id: ID!
        """
        @db.name: 'user_email'
        """
        email: String!
        """
        @db.name: 'userName'
        """
        name: String!
        address: String
        """
        @db.name: 'AccountConfirmed'
        """
        accountConfirmed: Boolean
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    t.assert(modelTableMap.tableName === 'user_account');
    t.deepEqual(modelTableMap.fieldMap, { email: 'user_email', name: 'userName', accountConfirmed: 'AccountConfirmed' });
    t.snapshot(JSON.stringify(modelTableMap, undefined, 1))
});

ava('should use default ID field', (t: ExecutionContext) => {
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

    t.assert(modelTableMap.idField === 'id')
});

ava('should use custom ID field from annotation', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        """
        @db.primary
        @db.name: 'user_email'
        """
        email: String!
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    t.assert(modelTableMap.idField === 'user_email');
});

ava('should throw error if no ID Field', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        primary: ID!
        name: String!
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    t.throws(() => buildModelTableMap(userModel), 'User type has no primary field.');
});