import { ObjectID as BsonObjectID } from 'bson';

/* eslint-disable */
export function isObjectID(value: any) {
  const isBsonObjectId = (val: any) => val instanceof BsonObjectID;
  if (isBsonObjectId(value)) return true;

  let isBsonExtObjectID: (val: any) => boolean = () => false;

  try {
    const BsonExtObjectID = require('bson-ext').ObjectID;
    isBsonExtObjectID = (val: any) => val instanceof BsonExtObjectID;
    if (isBsonExtObjectID(value)) return true;
  } catch {}

  try {
    switch (typeof value) {
      case 'string':
        const parsedObjectId = parseObjectID(value);
        if (parsedObjectId.toHexString() == value) {
          return true;
        }
        break;
    }
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
  if (typeof value == 'string' && isObjectID(value)) {
    const objectId = parseObjectID(value);
    return objectId.getTimestamp();
  }
  return value.getTimestamp();
}
/* eslint-enable */
