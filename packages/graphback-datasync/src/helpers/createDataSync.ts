import { GraphQLSchema } from 'graphql';
import { Db } from 'mongodb';
import { GraphbackAPIConfig, GraphbackAPI, buildGraphbackAPI } from "graphback";
import { PubSub } from 'graphql-subscriptions';
import { createDataSyncMongoDbProvider, createDataSyncConflictProviderCreator } from '../providers';
import { ConflictError, ConflictMetadata, DataSyncModelConflictConfig, DataSyncModelConfigMap } from "../util";
import { createDataSyncCRUDService } from '../services';
import { DataSyncPlugin } from '../DataSyncPlugin';

type DataSyncGraphbackAPIConfig = Omit<GraphbackAPIConfig, "dataProviderCreator">

export function createDataSyncAPI(model: string | GraphQLSchema, createDataSyncConfig: { db: Db,  dataSyncConflictMap?: DataSyncModelConfigMap, graphbackAPIConfig?: DataSyncGraphbackAPIConfig }): GraphbackAPI {
  const { db, dataSyncConflictMap, graphbackAPIConfig } = createDataSyncConfig

  return buildGraphbackAPI(model, {
    ...graphbackAPIConfig,
    serviceCreator: graphbackAPIConfig?.serviceCreator || createDataSyncCRUDService(),
    dataProviderCreator: createDataSyncConflictProviderCreator(db, dataSyncConflictMap),
    plugins:[
      ...(graphbackAPIConfig?.plugins || []),
      new DataSyncPlugin({ modelConfigMap: dataSyncConflictMap })
    ]
  });
}