import { applyIndexes } from "@graphback/runtime-mongo";
import { GraphQLObjectType } from 'graphql';
import { Db } from "mongodb"
import { getTableName, GraphbackOperationType } from '@graphback/core';

function getDeltaTableName(baseType: GraphQLObjectType) {
  return `_${getTableName(baseType)}_delta`
}

type DeltaOps = GraphbackOperationType.CREATE | GraphbackOperationType.UPDATE | GraphbackOperationType.DELETE;

interface DeltaDB {
  insertDiff(data: any, op: DeltaOps): Promise<any>
}

type Hook = (doc: any) => any;

interface HookMap {
  [GraphbackOperationType.CREATE]: Hook[]
  [GraphbackOperationType.UPDATE]: Hook[]
}

/**
 * Provides an interface for interacting with deltas and stuff
 */
export class DeltaProvider implements DeltaDB {
  protected collectionName: string;
  protected db: Db;
  protected hooks:HookMap;

  public constructor(baseType: GraphQLObjectType, db: Db) {
    this.db = db;

    this.collectionName = getDeltaTableName(baseType);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    applyIndexes([
      {
        key: {
          "doc._id": 1,
          "doc.updatedAt": 1
        }
      },
      {
        key: {
          "doc.updatedAt": 1
        }
      }
    ], this.db.collection(this.collectionName));
  }


  public async insertDiff(data: any) {
    delete data.id;

    const res = await this.db.collection(this.collectionName).insertOne({
      doc: data
    })

    return res.insertedId;
  }

  public async sync(lastSync: number) {
    return this.db.collection(this.collectionName).aggregate([
      {
        $match: {
          "doc.updatedAt": {
            $gte: lastSync
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: '$doc'
        }
      }
    ]).toArray()
  }
}