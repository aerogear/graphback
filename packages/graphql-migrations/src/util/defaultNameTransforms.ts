import { NameTransformDirection } from '../abstract/generateAbstractDatabase'

export function defaultColumnNameTransform(name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return `${name.charAt(0).toLowerCase()}${name.slice(1)}`
  }
  return name
}

export function defaultTableNameTransform(name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return name.toLowerCase();
  }
  return name
}
