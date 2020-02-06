export type DatabaseNameTransformDirection = 'from-db' | 'to-db'

/**
 * Transform to/from database table or column name
 */
export type DatabaseNameTransform = (
  name: string,
  direction: DatabaseNameTransformDirection,
) => string

/**
 * Transform to/from database column name
 * 
 * @param name - model name
 * @param direction - transform to or from database
 */
export function defaultColumnNameTransform(name: string, direction: DatabaseNameTransformDirection) {
  if (direction === 'to-db') {
    return lowerCaseFirstChar(name);
  }

  return name
}

/**
 * Transform to/from database table name
 * 
 * @param name - model name
 * @param direction - transform to or from database
 */
export function defaultTableNameTransform(name: string, direction: DatabaseNameTransformDirection) {
  if (direction === 'to-db') {
    return name.toLowerCase();
  }

  return name
}

export function lowerCaseFirstChar(text: string) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

export function upperCaseFirstChar(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}