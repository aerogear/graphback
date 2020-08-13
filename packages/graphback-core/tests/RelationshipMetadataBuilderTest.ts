/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/tslint/config
import { buildSchema, GraphQLSchema, getNamedType } from 'graphql';
import { RelationshipMetadataBuilder, GraphbackCoreMetadata } from '../src';
import { ModelDefinition } from '../types';

const setup = (schemaText: string): { builder: RelationshipMetadataBuilder, schema: GraphQLSchema, models: ModelDefinition[] } => {
    const schema = buildSchema(schemaText);
    const metadata = new GraphbackCoreMetadata({ crudMethods: {} }, schema);
    const models = metadata.getModelDefinitions()
    const builder = new RelationshipMetadataBuilder(models);

    return { builder, schema, models };
}

test('should have no relationship metadata', () => {
    const { builder } = setup(`
    type User {
        id: ID!
        name: String
    }`)

    const { User: userRelationships } = builder.build();

    expect(Object.keys(userRelationships.length)).toHaveLength(0);
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

    const { User: userRelationships, Message: messageRelationships } = builder.build();

    expect(Object.keys(userRelationships)).toHaveLength(1);
    const sentMessagesFieldMetadata = userRelationships.sentMessages;
    expect(sentMessagesFieldMetadata).toBeDefined()
    expect(sentMessagesFieldMetadata.kind).toEqual('oneToMany');
    expect(sentMessagesFieldMetadata.ownerField.name).toEqual('sentMessages');
    expect(sentMessagesFieldMetadata.relationFieldName).toEqual('sender');
    expect(sentMessagesFieldMetadata.relationForeignKey).toEqual('sender_id');
    expect(sentMessagesFieldMetadata.relationType.name).toEqual('Message');

    expect(Object.keys(messageRelationships)).toHaveLength(1)
    const senderFieldMetadata = messageRelationships.sender;
    expect(senderFieldMetadata).toBeDefined()
    expect(senderFieldMetadata.kind).toEqual('manyToOne');
    expect(senderFieldMetadata.ownerField.name).toEqual('sender');
    expect(senderFieldMetadata.relationFieldName).toEqual('sentMessages');
    expect(sentMessagesFieldMetadata.relationForeignKey).toEqual('sender_id');
    expect(senderFieldMetadata.relationType.name).toEqual('User');
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

    const { Address: addressRelationships } = builder.build();

    expect(Object.keys(addressRelationships)).toHaveLength(1);
    const residentFieldMetadata = addressRelationships.resident;
    
    expect(residentFieldMetadata.kind).toEqual('oneToOne');
    expect(residentFieldMetadata.ownerField.name).toEqual('resident');
    expect(residentFieldMetadata.relationForeignKey).toEqual('residentId');
    expect(residentFieldMetadata.relationType.name).toEqual('User');
    expect(residentFieldMetadata.relationFieldName).toBeUndefined();

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

    const { User: userRelationships, Message: messageRelationships } = builder.build();

    expect(Object.keys(userRelationships)).toHaveLength(1);
    const sentMessagesFieldMetadata = userRelationships.sentMessages;
    expect(sentMessagesFieldMetadata.kind).toEqual('oneToMany');
    expect(sentMessagesFieldMetadata.ownerField.name).toEqual('sentMessages')
    expect(sentMessagesFieldMetadata.relationFieldName).toEqual('sender');
    expect(sentMessagesFieldMetadata.relationForeignKey).toEqual('senderId')
    expect(sentMessagesFieldMetadata.relationType.name).toEqual('Message');

    expect(Object.keys(messageRelationships)).toHaveLength(1);
    const senderFieldMetadata = messageRelationships.sender;
    expect(senderFieldMetadata).toBeDefined();
    expect(senderFieldMetadata.kind).toEqual('manyToOne');
    expect(senderFieldMetadata.ownerField.name).toEqual('sender');
    expect(senderFieldMetadata.relationFieldName).toEqual('sentMessages');
    expect(sentMessagesFieldMetadata.relationForeignKey).toEqual('senderId')
    expect(senderFieldMetadata.relationType.name).toEqual('User');

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

test('implicit one-to-many relationship with generated many-to-one field', () => {

    const { builder } = setup(`
 """ @model """
type Note {
  id: ID!
  title: String!
  description: String
  comments: [Comment]!
}

""" @model """
type Comment {
  id: ID!
  text: String
  description: String
}`)

    const relationshipMetadataConfig = builder.build();

    const noteRelationshipMetadata = relationshipMetadataConfig.Note;
    const commentRelationshipMetadata = relationshipMetadataConfig.Comment;

    expect(Object.keys(noteRelationshipMetadata)).toHaveLength(1);
    expect(Object.keys(commentRelationshipMetadata)).toHaveLength(1);

    const NoteCommentsFieldMetadata = noteRelationshipMetadata.comments;
    const CommentNoteFieldMetadata = commentRelationshipMetadata.note;

    expect(NoteCommentsFieldMetadata).toBeDefined()
    expect(CommentNoteFieldMetadata).toBeDefined()

    expect(NoteCommentsFieldMetadata.kind).toEqual('oneToMany')
    expect(NoteCommentsFieldMetadata.owner).toEqual(CommentNoteFieldMetadata.ownerField.type)
    expect(getNamedType(NoteCommentsFieldMetadata.ownerField.type)).toEqual(CommentNoteFieldMetadata.owner)
    expect(NoteCommentsFieldMetadata.relationFieldName).toEqual('note')
    expect(NoteCommentsFieldMetadata.relationForeignKey).toEqual('noteId')
    expect(NoteCommentsFieldMetadata.ownerField.name).toEqual('comments')

    expect(CommentNoteFieldMetadata.kind).toEqual('manyToOne')
    expect(CommentNoteFieldMetadata.owner).toEqual(getNamedType(NoteCommentsFieldMetadata.ownerField.type))
    expect(getNamedType(CommentNoteFieldMetadata.ownerField.type)).toEqual(NoteCommentsFieldMetadata.owner)
    expect(CommentNoteFieldMetadata.relationFieldName).toEqual('comments')
    expect(CommentNoteFieldMetadata.relationForeignKey).toEqual('noteId')
    expect(CommentNoteFieldMetadata.ownerField.name).toEqual('note')
})

test('implicit one-to-many relationship with user defined many-to-one field', () => {

    const { builder } = setup(`
 """ @model """
type Note {
  id: ID!
  title: String!
  description: String
  comments: [Comment]!
}

""" @model """
type Comment {
  id: ID!
  text: String
  description: String
  note: Note!
}`)

    const relationshipMetadataConfig = builder.build();

    const noteRelationshipMetadata = relationshipMetadataConfig.Note;
    const commentRelationshipMetadata = relationshipMetadataConfig.Comment;

    expect(Object.keys(noteRelationshipMetadata)).toHaveLength(1);
    expect(Object.keys(commentRelationshipMetadata)).toHaveLength(1);

    const NoteCommentsFieldMetadata = noteRelationshipMetadata.comments;
    const CommentNoteFieldMetadata = commentRelationshipMetadata.note;

    expect(NoteCommentsFieldMetadata).toBeDefined()
    expect(CommentNoteFieldMetadata).toBeDefined()

    expect(NoteCommentsFieldMetadata.kind).toEqual('oneToMany')
    expect(NoteCommentsFieldMetadata.owner).toEqual(getNamedType(CommentNoteFieldMetadata.ownerField.type))
    expect(getNamedType(NoteCommentsFieldMetadata.ownerField.type)).toEqual(CommentNoteFieldMetadata.owner)
    expect(NoteCommentsFieldMetadata.relationFieldName).toEqual('note')
    expect(NoteCommentsFieldMetadata.relationForeignKey).toEqual('noteId')
    expect(NoteCommentsFieldMetadata.ownerField.name).toEqual('comments')

    expect(CommentNoteFieldMetadata.kind).toEqual('manyToOne')
    expect(CommentNoteFieldMetadata.owner).toEqual(getNamedType(NoteCommentsFieldMetadata.ownerField.type))
    expect(getNamedType(CommentNoteFieldMetadata.ownerField.type)).toEqual(NoteCommentsFieldMetadata.owner)
    expect(CommentNoteFieldMetadata.relationFieldName).toEqual('comments')
    expect(CommentNoteFieldMetadata.relationForeignKey).toEqual('noteId')
    expect(CommentNoteFieldMetadata.ownerField.name).toEqual('note')
})

