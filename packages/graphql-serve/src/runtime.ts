
import { GraphbackAPI, buildGraphbackAPI, filterModelTypes } from 'graphback'
import { createMongoDbProvider } from '@graphback/runtime-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { loadModel } from './loadModel';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { createDataSyncAPI, DataSyncModelConfigMap, ClientSideWins, ServerSideWins, ConflictResolutionStrategy, isDataSyncType } from "@graphback/datasync"


export type ConflictResolutionStrategyName = "clientSideWins"|"serverSideWins";

export interface DataSyncServeConfig {
  datasync: boolean,
  conflict?: ConflictResolutionStrategyName,
  deltaTTL?: number
}

export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: {};
    Mutation: {};
    Subscription: {};
  }
};

export const createMongoDBClient = async (): Promise<MongoClient> => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getConnectionString(), { useUnifiedTopology: true })
  await client.connect();

  return client
}

export function getConflictMapForModels(model: GraphQLSchema, conflictResolutionStrategy: ConflictResolutionStrategy, deltaTTL: number): DataSyncModelConfigMap {
  const map: DataSyncModelConfigMap = {};

  const dataSyncModelTypes = filterModelTypes(model).filter(isDataSyncType);

  dataSyncModelTypes.forEach((type: GraphQLObjectType) => {
    map[type.name] = {
      enabled: true,
      deltaTTL: deltaTTL,
      conflictResolution: conflictResolutionStrategy
    }
  })

  return map
}

/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
export const createRuntime = async (modelDir: string, db: Db, datasyncServeConfig: DataSyncServeConfig): Promise<GraphbackAPI> => {
  const model = await loadModel(modelDir);

  let graphbackAPI;
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
    const modelConflictMap = getConflictMapForModels(model, conflictResolutionStrategy, deltaTTL);

    graphbackAPI = createDataSyncAPI(model, {
      db,
      dataSyncConflictMap: modelConflictMap
    })

  } else {
    graphbackAPI = buildGraphbackAPI(model, {
      dataProviderCreator: createMongoDbProvider(db)
    })
  }

  return graphbackAPI;
}
