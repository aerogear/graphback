import { applyIndexes } from "@graphback/runtime-mongo";
import { GraphQLObjectType } from 'graphql';
import { Db, ObjectId, FilterQuery } from "mongodb"
import { getTableName, GraphbackOperationType } from '@graphback/core';

function getDeltaTableName(baseType: GraphQLObjectType) {
  return `Graphback-${getTableName(baseType)}-Delta`
}

type DeltaOps = GraphbackOperationType.CREATE | GraphbackOperationType.UPDATE | GraphbackOperationType.DELETE;

interface ConflictingFieldsReport {
  _id: ObjectId,
  conflicts: {
    [fieldName: string]: any
  },
  updatedAt: number
}


/**
 * Provides an interface for interacting with deltas and stuff
 */
export class DeltaProvider {
  protected collectionName: string;
  protected db: Db;

  public constructor(baseType: GraphQLObjectType, db: Db) {
    this.db = db;

    this.collectionName = getDeltaTableName(baseType);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    applyIndexes([
      {
        key: {
          "docId": 1,
          "timestamp": 1
        }
      }
    ], this.db.collection(this.collectionName));
  }


  public async insertDiff(_id: string|ObjectId, ts: string|number, updateData: any, op: DeltaOps) {
    const docId = getObjectIdFromString(_id);
    const timestamp = getDateFromTimestamp(ts);
    const sets = getDiffEntry(updateData);

    const res = await this.db.collection(this.collectionName).insertOne({
      op: op.toString(),
      docId,
      timestamp,
      sets
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

  public async checkForConflicts(_id: string|ObjectId, ts: string|number, updateData: any): Promise<ConflictingFieldsReport> {

    const docId = getObjectIdFromString(_id);
    const timestamp = getDateFromTimestamp(ts);
    const sets = getDiffEntry(updateData);

    const fieldChecks = getFieldChecks(sets);

    const filter: FilterQuery<any> = {
      docId,
      timestamp: {
        $gt: timestamp
      }
    };

    const deltas = await this.db.collection(this.collectionName).find(filter, { sort: { timestamp: -1 } }).toArray();

    const latestDelta = deltas[deltas.length - 1];

    const conflicts = {};

    deltas.forEach((delta: any) => {
      Object.keys(delta.sets).forEach((fieldName: string) => {
        if (updateData[fieldName] !== undefined) {
          // Conflicting field
          conflicts[fieldName] = delta.sets[fieldName];
        }
      })
    })
    
    return {
      _id: docId,
      conflicts,
      updatedAt: latestDelta.timestamp.valueOf()
    }
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
  delete sets.id;
  delete sets._id;
  delete sets._deleted
  delete sets.updatedAt;
  delete sets.createdAt;
  
  return sets;
}

export function getDateFromTimestamp(ts: string|number): Date {
  
  if (typeof ts === "string") {
    if (ts === "") {throw Error("Cannot get Date from empty timestamp");}
    const stringValue = ts;
    ts = parseInt(ts, 10);
    if (isNaN(ts)) {throw Error(`Invalid Timestamp: ${stringValue}`);}
  }

  return new Date(ts)
}

export function getObjectIdFromString(oid: string|ObjectId): ObjectId {
  if (oid === "") {throw Error("Cannot get ObjectId from empty string");}

  if (oid instanceof ObjectId) {return oid;}

  return new ObjectId(oid);
}