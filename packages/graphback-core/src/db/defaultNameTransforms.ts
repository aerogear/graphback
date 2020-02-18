export type DatabaseNameTransformDirection = 'from-db' | 'to-db'

/**
 * Transform to/from database table or column name
 */
export type DatabaseNameTransform = (
  name: string,
  direction: DatabaseNameTransformDirection,
) => string

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

export function transformForeignKeyName(name: string, direction: DatabaseNameTransformDirection) {
  if (direction === 'to-db') {
    return `${name}Id`;
  }

  return name;
}