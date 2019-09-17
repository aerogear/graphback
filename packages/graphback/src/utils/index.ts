import { INTERFACE_TYPE_DEFINITION, OBJECT_TYPE_DEFINITION, OBJECT_TYPE_EXTENSION, Type } from '../ContextTypes';

export enum ResolverType {
  CREATE = 'create',
  UPDATE = 'update',
  FIND = 'find',
  FIND_ALL = 'findAll',
  DELETE = 'delete',
}

export const getFieldName = (typeName: string, action: ResolverType, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}

export const getTableName = (typeName: string): string => {
  return typeName.toLowerCase()
}

export const filterObjectTypes = (types: Type[]) => types.filter((t: Type) => t.kind === OBJECT_TYPE_DEFINITION);

export const filterInterfaceTypes = (types: Type[]) => types.filter((t: Type) => t.kind === INTERFACE_TYPE_DEFINITION);

export const filterObjectExtensions = (types: Type[]) => types.filter((t: Type) => t.kind === OBJECT_TYPE_EXTENSION);

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
