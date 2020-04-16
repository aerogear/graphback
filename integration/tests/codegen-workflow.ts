/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync, rmdirSync } from 'fs';
import * as path from 'path';
import { ApolloServer, PubSub, gql } from "apollo-server";
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { loadConfig } from 'graphql-config';
import { loadResolversFiles } from '@graphql-toolkit/file-loading';
import { loadDocuments } from '@graphql-toolkit/core';
import { GraphQLFileLoader } from '@graphql-toolkit/graphql-file-loader';
import * as Knex from 'knex';
import { migrateDB } from '../../packages/graphql-migrations/src';
import { GraphbackGenerator } from "../../packages/graphback/src";
import { createKnexPGCRUDRuntimeServices } from "../../packages/graphback-runtime-knex/src"

/** global config */
let client: any;
let db: Knex;

beforeAll(async (done) => {
    const { projectConfig, graphbackConfig, dbMigrationsConfig } = await getConfig();

    const modelText = readFileSync(graphbackConfig.model, 'utf8');
    const generator = new GraphbackGenerator(modelText, graphbackConfig);
    generator.generateSourceCode();

    const schemaString = await projectConfig.getSchema('string');
    expect(schemaString).toMatchSnapshot();

    const knex = Knex(dbMigrationsConfig);
    await knex.schema.dropTableIfExists('comment').dropTableIfExists('commentmetadata').dropTableIfExists('note')

    const schema = await projectConfig.getSchema();
    const { newDB } = await migrateDB(dbMigrationsConfig, schema);

    expect(newDB).toMatchSnapshot();

    await seedDatabase(knex);

    const resolvers = loadResolversFiles([
        path.resolve('./output/resolvers/resolvers.ts'),
        path.resolve('./mocks/resolvers/resolvers.ts')
    ])

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { models } = require('../output/resolvers/models');

    const pubSub = new PubSub();
    const context = createKnexPGCRUDRuntimeServices(models, schema, knex, pubSub);

    const server = new ApolloServer({
        typeDefs: await projectConfig.getSchema('DocumentNode'),
        resolvers,
        context
    });

    client = createTestClient(server);
    db = knex;

    done();
})

afterAll(async (done) => {
    rmdirSync(path.resolve('./output'), { recursive: true });
    await db.destroy();
    done();
});

async function seedDatabase(db: Knex) {
    await db('note').insert([
        {
            title: 'Note A',
            description: 'Note A Description'
        },
        {
            title: 'Note B',
            description: 'Note B Description'
        }
    ]);

    await db('commentmetadata').insert([
        {
            opened: true
        },
        {
            opened: false
        }
    ])

    await db('comment').insert([
        {
            text: 'Note A Comment',
            description: 'Note A Comment Description',
            noteId: 1,
            metadataId: 1
        },
        {
            text: 'Note A Comment 2',
            description: 'Note A Comment Description',
            noteId: 1,
            metadataId: 2
        }
    ]);
}

const getConfig = async () => {
    const config = await loadConfig({
        rootDir: process.cwd(),
        extensions: [
            () => ({ name: 'graphback' }),
            () => ({ name: 'dbmigrations' })
        ]
    });

    const projectConfig = config.getDefault();
    const graphbackConfig = projectConfig.extension('graphback');
    const dbMigrationsConfig = projectConfig.extension('dbmigrations');

    return { projectConfig, graphbackConfig, dbMigrationsConfig };
}

/**
 * Helper to load a client document from a file
 *
 * @param name Client document name
 */
async function getDocument(name: string) {
    const documents = await loadDocuments(path.resolve(`./output/client/**/${name}.graphql`), {
        loaders: [
            new GraphQLFileLoader()
        ]
    });

    return documents[0];
}

test('Find all notes', async (done) => {
    const { document } = await getDocument('findAllNotes');

    const { data } = await client.query({ query: document });

    expect(data).toBeDefined();
    expect(data.findAllNotes).toEqual([
        {
            id: '1',
            title: 'Note A',
            description: 'Note A Description',
            comments: [
                {
                    id: '1',
                    text: 'Note A Comment',
                    description: 'Note A Comment Description'
                },
                {
                    id: '2',
                    text: 'Note A Comment 2',
                    description: 'Note A Comment Description'
                }
            ]
        },
        {
            id: '2',
            title: 'Note B',
            description: 'Note B Description',
            comments: []
        }
    ])

    done();
})

test('Find all notes except the first', async (done) => {
    const { document } = await getDocument('findAllNotes');

    const { data } = await client.query({ query: document, variables: { offset: 1 } });

    expect(data).toBeDefined();
    expect(data.findAllNotes).toEqual([
        {
            id: '2',
            title: 'Note B',
            description: 'Note B Description',
            comments: []
        }
    ])

    done();
})

