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

  // value can be number or string, try to parse
  try {
    switch (typeof value) {
      case 'string':
      case 'number':
        const parsedObjectId = parseObjectID(value);
        if (isBsonObjectId(parsedObjectId) || isBsonExtObjectID(parsedObjectId))
          return true;
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
  return value.getTimestamp();
}
/* eslint-enable */
