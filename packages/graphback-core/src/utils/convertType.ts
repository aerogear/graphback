import { ObjectID } from 'bson';

/**
 * Helper function to convert a value to another type
 * 
 * @param {any} value - Value to convert
 * @param {any} toType - convert value to this type
 */
export function convertType(value: any, toType: any): string | number | boolean | BigInt | ObjectID {
  if (!value) {
    return undefined;
  }

  if (toType instanceof ObjectID || value instanceof ObjectID) {
    return new ObjectID(value);
  }

  switch (typeof toType) {
    case 'string':
      return String(value);
    case 'number':
      return Number(value);
    case 'bigint':
      return BigInt(value);
    case 'boolean':
      return Boolean(value);
    case 'object':
      if (isDateObject(value)) {
        return new Date(value).getTime()
      }

      return value;
    default:
      return String(value);
  }
}

/**
 * Check if value is a Date object
 * 
 * @param {any} value 
 */
export const isDateObject = (value: any): boolean => Object.prototype.toString.call(value) === '[object Date]';
