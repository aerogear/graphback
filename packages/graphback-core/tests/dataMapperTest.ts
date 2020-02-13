// tslint:disable-next-line: match-default-export-name no-implicit-dependencies
import ava, { ExecutionContext } from 'ava';
import { buildSchema, GraphQLObjectType } from 'graphql';
import { buildModelTableMap } from '../src/db/buildModelTableMap';
import { getDatabaseArguments } from '../src/db/dataMapper';

ava('should map to default ID field', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
        email: String
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    const data = {
        id: 1,
        email: 'johndoe@gmail.com',
        name: 'John Doe',
    }

    const args = getDatabaseArguments(modelTableMap, data);

    t.deepEqual(args.idField, { name: 'id', value: 1 })
});

ava('should map to default custom ID field from annotations', (t: ExecutionContext) => {
    const schema = buildSchema(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
        """
        @db.primary
        """
        email: String
    }`);

    const userModel = schema.getType("User") as GraphQLObjectType;

    const modelTableMap = buildModelTableMap(userModel);

    const data = {
        id: 1,
        email: 'johndoe@gmail.com',
        name: 'John Doe',
    }

    const args = getDatabaseArguments(modelTableMap, data);

    t.deepEqual(args.idField, { name: 'email', value: 'johndoe@gmail.com' })
});