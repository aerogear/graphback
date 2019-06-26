
/**
 * Types of resolvers and underlying schema methods
 */
export enum ResolverType {
  CREATE = 'create',
  UPDATE = 'update',
  FIND = 'find',
  FIND_ALL = 'findAll',
  DELETE = 'delete',
}

export const allTypes = [ResolverType.CREATE, ResolverType.UPDATE, ResolverType.FIND, ResolverType.FIND_ALL, ResolverType.DELETE]
