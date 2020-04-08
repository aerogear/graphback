import { ApolloServer, PubSub } from 'apollo-server-express';
import { createKnexPGCRUDRuntimeServices } from "@graphback/runtime-knex"
import { models } from './resolvers/models';
import resolvers from './resolvers/resolvers'
import { getProjectConfig, createDB } from './utils';

/**
 * Creates Apollo server
 */
export const createApolloServer = async () => {
    const db = createDB();

    const pubSub = new PubSub();

    const projectConfig = await getProjectConfig()

    const schema = await projectConfig.getSchema()
    const typeDefs = await projectConfig.getSchema('DocumentNode')

    const context = createKnexPGCRUDRuntimeServices(models, schema, db, pubSub);
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        playground: true,
    })

    return apolloServer;
}
