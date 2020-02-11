
import { loadSchemaFiles } from '@graphql-toolkit/file-loading';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'graphql';
import { join } from 'path';
import { createDB } from './db'
import { createCRUDResolversRuntimeContext } from './resolvers/createContext';
import resolvers from './resolvers/resolvers'

/**
 * Creates Apollo server
 */
export const createApolloServer = async () => {
    const db = await createDB();
    const pubSub = new PubSub();

    const typeDefs = loadSchemaFiles(join(__dirname, '/schema/')).join('\n')
    const schema = buildSchema(typeDefs);
    const context = createCRUDResolversRuntimeContext({ schema, db, pubSub });
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers,
        context,
        playground: true,
    })

    return apolloServer;
}
