// eslint-disable-next-line @typescript-eslint/tslint/config
import { buildSchema, GraphQLSchema } from 'graphql';
import { getModelTypesFromSchema, RelationshipMetadataBuilder } from '../src';

const setup = (schemaText: string): { builder: RelationshipMetadataBuilder, schema: GraphQLSchema } => {
    const schema = buildSchema(schemaText);
    const modelTypes = getModelTypesFromSchema(schema);
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

    t.assert(userRelationships.length === 0);
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
        @oneToMany field: 'sender', key: 'sender_id'
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
    t.assert(userRelationships.length === 1);
    t.assert(userRelationships[0].kind === 'oneToMany');
    t.assert(userRelationships[0].ownerField.name === 'sentMessages')
    t.assert(userRelationships[0].relationFieldName === 'sender');
    t.assert(userRelationships[0].relationForeignKey === 'sender_id')
    t.assert(userRelationships[0].relationType.name === 'Message');

    const messageRelationships = builder.getModelRelationships('Message');
    t.assert(messageRelationships.length === 1);
    t.assert(messageRelationships[0].kind === 'manyToOne');
    t.assert(messageRelationships[0].ownerField.name === 'sender');
    t.assert(messageRelationships[0].relationFieldName === 'sentMessages');
    t.assert(userRelationships[0].relationForeignKey === 'sender_id')
    t.assert(messageRelationships[0].relationType.name === 'User');
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
    t.assert(addressRelationships.length === 1);
    t.assert(addressRelationships[0].kind === 'oneToOne');
    t.assert(addressRelationships[0].ownerField.name === 'resident');
    t.assert(addressRelationships[0].relationForeignKey === 'residentId');
    t.assert(addressRelationships[0].relationType.name === 'User');
    t.assert(addressRelationships[0].relationFieldName === undefined);

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
        @oneToMany field: 'sender'
        """
        sentMessages: [Message!]!
    }
    
    """@model"""
    type Message {
        id: ID!
        description: String
        """
        @manyToOne field: 'sentMessages'
        """
        sender: User
    }
    `)

    builder.build();

    const userRelationships = builder.getModelRelationships('User');
    t.assert(userRelationships.length === 1);
    t.assert(userRelationships[0].kind === 'oneToMany');
    t.assert(userRelationships[0].ownerField.name === 'sentMessages')
    t.assert(userRelationships[0].relationFieldName === 'sender');
    t.assert(userRelationships[0].relationForeignKey === 'senderId')
    t.assert(userRelationships[0].relationType.name === 'Message');

    const messageRelationships = builder.getModelRelationships('Message');
    t.assert(messageRelationships.length === 1);
    t.assert(messageRelationships[0].kind === 'manyToOne');
    t.assert(messageRelationships[0].ownerField.name === 'sender');
    t.assert(messageRelationships[0].relationFieldName === 'sentMessages');
    t.assert(userRelationships[0].relationForeignKey === 'senderId')
    t.assert(messageRelationships[0].relationType.name === 'User');
    
    expect(JSON.stringify(builder.getRelationships(), null, 1)).toMatchSnapshot();
});

test('should throw error when relationship field is missing @model annotation', () => {
    const { builder } = setup(`
    """@model"""
    type User {
        id: ID!
        name: String
        """
        @oneToMany field: 'user'
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
        @oneToMany field: 'user'
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
        @oneToMany field: 'user'
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
        @oneToMany field: 'user'
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
        @oneToMany field: 'user'
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
        @oneToMany field: 'user', key: 'user_id'
        """
        messages: [Message]
    }

    """@model"""
    type Message {
        id: ID!
        text: String
        """
        @manyToOne field: 'messages', key: 'userId'
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

