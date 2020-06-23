import { Db } from 'mongodb';
import { ModelDefinition, defaultTableNameTransform } from '@graphback/core';
import { MongoDBDataProvider, GraphbackDataProvider } from "@graphback/runtime-mongo"
import * as Agenda from "agenda";
import { isDataSyncModel } from '../util';
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';

/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
export function createDataSyncMongoDbProvider(db: Db, TTL:number = -1, jobConfig: Agenda.AgendaConfiguration = {}): (...args: any[]) => GraphbackDataProvider {
  if (jobConfig?.db === undefined && jobConfig?.mongo === undefined) {
    jobConfig.mongo = db
  }
  const agenda = new Agenda(jobConfig);
  agenda.start().catch((e: any) => {
    console.error(`Error occurred while starting job service: ${e}`)
  })
  
  return (model: ModelDefinition): GraphbackDataProvider => {
    if (isDataSyncModel(model)) {
      if (TTL >= 0) {
        const modelName = model.graphqlType.name;
        const collectionName = defaultTableNameTransform(modelName, 'to-db');
        const pruneJobName = `prune:${collectionName}`;

        // Define prune job processor for a collection
        agenda.define(pruneJobName, async (_: any, done: (e: any) => void) => {
          db.collection(collectionName).deleteMany({
            _deleted: true,
            updatedAt: {
              $lte: Date.now() - (TTL * 1000)
            }
          })
            .then(() => {
              done(undefined);
            })
            .catch((e: any) => {
              console.error('prune job failed: ', JSON.stringify(e, undefined, 4));
              done(e);
            })
        });

        // Run prune job every 10 seconds
        agenda.every('10 seconds', pruneJobName).catch((e:any) => {
          console.error(`Error: prune job for ${modelName}`)
        })

      }

      return new DataSyncMongoDBDataProvider(model.graphqlType, db)
    } else {
      return new MongoDBDataProvider(model.graphqlType, db)
    }
  }
}
