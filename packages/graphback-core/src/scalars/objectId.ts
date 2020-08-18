import { ObjectID as BsonObjectID } from "bson";

/* eslint-disable */
export function isObjectID(value: any) {
  if (value instanceof BsonObjectID) {
    return true;
  }
  try {
    const BsonExtObjectID = require('bson-ext').ObjectID;
    return value instanceof BsonExtObjectID;
  } catch {}

  return false;
}

export function parseObjectID(value: any) {
  let ObjectID = BsonObjectID;
  try {
    ObjectID = require('bson-ext').ObjectID; // always prefer the native bson extension which is more performant than js-bson
  } catch {}
  return new ObjectID(value);
}

export function getObjectIDTimestamp(value: any) {
  return value.getTimestamp();
}
/* eslint-enable */
