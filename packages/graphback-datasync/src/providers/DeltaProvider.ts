import { applyIndexes } from "@graphback/runtime-mongo";
import { GraphQLObjectType } from 'graphql';
import { Db, ObjectId, FilterQuery } from "mongodb"
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
          "docId": 1,
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


  public async insertDiff(data: any, op: DeltaOps) {
    const diff = getDiffEntry(data);

    const res = await this.db.collection(this.collectionName).insertOne({
      op: op.toString(),
      ...diff
    })

    return res.insertedId;
  }

  public async sync(lastSync: number, filter?: FilterQuery<any>) {
    const syncPipeline = [
      {
        $match: {
          timestamp: {
            $gte: new Date(lastSync)
          }

        },
      },
      {
        $group: {
          _id: "$docId",
          sets: {
            $mergeObjects: "$sets"
          },
          lastOp: {
            $last: "$op"
          },
          lastUpdated: {
            $last: "$timestamp"
          }
        }
      }, {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                _id: "$_id",
                _deleted: { $eq: ["$lastOp", "delete"] },
                updatedAt: {
                  $toLong: "$lastUpdated"
                }
              },
              "$sets"
            ]
          }
        }
      }, {
        $match: filter
      }];

    return this.db.collection(this.collectionName).aggregate(syncPipeline).toArray()
  }

  public async checkForConflicts(updateData: any): Promise<boolean> {
    if (updateData === {} || updateData === undefined) {
      return false
    }

    const fieldChecks = getFieldChecks(updateData);

    const filter: FilterQuery<any> = {
      docId: (updateData.id instanceof ObjectId ? updateData.id : new ObjectId(updateData.id)),
      timestamp: {
        $gt: new Date(parseInt(updateData.updatedAt, 10))
      },
      ...fieldChecks
    };

    const count = await this.db.collection(this.collectionName).countDocuments(filter)
    
    return count > 0
  }
}

export function getFieldChecks(updateData: any) {
  const deltaMap = Object.assign({}, updateData);
  delete deltaMap.id;
  delete deltaMap.updatedAt;

  return Object.keys(deltaMap).reduce((fieldChecks: any, fieldName: string) => {
    fieldChecks[`sets.${fieldName}`] = {
      $exists: true
    }

    return fieldChecks
  }, {})
}

export interface DiffEntry {
  docId: ObjectId,
  sets: { [fieldName: string]: any },
  timestamp: Date
}

export function getDiffEntry(data: any): DiffEntry {
  const sets = Object.assign({}, data);
  const objectId = sets.id instanceof ObjectId ? sets.id : new ObjectId(sets.id);
  delete sets.id;
  delete sets._id;
  delete sets._deleted
  const timestamp = new Date(sets.updatedAt);
  delete sets.updatedAt;
  delete sets.createdAt;
  
  return {
    docId: objectId,
    sets,
    timestamp
  }
}