import { applyIndexes } from "@graphback/runtime-mongo";
import { GraphQLObjectType } from 'graphql';
import { Db, ObjectId, FilterQuery } from "mongodb"
import { getTableName, GraphbackOperationType } from '@graphback/core';

function getDeltaTableName(baseType: GraphQLObjectType) {
  return `Graphback-${getTableName(baseType)}-Delta`
}

type DeltaOps = GraphbackOperationType.CREATE | GraphbackOperationType.UPDATE | GraphbackOperationType.DELETE;

export interface ConflictingFieldsReport {
  _id: ObjectId,
  conflicts: {
    [fieldName: string]: any
  },
  version: number
}

interface DeltaDocument {
  docId: ObjectId,
  op: DeltaOps,
  timestamp: Date,
  version: number,
  sets: {
    [fieldName: string]: any
  }
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
          "version": 1
        }
      }
    ], this.db.collection(this.collectionName));
  }


  public async insertDiff(_id: string|ObjectId, ts: string|number, documentVersion: number, updateData: any, op: DeltaOps) {
    const docId = getObjectIdFromString(_id);
    const timestamp = getDateFromTimestamp(ts);
    const sets = getDiffEntry(updateData);

    const deltaDocument: DeltaDocument = {
      op,
      docId,
      timestamp,
      version: documentVersion,
      sets
    }

    const res = await this.db.collection(this.collectionName).insertOne(deltaDocument);

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

  public async checkForConflicts(_id: string|ObjectId, version: number, updateData: any): Promise<ConflictingFieldsReport> {

    const docId = getObjectIdFromString(_id);
    const sets = getDiffEntry(updateData);

    const fieldChecks = getFieldChecks(sets);

    const filter: FilterQuery<any> = {
      docId,
      version: {
        $gt: version
      }
    };

    const deltas:DeltaDocument[] = await this.db.collection(this.collectionName).find(filter, { sort: { version: -1 } }).toArray();

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
      version: latestDelta.version
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