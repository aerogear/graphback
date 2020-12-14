import { ApolloServer, PubSub } from "apollo-server-express";
import { Server } from "http";
import * as getPort from "get-port";
import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import { createRuntime, createMongoDBClient, DataSyncServeConfig } from './runtime';
import { MongoClient } from 'mongodb';
import { GraphbackDataProvider, GraphbackCRUDService, GraphbackAPI } from 'graphback';

const ENDPOINT = "/graphql";

export interface ServiceBuilder {
  (data: GraphbackDataProvider, sub: PubSub):
    | Promise<GraphbackCRUDService>
    | GraphbackCRUDService;
}

export class GraphbackServer {
  protected readonly graphqlSchema: string;
  protected readonly httpServer: Server;
  protected db: MongoClient;
  protected serverPort?: number;

  constructor(httpServer: Server, graphqlSchema: string, dbClient: MongoClient) {
    this.httpServer = httpServer;
    this.graphqlSchema = graphqlSchema;
    this.db = dbClient;
  }

  public async start(port?: number): Promise<void> {
    if (this.httpServer.listening) {
      // the server is already running
      return;
    }

    if (port === undefined) {
      // if no port is passed, use the previous port
      // or get a new available port
      if (this.serverPort !== undefined) {
        port = this.serverPort;
      } else {
        port = await getPort();
      }
    }

    this.httpServer.listen({ port });
    this.serverPort = port;
    console.log(`Listening at: ${this.getHttpUrl()}`);
  }

  public async stop(): Promise<void> {
    const server = this.httpServer;
    if (!server.listening) {
      return;
    }

    // convert server close to a promise
    await new Promise((resolve: (value?) => void, reject) => {
      server.close(e => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  }

  public getDb(): MongoClient {
    return this.db;
  }

  public getHttpUrl(): string {
    if (this.serverPort === undefined) {
      throw new Error(
        `can not retrieve the httpUrl because the server has not been started yet`
      );
    }

    return `http://localhost:${this.serverPort}${ENDPOINT}`;
  }

  public getHttpPort(): number {
    return this.serverPort;
  }

  public getWsUrl(): string {
    if (this.serverPort === undefined) {
      throw new Error(
        `can not retrieve the subscriptions url because the server has not been started yet`
      );
    }

    return `ws://localhost:${this.serverPort}${ENDPOINT}`;
  }

  public getSchema(): string {
    return this.graphqlSchema;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export async function buildGraphbackServer(modelDir: string, dataSyncServeConfig: DataSyncServeConfig): Promise<GraphbackServer> {
  const app = express();

  app.use(cors());

  const dbClient = await createMongoDBClient();
  const db = dbClient.db('test')

  const graphbackApi: GraphbackAPI = createRuntime(modelDir, db, dataSyncServeConfig);

  const apolloConfig = {
    typeDefs: graphbackApi.typeDefs,
    resolvers: graphbackApi.resolvers,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    context: graphbackApi.contextCreator,
    playground: true,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  }

  const apolloServer = new ApolloServer(apolloConfig);

  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  return new GraphbackServer(httpServer, graphbackApi.typeDefs, dbClient);
}

/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
