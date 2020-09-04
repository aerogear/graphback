// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildGraphbackAPI } from 'graphback';
import { loadDBConfig, connectDB } from './db';
import { migrateDB, removeNonSafeOperationsFilter } from 'graphql-migrations';
import { createKnexDbProvider } from '@graphback/runtime-knex';
import { noteResolvers } from './resolvers/noteResolvers';
import { loadConfigSync } from 'graphql-config';

const app = express();

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

const db = connectDB();
const dbConfig = loadDBConfig();

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: createKnexDbProvider(db)
});

migrateDB(dbConfig, typeDefs, {
  operationFilter: removeNonSafeOperationsFilter
}).then(() => {
  console.log('Migrated database');
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [resolvers, noteResolvers],
  context: contextCreator
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at http://localhost:4000/graphql`);
});
