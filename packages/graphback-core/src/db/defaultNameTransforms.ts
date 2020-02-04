export type NameTransformDirection = 'from-db' | 'to-db'

export type NameTransform = (
  name: string,
  direction: NameTransformDirection,
) => string

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

export function upperCaseFirstChar(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}