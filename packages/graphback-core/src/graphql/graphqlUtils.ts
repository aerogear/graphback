import { GraphbackOperationType, InputModelTypeContext, INTERFACE_TYPE_DEFINITION, OBJECT_TYPE_DEFINITION, OBJECT_TYPE_EXTENSION } from '../api';

export const getFieldName = (typeName: string, action: GraphbackOperationType, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}

export const getTableName = (typeName: string): string => {
  return typeName.toLowerCase()
}

export const filterObjectTypes = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION);

export const filterInterfaceTypes = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === INTERFACE_TYPE_DEFINITION);

export const filterObjectExtensions = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_EXTENSION);

/**
 * Generate a string literal with the following format:
 *
 * `implements InterfaceA & InterfaceB & Interface C ...`
 *
 * @param names String[] - list of interface names
 */
export const createImplementsInterfaceString = (names: string[]) => {
  return `implements ${names.map((name: string) => name).join(' & ')} `;
}
