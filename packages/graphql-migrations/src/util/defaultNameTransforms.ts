import { NameTransformDirection } from '../abstract/generateAbstractDatabase'

export function defaultColumnNameTransform(name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return lowerCaseFirstChar(name);
  }
  return name
}

export function defaultTableNameTransform(name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return name.toLowerCase();
  }
  return name
}

export function lowerCaseFirstChar(text: string) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
