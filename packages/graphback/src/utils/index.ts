import { INTERFACE_TYPE_DEFINITION, OBJECT_TYPE_DEFINITION, Type } from '../ContextTypes';

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

export const createImportString = (names: string[], path: string, isDefault: boolean = false) => {
  const imports = names.map((name: string) => name).join(', ');

  return `import ${ isDefault ? '' : '{ '}${imports}${ isDefault ? '' : ' }'} from ${path};`;
};

/**
 * Filter duplicate items in an array by one of their keys
 *
 * @param arr - The array to filter
 * @param key - The key to compare each item on.
 */
/* tslint:disable:no-any */
export const uniqueBy = (arr: any[], key: string) => {
  const seen = new Set();

  return arr.filter((item: any) => {
    const k = item[key];

    return seen.has(k) ? false : seen.add(k);
  });
}
