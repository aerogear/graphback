import { Db } from 'mongodb';
import { GraphQLSchema } from 'graphql';
import { GraphbackAPIConfig, GraphbackAPI, buildGraphbackAPI } from "graphback";
import { GlobalConflictConfig } from "../util";
import { DataSyncPlugin } from '../DataSyncPlugin';
import { createDataSyncCRUDService } from '../services';
import { createDataSyncConflictProviderCreator } from '../providers';

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
