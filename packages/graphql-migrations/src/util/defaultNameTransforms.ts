import Case from 'case'
import { NameTransformDirection } from 'src/abstract/generateAbstractDatabase'

export function defaultNameTransform (name: string, direction: NameTransformDirection) {
  if (direction === 'to-db') {
    return Case.snake(name)
  }
  return name
}
