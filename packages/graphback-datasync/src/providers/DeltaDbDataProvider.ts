import { GraphQLObjectType } from 'graphql';
import { getDatabaseArguments, metadataMap, GraphbackContext, NoDataError, TransformType, FieldTransform, GraphbackOrderBy, GraphbackPage, GraphbackOperationType, QueryFilter } from '@graphback/core';
import { ObjectId } from 'mongodb';
import { MongoDBDataProvider, applyIndexes, buildQuery } from '@graphback/runtime-mongo';
import { ConflictError, ConflictStateMap } from "../util";
import { ConflictEngine } from '../conflict';
import { DataSyncProvider } from "./DataSyncProvider";
import { DeltaProvider } from "./DeltaProvider";
import { DataSyncMongoDBDataProvider } from './DatasyncMongoDBDataProvider';

/**
 * Mongo provider that attains data synchronization using soft deletes
 */
export class DeltaDBDataProvider<Type = any> extends DataSyncMongoDBDataProvider<Type> {
  protected deltaProvider: DeltaProvider;

  public constructor(baseType: GraphQLObjectType, client: any, conflictStrategy?: new() => ConflictEngine) {
    super(baseType, client, conflictStrategy);
    applyIndexes([
      {
        key: {
          timestamp: 1
        }
      },
      {
        key: {
          docId: 1
        }
      }
    ], this.db.collection(this.collectionName)).catch((e: any) => {
      throw e;
    });
    this.deltaProvider = new DeltaProvider(baseType, client);
  }

  public async create(data: any, context: GraphbackContext): Promise<Type> {
    data._deleted = false;

    const res = await super.create(data, context);

    this.deltaProvider.insertDiff(data, GraphbackOperationType.CREATE).catch((e: any) => {
      console.error(`Error: Couldn't insert into delta table: ${e}`);
    })
    
    return this.mapFields(res);
  }

  public async update(data: any, context: GraphbackContext): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    const res = await super.update(data, context);

    const objectId = new ObjectId(idField.value);

    this.deltaProvider.insertDiff({ ...data, id: objectId}, GraphbackOperationType.UPDATE).catch((e: any) => {
      console.error(`Error: Couldn't insert into delta table: ${e}`);
    })

    return res;
  }

  public async delete(data: any, context: GraphbackContext): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    const res = await super.delete(data, context);

    const objectId = new ObjectId(idField.value);
    this.deltaProvider.insertDiff({ ...data, id: objectId}, GraphbackOperationType.DELETE).catch((e: any) => {
      console.error(`Error: Couldn't insert into delta table: ${e}`);
    })

    return res;
  }

  public sync(lastSync: string, context: GraphbackContext, filter?: QueryFilter): Promise<Type[]> {

    return this.deltaProvider.sync(parseInt(lastSync, 10), buildQuery(filter)).then((res: any[]) => {
      return res.map((doc: any) => {
        return this.mapFields(doc);
      }) // TODO: Discuss benefits and limitations
    });
  }

  protected async getServerState(clientSets: any) {
    const { idField } = getDatabaseArguments(this.tableMap, clientSets);

    if (!idField.value) {
      throw new NoDataError(`Couldn't get document from ${this.collectionName} - missing ID field`)
    }

    const serverResult = await this.deltaProvider.sync(parseInt(clientSets.updatedAt, 10), { _id: new ObjectId(idField.value)});

    return serverResult[0];
  }
}
