import { sqliteInMemoryDatabaseBuilder } from "./SQLiteDatabase";
import {
  buildGraphbackServer,
  GraphbackServer,
  ServiceBuilder
} from "./GraphbackServer";
import { graphQLInputContext, InputModelTypeContext } from "@graphback/core";
import { GraphbackClient, buildGraphbackClient } from "./GraphbackClient";
import { TestxApi, StringDic } from "./TestxApi";
import { DatabaseImportData, DatabaseSchema, Database } from "./Database";

/**
 * Graphback configuration for generating the graphql resolvers.
 * @constant
 */
const DEFAULT_CONFIG = {
  create: true,
  update: true,
  findAll: true,
  find: true,
  delete: true,
  subCreate: true,
  subUpdate: true,
  subDelete: true,
  disableGen: false
};

export interface TestxServerOptions {
  schema: string;
  /**
   * Custom service layer
   *
   * @experimental
   */
  serviceBuilder?: ServiceBuilder;

  /**
   * Custom database
   *
   * @experimental
   */
  database?: Database;
}

/**
 * Describes a TestxServer. A TestxServer generates a GraphQL server from a data
 * model with the resolvers, mutations, type defs and connection with a real
 * in-memory database, and exposes it in a url.
 *
 * @example
 * const server = new TestxServer({
 *  schema: `
 *    type Item {
 *      id: ID!
 *      name: String
 *      title: String!
 *    }
 *  `
 * });
 * await server.start();
 * console.log(`Running on ${await server.httpUrl()}`);
 * await server.close();
 */
export class TestxServer implements TestxApi {
  protected readonly options: TestxServerOptions;
  protected readonly context: InputModelTypeContext[];
  protected client?: GraphbackClient;
  protected server?: GraphbackServer;
  protected database?: Database;

  /**
   * Create a TestxServer.
   * @param options.schema - The Graphback data model definition
   * @param options.serviceBuilder - Function to overwrite the default GraphbackCRUDService
   * @see {@link https://graphback.dev/docs/datamodel|Grahpback data model definition}
   */
  constructor(options: TestxServerOptions) {
    this.options = options;

    this.context = graphQLInputContext.createModelContext(
      options.schema,
      DEFAULT_CONFIG
    );
  }

  /**
   * Executes the bootstrap() method to generate the GraphQL backend and initialize
   * the server.
   * Starts the GraphQL server exposing it in http://localhost:port/graphql,
   * the port is random.
   * The full url server can be retrieved by httpUrl() method after the server starts.
   */
  public async start(): Promise<void> {
    await this.bootstrap();

    if (this.server === undefined) {
      // should be impossible until the bootstrap method create it
      throw new Error("server is undefined");
    }

    await this.server.start();
  }

  /**
   * Stops the server to receive requests, but keeps the generated GraphQL backend
   * and database connection.
   * The server can be resumed with the stored GraphQL backend and database
   * connection by using start() method.
   */
  public async stop(): Promise<void> {
    if (this.server !== undefined) {
      await this.server.stop();
    }
  }

  /**
   * Close and destroy, the GraphQl server and the database.
   */
  public async close(): Promise<void> {
    await this.stop();

    if (this.database !== undefined) {
      await this.database.close();
    }

    this.server = undefined;
    this.database = undefined;
  }

  /**
   * Clears all database data.
   */
  public async cleanDatabase(): Promise<void> {
    if (this.database !== undefined) {
      await this.database.clean();
    }
  }

  /**
   * Get the server URL.
   * This URL is used to make basic queries and mutations.
   */
  public async httpUrl(): Promise<string> {
    if (this.server === undefined) {
      throw new Error(
        `can not retrieve the http url from undefined server, ` +
          `use bootstrap() or start() in order to initialize the server`
      );
    }

    return Promise.resolve(this.server.getHttpUrl());
  }

