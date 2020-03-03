import { ApolloServer, PubSub } from "apollo-server-express";
import {
  GraphbackDataProvider,
  GraphbackCRUDService
} from "@graphback/runtime";
import { Server } from "http";
import getPort from "get-port";
import cors from "cors"
import express from "express"
import http from "http"
import { createRuntime } from './runtime'
import { getGraphbackConfig } from "./db";
import { printSchema } from 'graphql';
import path from "path";

const ENDPOINT = "/graphql";

export interface ServiceBuilder {
  (data: GraphbackDataProvider, sub: PubSub):
    | Promise<GraphbackCRUDService>
    | GraphbackCRUDService;
}

export class GraphbackServer {
  protected readonly graphqlSchema: string;
  protected readonly httpServer: Server;
  protected serverPort?: number;

  constructor(httpServer: Server, graphqlSchema: string) {
    this.httpServer = httpServer;
    this.graphqlSchema = graphqlSchema;
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

    this.httpServer.listen({ port }, () => console.log(`Listening at: ${port}`));
    this.serverPort = port;
  }

  public async stop(): Promise<void> {
    const server = this.httpServer;
    if (!server.listening) {
      return;
    }

    // convert server close to a promise
    await new Promise((resolve, reject) => {
      server.close(e => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  }

  public getHttpUrl(): string {
    if (this.serverPort === undefined) {
      throw new Error(
        `can not retrieve the httpUrl because the server has not been started yet`
      );
    }

    return `http://localhost:${this.serverPort}${ENDPOINT}`;
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

export async function buildGraphbackServer(graphbackConfigOpts?: any) {
  const app = express();

  app.use(cors());

  if (!graphbackConfigOpts) graphbackConfigOpts = await getGraphbackConfig(path.join(__dirname, ".."));

  // connect to db
  const runtime = await createRuntime(graphbackConfigOpts);

  const apolloConfig = {
    typeDefs: printSchema(runtime.schema),
    resolvers: runtime.resolvers,
    playground: true,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  }

  const apolloServer = new ApolloServer(apolloConfig);

  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  return new GraphbackServer(httpServer, printSchema(runtime.schema));
}
