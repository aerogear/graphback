// eslint-disable-next-line @typescript-eslint/tslint/config
import { buildSchema, GraphQLSchema } from 'graphql';
import { getUserTypesFromSchema } from '@graphql-tools/utils';
import { RelationshipMetadataBuilder } from '../src';

const setup = (schemaText: string): { builder: RelationshipMetadataBuilder, schema: GraphQLSchema } => {
    const schema = buildSchema(schemaText);
    const modelTypes = getUserTypesFromSchema(schema);
    const builder = new RelationshipMetadataBuilder(modelTypes);

    return { builder, schema };
}

test('should have no relationship metadata', () => {
    const { builder } = setup(`
    type User {
        id: ID!
        name: String
    }`)

    builder.build();

    const userRelationships = builder.getModelRelationships('User');

    expect(userRelationships.length).toEqual(0);
});

test('should create many-to-one relationship metadata from one-to-many field', () => {
    const { builder } = setup(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
        """
        some extra description
        @oneToMany(field: 'sender', key: 'sender_id')
        """
        sentMessages: [Message!]!
    }

    """@model"""
    type Message {
        id: ID!
        description: String
    }
    `)

    builder.build();

    const userRelationships = builder.getModelRelationships('User');
    expect(userRelationships.length).toEqual(1);
    expect(userRelationships[0].kind).toEqual('oneToMany');
    expect(userRelationships[0].ownerField.name).toEqual('sentMessages');
    expect(userRelationships[0].relationFieldName).toEqual('sender');
    expect(userRelationships[0].relationForeignKey).toEqual('sender_id');
    expect(userRelationships[0].relationType.name).toEqual('Message');

    const messageRelationships = builder.getModelRelationships('Message');
    expect(messageRelationships.length).toEqual(1);
    expect(messageRelationships[0].kind).toEqual('manyToOne');
    expect(messageRelationships[0].ownerField.name).toEqual('sender');
    expect(messageRelationships[0].relationFieldName).toEqual('sentMessages');
    expect(userRelationships[0].relationForeignKey).toEqual('sender_id');
    expect(messageRelationships[0].relationType.name).toEqual('User');
});

test('should build one-to-one relationship metadata from one-to-one field', () => {
    const { builder } = setup(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
    }

    """@model"""
    type Address {
        id: ID!
        description: String
        """
        @oneToOne
        """
        resident: User!
    }
    `)

    builder.build();

    const addressRelationships = builder.getModelRelationships('Address');
    expect(addressRelationships.length).toEqual(1);
    expect(addressRelationships[0].kind).toEqual('oneToOne');
    expect(addressRelationships[0].ownerField.name).toEqual('resident');
    expect(addressRelationships[0].relationForeignKey).toEqual('residentId');
    expect(addressRelationships[0].relationType.name).toEqual('User');
    expect(addressRelationships[0].relationFieldName).toBeUndefined();

    expect(JSON.stringify(builder.getRelationships(), undefined, 1)).toMatchSnapshot();
});

test('should build one-to-many and many-to-one relationships from both fields', () => {
    const { builder } = setup(`
    """
    @model
    """
    type User {
        id: ID!
        name: String
        """
        some extra description
        @oneToMany(field: 'sender')
        """
        sentMessages: [Message!]!
    }

    """@model"""
    type Message {
        id: ID!
        description: String
        """
        @manyToOne(field: 'sentMessages')
        """
        sender: User
    }
    `)

    builder.build();

    const userRelationships = builder.getModelRelationships('User');
    expect(userRelationships.length).toEqual(1);
    expect(userRelationships[0].kind).toEqual('oneToMany');
    expect(userRelationships[0].ownerField.name).toEqual('sentMessages')
    expect(userRelationships[0].relationFieldName).toEqual('sender');
    expect(userRelationships[0].relationForeignKey).toEqual('senderId')
    expect(userRelationships[0].relationType.name).toEqual('Message');

    const messageRelationships = builder.getModelRelationships('Message');
    expect(messageRelationships.length).toEqual(1);
    expect(messageRelationships[0].kind).toEqual('manyToOne');
    expect(messageRelationships[0].ownerField.name).toEqual('sender');
    expect(messageRelationships[0].relationFieldName).toEqual('sentMessages');
    expect(userRelationships[0].relationForeignKey).toEqual('senderId')
    expect(messageRelationships[0].relationType.name).toEqual('User');

    expect(JSON.stringify(builder.getRelationships(), undefined, 1)).toMatchSnapshot();
});

test('should throw error when relationship field is missing @model annotation', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany(field: 'user')
        """
        messages: [Message]
    }

    type Message {
        id: ID!
        text: String
    }`);

    expect(() => builder.build()).toThrow();
})

test('should throw error when relationship field is not an object type', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany(field: 'user')
        """
        messages: [String]
    }`);

    expect(() => builder.build()).toThrow();
});

test('should throw error when relationship field base type is not a model type', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany(field: 'user')
        """
        messages: [Message]
    }

    type Message {
        id: ID!
        text: String
    }`);

    expect(() => builder.build()).toThrow();
});

test('should throw error when relation field maps to wrong type', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany(field: 'user')
        """
        messages: [Message]
    }

    """@model"""
    type Test {
        id: ID!
    }

    """@model"""
    type Message {
        id: ID!
        text: String
        user: Test
    }`);

    expect(() => builder.build()).toThrow();
});

test('should throw error when relation field is no a single object', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany(field: 'user')
        """
        messages: [Message]
    }

    """@model"""
    type Message {
        id: ID!
        text: String
        user: [User]
    }`);

    expect(() => builder.build()).toThrow();
});

test('should throw error when relationship key annotations are not the same', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany(field: 'user', key: 'user_id')
        """
        messages: [Message]
    }

    """@model"""
    type Message {
        id: ID!
        text: String
        """
        @manyToOne(field: 'messages', key: 'userId')
        """
        user: User
    }`);

    expect(() => builder.build()).toThrow();
});

test('should throw error when relationship field in one-to-one is not a single object', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToOne
        """
        messages: [Message]
    }

    """@model"""
    type Message {
        id: ID!
        text: String
    }`);

    expect(() => builder.build()).toThrow();
});

