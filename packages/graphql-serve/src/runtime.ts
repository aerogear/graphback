
import { GraphbackAPI, buildGraphbackAPI } from 'graphback'
import { createMongoDbProvider } from '@graphback/runtime-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { loadModel } from './loadModel';
import { GraphQLSchema } from 'graphql';
import { createDataSyncAPI, ClientSideWins, ServerSideWins } from "@graphback/datasync"
import { IResolverObject } from 'apollo-server-express';


export type ConflictResolutionStrategyName = "clientSideWins"|"serverSideWins";

export interface DataSyncServeConfig {
  datasync: boolean,
  conflict?: ConflictResolutionStrategyName,
  deltaTTL?: number
}

export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: Record<string, IResolverObject>;
    Mutation: Record<string, IResolverObject>;
    Subscription: Record<string, IResolverObject>;
  }
};

export const createMongoDBClient = async (): Promise<MongoClient> => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true })
  await client.connect();

  return client
}

/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
export const createRuntime = async (modelDir: string, db: Db, datasyncServeConfig: DataSyncServeConfig): Promise<GraphbackAPI> => {
  const model = await loadModel(modelDir);

  let graphbackAPI: GraphbackAPI;
  if (datasyncServeConfig.datasync) {
    let conflictResolutionStrategy = ClientSideWins;
    let deltaTTL = 172800;
    if (datasyncServeConfig.conflict === "clientSideWins") {
      conflictResolutionStrategy = ClientSideWins;
    }
    if (datasyncServeConfig.conflict === "serverSideWins") {
      conflictResolutionStrategy = ServerSideWins;
    }

    if (datasyncServeConfig.deltaTTL !== undefined && datasyncServeConfig.deltaTTL !== null) {
      deltaTTL = datasyncServeConfig.deltaTTL
    }

    graphbackAPI = createDataSyncAPI(model, {
      db,
      conflictConfig: {
        enabled: true,
        conflictResolution: conflictResolutionStrategy,
        deltaTTL
      }
    })

  } else {
    graphbackAPI = buildGraphbackAPI(model, {
      dataProviderCreator: createMongoDbProvider(db)
    })
  }

  return graphbackAPI;
}
