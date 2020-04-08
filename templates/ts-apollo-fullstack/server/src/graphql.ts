import { ApolloServer, PubSub } from 'apollo-server-express';
import { createKnexPGCRUDRuntimeServices } from "@graphback/runtime-knex"
import { models } from './resolvers/models';
import resolvers from './resolvers/resolvers'
import { getProjectConfig, createDB } from './utils';

/**
 * Creates Apollo server
 */
export const createApolloServer = () => {
    const db = createDB();

    const pubSub = new PubSub();

    const projectConfig = getProjectConfig()

    const schema = projectConfig.getSchemaSync()
    const typeDefs = projectConfig.getSchemaSync('DocumentNode')

    const context = createKnexPGCRUDRuntimeServices(models, schema, db, pubSub);
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        playground: true,
    })

    return apolloServer;
}
