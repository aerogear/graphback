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