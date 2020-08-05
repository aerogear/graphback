import { GraphQLSchema } from 'graphql';
import { Db } from 'mongodb';
import { GraphbackAPIConfig, GraphbackAPI, buildGraphbackAPI, GraphbackConfig } from "graphback";
import { PubSub } from 'graphql-subscriptions';
import { createDataSyncMongoDbProvider, createDataSyncConflictProviderCreator } from '../providers';
import { ConflictError, ConflictMetadata, DataSyncModelConflictConfig } from "../util";
import { createDataSyncCRUDService } from '../services';
import { DataSyncPlugin } from '../DataSyncPlugin';

type DataSyncGraphbackConfig = Partial<GraphbackConfig>

export function createDataSyncAPI(model: string | GraphQLSchema, db: Db, dataSyncConfigMap: { [modelName: string]: DataSyncModelConflictConfig} = {}, graphbackConfig: DataSyncGraphbackConfig = {}): GraphbackAPI {

  return buildGraphbackAPI(model, {
    serviceCreator: createDataSyncCRUDService({ pubSub: new PubSub() }),
    ...graphbackConfig,
    dataProviderCreator: createDataSyncConflictProviderCreator(db, dataSyncConfigMap),
    plugins:[
      ...graphbackConfig.plugins || [],
      new DataSyncPlugin({ modelConfigMap: dataSyncConfigMap })
    ]
  });
}