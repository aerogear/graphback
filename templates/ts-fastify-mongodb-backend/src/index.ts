// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import mercurius from 'mercurius';
import { buildGraphbackAPI } from 'graphback';
import { createMongoDbProvider } from '@graphback/runtime-mongo';
import cors from 'cors';
import fastify from 'fastify';
import http from 'http';
import { loadConfigSync } from 'graphql-config';
import { connectDB } from './db';
import { noteResolvers } from './resolvers/noteResolvers';
import middie from 'middie';

async function start() {
  const app = fastify();
  await app.register(middie);

  app.use(cors());

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
    resolvers: [resolvers, noteResolvers], 
    context: contextCreator,
    subscription: true
  }); 

  const httpServer = http.createServer((app as any));

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀  Server ready at http://localhost:4000/graphql`);
  });
}

start().catch((err: any) => console.log(err));
