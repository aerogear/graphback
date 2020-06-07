import * as pluralize from 'pluralize'

export function getDeltaListType(typeName: string): string {
  return `${typeName}DeltaList`;
}
export function getDeltaType(typeName: string) {
  return `${typeName}Delta`;
}
