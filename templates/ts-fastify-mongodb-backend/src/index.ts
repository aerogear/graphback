// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import mercurius from 'mercurius';
import { buildGraphbackAPI } from 'graphback';
import { createMongoDbProvider } from '@graphback/runtime-mongo';
import fastify from 'fastify';
import fastifyCors  from 'fastify-cors';
import { loadConfigSync } from 'graphql-config';
import { connectDB } from './db';
import { noteResolvers } from './resolvers/noteResolvers';
import { mergeResolvers } from '@graphql-tools/merge';

async function start() {
  const app = fastify();

  app.register(fastifyCors, {});

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

  app.register((mercurius as any), {
    schema: typeDefs,
    graphiql: true,
    resolvers: mergeResolvers([resolvers, noteResolvers]),
    context: contextCreator,
    subscription: true
  });

  app.listen(4000, () => {
    console.log(`🚀  Server ready at http://localhost:4000/graphql`);
    console.log(`🚀  GraphQL IDE ready at http://localhost:4000/graphiql`);
  });
}

start().catch((err: any) => console.log(err));
