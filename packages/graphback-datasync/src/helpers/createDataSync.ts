import { Db } from 'mongodb';
import { GraphQLSchema } from 'graphql';
import { GraphbackAPIConfig, GraphbackAPI, buildGraphbackAPI } from "graphback";
import { GlobalConflictConfig } from "../util";
import { DataSyncPlugin } from '../DataSyncPlugin';
import { createDataSyncCRUDService } from '../services';
import { createDataSyncConflictProviderCreator } from '../providers';

type DataSyncGraphbackAPIConfig = Omit<GraphbackAPIConfig, "dataProviderCreator">

/**
 * Config to create a Graphback DataSync API
 */
export interface DataSyncAPIConfig {
  /**
   * MongoDB driver
   */
  db: Db, 
  /**
   * Conflict configmap for the data models
   */
  conflictConfig?: GlobalConflictConfig
  /**
   * GraphbackAPI config
   */
  graphbackAPIConfig?: DataSyncGraphbackAPIConfig
}

export function createDataSyncAPI(model: string | GraphQLSchema, createDataSyncConfig: DataSyncAPIConfig): GraphbackAPI {
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
