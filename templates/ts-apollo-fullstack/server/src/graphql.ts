import { ApolloServer, PubSub } from 'apollo-server-express';
import { createKnexPGCRUDRuntimeServices } from "@graphback/runtime-knex"
import { loadConfigSync } from 'graphql-config'
import { models } from './resolvers/models';
import graphbackResolvers from './resolvers/graphbackResolvers';
import { connectDB } from './db';

/**
 * Creates Apollo server
 */
export const createApolloServer = () => {
  const db = connectDB();

  const projectConfig = loadConfigSync({
    extensions: [
      () => ({ name: 'graphback' }),
      () => ({ name: 'dbmigrations' })
    ]
  }).getDefault()

  const pubSub = new PubSub();

  const schema = projectConfig.getSchemaSync()
  const typeDefs = projectConfig.getSchemaSync('DocumentNode')

  const context = createKnexPGCRUDRuntimeServices(models, schema, db, pubSub);
  const apolloServer = new ApolloServer({
    typeDefs,
    graphbackResolvers,
    context,
    playground: true,
  })

  return apolloServer;
}
