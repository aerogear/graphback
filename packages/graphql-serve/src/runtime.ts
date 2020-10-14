
import { GraphbackAPI, buildGraphbackAPI } from 'graphback'
import { createMongoDbProvider } from '@graphback/runtime-mongo'
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient, Db } from 'mongodb';
import { loadModel } from './loadModel';
import { GraphQLSchema } from 'graphql';
import { createDataSyncAPI, ClientSideWins, ServerSideWins, ConflictResolutionStrategy, ThrowOnConflict } from "@graphback/datasync"
import { IResolverObject } from 'apollo-server-express';


export type ConflictResolutionStrategyName = keyof typeof ConflictStrategyMap;

export const ConflictStrategyMap = {
  clientSideWins: ClientSideWins,
  serverSideWins: ServerSideWins,
  throwOnConflict: ThrowOnConflict
};

export interface DataSyncServeConfig {
  datasync: boolean,
  conflict?: ConflictResolutionStrategyName,
  deltaTTL?: number
}

export interface Runtime {
  schema: GraphQLSchema;
  resolvers: {
    Query: IResolverObject;
    Mutation: IResolverObject;
    Subscription: IResolverObject;
  }
};

export const createMongoDBClient = async (): Promise<MongoClient> => {
  const server = new MongoMemoryServer();
  const client = new MongoClient(await server.getUri(), { useUnifiedTopology: true })
  await client.connect();

  return client
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
export function createRuntime (modelDir: string, db: Db, datasyncServeConfig: DataSyncServeConfig): GraphbackAPI {
  const model = loadModel(modelDir);

  if (datasyncServeConfig.datasync) {
    let conflictResolutionStrategy: ConflictResolutionStrategy = ClientSideWins;
    let deltaTTL = 172800;
    if (datasyncServeConfig.conflict) {
      conflictResolutionStrategy = ConflictStrategyMap[datasyncServeConfig.conflict];
    }

    if (datasyncServeConfig.deltaTTL !== undefined && datasyncServeConfig.deltaTTL !== null) {
      deltaTTL = datasyncServeConfig.deltaTTL
    }

    return createDataSyncAPI(model, {
      db,
      conflictConfig: {
        enabled: true,
        conflictResolution: conflictResolutionStrategy,
        deltaTTL
      }
    });

  }

  return buildGraphbackAPI(model, { dataProviderCreator: createMongoDbProvider(db) });
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-return */
