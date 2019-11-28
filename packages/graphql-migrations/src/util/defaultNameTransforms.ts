import { snake } from 'case'
import { NameTransformDirection } from '../abstract/generateAbstractDatabase'

export function defaultNameTransform(name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return snake(name)
  }
  return name
}
