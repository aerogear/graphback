import * as pluralize from "pluralize";
export function getDeltaListType(typeName: string): string {
  return `${typeName}DeltaList`;
}
export function getDeltaType(typeName: string) {
  return `${typeName}Delta`;
}
/**
 * Get the name of delta query for a model
 * @param typeName Name of the model
 */
export function getDeltaQuery(typeName: string) {
  return `sync${pluralize(typeName)}`;
}