import { NameTransformDirection } from '../abstract/generateAbstractDatabase'

export function defaultNameTransform(name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return name.toLowerCase();
  }
  return name
}
