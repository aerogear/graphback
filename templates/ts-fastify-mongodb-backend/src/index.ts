/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import mercurius from 'mercurius';
import { buildGraphbackAPI } from 'graphback';
import { createMongoDbProvider } from '@graphback/runtime-mongo';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import { loadConfigSync } from 'graphql-config';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { connectDB } from './db';
import { noteResolvers } from './resolvers/noteResolvers';
import {mergeResolvers} from '@graphql-tools/merge';

async function start() {
  const app = fastify();

  app.register(fastifyCors as any);

  const graphbackExtension = 'graphback';
  const config = loadConfigSync({
    extensions: [
      () => ({
        name: graphbackExtension
      })
    ]
  });

  const projectConfig = config.getDefault();
  const graphbackConfig = projectConfig.extension(graphbackExtension);

  const modelDefs = projectConfig.loadSchemaSync(graphbackConfig.model);

  const db = await connectDB();

  const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
    dataProviderCreator: createMongoDbProvider(db)
  });

  const schema = makeExecutableSchema({
    typeDefs, resolvers: [
      resolvers,
      noteResolvers
    ]
  })

  app.register((mercurius as any), {
    schema,
    resolvers: mergeResolvers([resolvers,noteResolvers]),
    graphiql: true,
    context: contextCreator,
    subscription: true
  });

  app.listen(4000, () => {
    console.log(`🚀  Server ready at http://localhost:4000/graphql`);
    console.log(`🚀  GraphQL IDE ready at http://localhost:4000/graphiql`);
  });
}

start().catch((err: any) => console.log(err));