test('Find at most one note', async (done) => {
    const { document } = await getDocument('findAllNotes');

    const { data } = await client.query({ query: document, variables: { limit: 1 } });

    expect(data).toBeDefined();
    expect(data.findAllNotes).toEqual([
        {
            id: '1',
            title: 'Note A',
            description: 'Note A Description',
            comments: [
                {
                    id: '1',
                    text: 'Note A Comment',
                    description: 'Note A Comment Description'
                },
                {
                    id: '2',
                    text: 'Note A Comment 2',
                    description: 'Note A Comment Description'
                }
            ]
        },
    ])

    done();
})

test('Find all comments', async done => {
    const { document } = await getDocument('findAllComments');

    const { data } = await client.query({ query: document });

    expect(data).toBeDefined();
    expect(data.findAllComments).toEqual([
        {
            id: '1',
            text: 'Note A Comment',
            description: 'Note A Comment Description',
            note: {
                id: '1',
                title: 'Note A',
                description: 'Note A Description'
            },
            metadata: {
                id: '1',
                opened: true
            }
        },
        {
            id: '2',
            text: 'Note A Comment 2',
            description: 'Note A Comment Description',
            note: {
                id: '1',
                title: 'Note A',
                description: 'Note A Description'
            },
            metadata: {
                id: '2',
                opened: false
            }
        }
    ])

    done();
})

test('Note 1 should be defined', async (done) => {
    const response = await findNote('1', client);
    expect(response.data).toBeDefined();
    const notes = response.data.findNotes;
    expect(notes).toEqual([{
        id: '1',
        title: 'Note A',
        description: 'Note A Description',
        comments: [
            {
                id: '1',
                text: 'Note A Comment',
                description: 'Note A Comment Description'
            },
            {
                id: '2',
                text: 'Note A Comment 2',
                description: 'Note A Comment Description'
            }
        ]
    }]);

    done();
})

test('Note 1 Comments exists', async (done) => {
    const response = await findNoteComments('1', client);
    expect(response.data).toBeDefined()
    expect(response.data.findComments).toHaveLength(2);

    done();
})

test('Find at most one comment on Note 1', async (done) => {

    const { document } = await getDocument('findComments');

    const response = await client.query({ query: document, variables: { filter: { noteId: 1 }, limit: 1 } });

    expect(response.data).toBeDefined()
    const notes = response.data.findComments
    expect(notes).toHaveLength(1);
    expect(notes).toEqual([
        {
            id: '1',
            text: 'Note A Comment',
            description: 'Note A Comment Description',
            metadata: {
                id: "1",
                opened: true,
            },
            note: {
                description: "Note A Description",
                id: "1",
                title: "Note A",
            },
        }
    ])

    done();
})

test('Find comments on Note 1 except first', async (done) => {

    const { document } = await getDocument('findComments');

    const response = await client.query({ query: document, variables: { filter: { noteId: 1 }, offset: 1 } });

    expect(response.data).toBeDefined()
    const notes = response.data.findComments
    expect(notes).toHaveLength(1);
    expect(notes).toEqual([
        {
            id: '2',
            text: 'Note A Comment 2',
            description: 'Note A Comment Description',
            metadata: {
                "id": "2",
                "opened": false,
            },
            note: {
                "description": "Note A Description",
                "id": "1",
                "title": "Note A",
            },
        }
    ])

    done();
})

test('Should update Note 1 title', async (done) => {
    const response = await updateNote({ id: '1', title: 'Note 1 New Title' }, client);
    expect(response.data).toBeDefined();
    expect(response.data.updateNote.title).toBe('Note 1 New Title');

    done();
});

test('Should create a new Note', async (done) => {
    const response = await createNote(client, { title: 'New note', description: 'New note description' });
    expect(response.data).toBeDefined();
    expect(response.data.createNote).toEqual({ id: '3', title: 'New note', description: 'New note description' });

    done();
})

test('Delete Note 1', async done => {
    const response = await deleteNote(client, { id: '2', title: 'Note B' });
    expect(response.data).toBeDefined();
    expect(response.data.deleteNote).toEqual({ id: '2', description: 'Note B Description', title: 'Note B' });

    done();
});

test('Test custom query', async done => {
    const document = gql`
        query {
            helloWorld
        }
    `;
    const response = await client.query({ query: document })

    expect(response.data).toEqual({ helloWorld: 'Hello!' });

    done();
})

async function updateNote(data: any, client: ApolloServerTestClient) {
    const { document } = await getDocument('updateNote');

    const response = await client.mutate({ mutation: document, variables: { data } });

    return response;
}

async function createNote(client: ApolloServerTestClient, data: any) {
    const { document } = await getDocument('createNote');

    const response = await client.mutate({ mutation: document, variables: { data } });

    return response;
}

async function deleteNote(client: ApolloServerTestClient, data: any) {
    const { document } = await getDocument('deleteNote');

    const response = await client.mutate({ mutation: document, variables: { data } });

    return response;
}

async function findNote(id: string, client: ApolloServerTestClient) {
    const { document } = await getDocument('findNotes');

    const response = await client.query({ query: document, variables: { filter: { id } } });

    return response;
}

async function findNoteComments(noteId: string, client: ApolloServerTestClient) {
    const { document } = await getDocument('findComments');

    const response = await client.query({ query: document, variables: { filter: { noteId } } });

    return response;
}

