import http from 'http';
import * as dotenv from "dotenv";
import { ApolloServer } from 'apollo-server-express';
import { buildGraphbackAPI, CRUDService, GraphbackDataProvider, ModelDefinition } from 'graphback';
import { createMongoDbProvider } from '@graphback/runtime-mongo';
import cors from 'cors';
import express from 'express';
import { loadConfigSync } from 'graphql-config';
import { KafkaPubSub } from '@aerogear/graphql-kafka-subscriptions';
import { connectDB } from './db';
import { noteResolvers } from './resolvers/noteResolvers';
import { getKafkaTopicName } from './util';

// load environment variables from a .env file
dotenv.config();

async function start() {
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

  const db = await connectDB();

  const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
    dataProviderCreator: createMongoDbProvider(db),
    serviceCreator: (model: ModelDefinition, dataProvider: GraphbackDataProvider) => {
      const pubSub = new KafkaPubSub({
        topic: getKafkaTopicName(model.graphqlType.name),
        host: process.env.KAFKA_HOST || '127.0.0.1',
        port: process.env.KAFKA_PORT || '9092',
      });

      return new CRUDService(model, dataProvider, { crudOptions: model.crudOptions, pubSub })
    }
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
}

start().catch((err: any) => console.log(err));
