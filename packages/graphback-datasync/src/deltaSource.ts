import { ModelDefinition, getTableName } from '@graphback/core';
import { Db } from "mongodb";
import { applyIndexes } from '@graphback/runtime-mongo';
import { DataSyncFieldNames } from './util';

export function getDeltaTableName(tableName: string) {
  return `${tableName}Delta`
}

/**
 * Provides the ability to insert delta snapshots into MongoDB collections
 * and get base for conflict resolution
 */
export class MongoDeltaSource<Type = any> {
  protected db: Db;
  protected collectionName: string;
  protected deltaTTL: number;
  public constructor(model: ModelDefinition, db: Db, deltaTTL: number) {
    this.db = db;
    this.collectionName = getDeltaTableName(getTableName(model.graphqlType));
    this.deltaTTL = deltaTTL;
    applyIndexes([
      {
        key: {
          [DataSyncFieldNames.ttl]: 1
        },
        expireAfterSeconds: 0
      }
    ], this.db.collection(this.collectionName)).catch((e: any) => {
      // eslint-disable-next-line no-console
      console.error(`Could not create TTL Index for delta table: ${this.collectionName}: ${e}`)
    })
  }

  public async insertDiff(updatedDocument: Type) {
    const { _id, [DataSyncFieldNames.version]: version } = (updatedDocument as any);

    const diff: any = {
      docId: _id,
      [DataSyncFieldNames.version]: version,
      document: updatedDocument,
      [DataSyncFieldNames.ttl]: new Date(Date.now() + (this.deltaTTL * 1000))
    }
    await this.db.collection(this.collectionName).insertOne(diff);
  }

  public async findBaseForConflicts(updateDocument: any): Promise<Type> {
    if (!updateDocument._id || !updateDocument[DataSyncFieldNames.version]) {
      throw new Error(`Both _id and ${DataSyncFieldNames.version} field are needed for finding base`);
    }

    const filter = {
      docId: updateDocument._id,
      [DataSyncFieldNames.version]: updateDocument[DataSyncFieldNames.version]
    };

    const result = await this.db.collection(this.collectionName).findOne(filter);

    return result?.document;
  }
}
