/**
 * Helper function to convert a value to another type
 * 
 * @param {any} value - Value to convert
 * @param {string} typeOf - convert value to this type
 */
export function convertType(value: any, typeOf: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"): string | number | boolean | BigInt {
  if (!value) {
    return undefined;
  }
  
  switch (typeOf) {
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