  /**
   * Get the subscriptions URL.
   * This URL is used to make subscription queries.
   */
  public async wsUrl(): Promise<string> {
    if (this.server === undefined) {
      throw new Error(
        `can not retrieve the subscriptions url from undefined server, ` +
          `use bootstrap() or start() in order to initialize the server`
      );
    }

    return Promise.resolve(this.server.getWsUrl());
  }

  /**
   * Get the generated GraphQL schema.
   * Only returns the GraphQL schema if it's called after using bootstrap() or
   * start() methods.
   */
  public async getGraphQlSchema(): Promise<string> {
    if (this.server === undefined) {
      throw new Error(
        `can not retrieve the graphql schema from undefined server, ` +
          `use bootstrap() or start() in order to initialize the server`
      );
    }

    return Promise.resolve(this.server.getSchema());
  }

  /**
   * Get the generated database schema.
   * Only returns the database schema if it's called after using bootstrap() or
   * start() methods.
   * @return {Object} An object containing the name of the tables as properties, each property has as value the info about the corresponding table
   */
  public async getDatabaseSchema(): Promise<DatabaseSchema> {
    if (this.database === undefined) {
      throw new Error(
        `can not retrieve database schema from undefined database, ` +
          `use bootstrap() or start() in order to initialize the database`
      );
    }

    return await this.database.getSchema();
  }

  /**
   * Inserts the data directly in the database.
   * Which means that the data doesn't pass through any mutation.
   * @param {Object[]} data - Data to insert
   */
  public async setData(data: DatabaseImportData): Promise<void> {
    if (this.database === undefined) {
      throw new Error(
        `can not import data into undefined database, ` +
          `use bootstrap() or start() in order to initialize the database`
      );
    }

    await this.database.importData(data);
  }

  protected async buildDatabase(): Promise<Database> {
    if (this.options.database) {
      return this.options.database;
    }

    return await sqliteInMemoryDatabaseBuilder(this.options.schema);
  }

  protected async buildServer(): Promise<GraphbackServer> {
    if (this.database === undefined) {
      throw new Error(`the database must be bootstrap before the server`);
    }

    return await buildGraphbackServer(
      this.context,
      this.database.getProvider(),
      this.options.serviceBuilder
    );
  }

  protected async buildClient(): Promise<GraphbackClient> {
    return await buildGraphbackClient(this.context);
  }

  /**
   * Bootstraps the TestxServer, generating the GraphQL backend with the
   * database connection, client queries and mutations and filling in some
   * properties needed to start the server.
   */
  public async bootstrap(): Promise<void> {
    if (this.database === undefined) {
      this.database = await this.buildDatabase();
    }

    if (this.server === undefined) {
      this.server = await this.buildServer();
    }

    if (this.client === undefined) {
      this.client = await this.buildClient();
    }
  }

  /**
   * Get the generated client queries.
   * @return {Object} An object containing the queries as properties
   */
  public async getQueries(): Promise<StringDic> {
    if (this.client === undefined) {
      throw new Error(
        `can not retrieve client queries from undefined client, ` +
          `use bootstrap() or start() in order to initialize the client`
      );
    }

    return Promise.resolve(this.client.getQueries());
  }

  /**
   * Get the generated client mutations.
   * @return {Object} An object containing the mutations as properties
   */
  public async getMutations(): Promise<StringDic> {
    if (this.client === undefined) {
      throw new Error(
        `can not retrieve client mutations from undefined client, ` +
          `use bootstrap() or start() in order to initialize the client`
      );
    }

    return Promise.resolve(this.client.getMutations());
  }

  /**
   * Get the generated client subscriptions.
   * @return {Object} An object containing the subscriptions as properties
   */
  public async getSubscriptions(): Promise<StringDic> {
    if (this.client === undefined) {
      throw new Error(
        `can not retrieve client subscriptions from undefined client, ` +
          `use bootstrap() or start() in order to initialize the client`
      );
    }

    return Promise.resolve(this.client.getSubscriptions());
  }
}
