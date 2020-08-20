import { GraphQLSchema } from 'graphql';
import { Db } from 'mongodb';
import { GraphbackAPIConfig, GraphbackAPI, buildGraphbackAPI } from "graphback";
import { PubSub } from 'graphql-subscriptions';
import { createDataSyncMongoDbProvider, createDataSyncConflictProviderCreator } from '../providers';
import { ConflictError, ConflictMetadata, DataSyncModelConflictConfig, DataSyncModelConfigMap, GlobalConflictConfig } from "../util";
import { createDataSyncCRUDService } from '../services';
import { DataSyncPlugin } from '../DataSyncPlugin';

type DataSyncGraphbackAPIConfig = Omit<GraphbackAPIConfig, "dataProviderCreator">

export function createDataSyncAPI(model: string | GraphQLSchema, createDataSyncConfig: { db: Db,  conflictConfig?: GlobalConflictConfig, graphbackAPIConfig?: DataSyncGraphbackAPIConfig }): GraphbackAPI {
  const { db, conflictConfig, graphbackAPIConfig } = createDataSyncConfig;

  return buildGraphbackAPI(model, {
    ...graphbackAPIConfig,
    serviceCreator: graphbackAPIConfig?.serviceCreator || createDataSyncCRUDService(),
    dataProviderCreator: createDataSyncConflictProviderCreator(db, conflictConfig),
    plugins:[
      ...(graphbackAPIConfig?.plugins || []),
      new DataSyncPlugin({ conflictConfig })
    ]
  });
}