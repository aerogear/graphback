import { ModelDefinition, getTableName } from '@graphback/core';
import { Db, Collection, ObjectId } from "mongodb";
import { DataSyncFieldNames } from './util';

export function getDeltaTableName(tableName: string) {
  return `${tableName}Delta`
}

/**
 * M
 */
export class MongoDeltaHelper {
  protected db: Db;
  protected collectionName: string;
  public constructor(model: ModelDefinition, db: Db) {
    this.db = db;
    this.collectionName = getDeltaTableName(getTableName(model.graphqlType));
  }

  public async insertDiff(updatedDocument: any) {
    const version = updatedDocument[DataSyncFieldNames.version];
    const { _id } = updatedDocument;

    const diff: any = {
      docId: _id,
      [DataSyncFieldNames.version]: version,
      document: updatedDocument
    }
    await this.db.collection(this.collectionName).insertOne(diff);
  }

  public async findBaseForConflicts(updateDocument: any) {
    if (updateDocument._id === undefined || updateDocument[DataSyncFieldNames.version] === undefined) {
      throw new Error('Both _id and version field are needed for finding base');
    }

    const filter = {
      docId: updateDocument._id,
      [DataSyncFieldNames.version]: updateDocument[DataSyncFieldNames.version]
    };

    const result = await this.db.collection(this.collectionName).findOne(filter);

    return result?.document;
  }
}