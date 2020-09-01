
/**
 * Enum with list of possible resolvers that can be created
 */
/* eslint-disable no-shadow */
export enum GraphbackOperationType {
  CREATE = 'create',
  UPDATE = 'update',
  FIND = 'find',
  FIND_ONE = 'findOne',
  DELETE = 'delete',
  SUBSCRIPTION_CREATE = 'subCreate',
  SUBSCRIPTION_UPDATE = 'subUpdate',
  SUBSCRIPTION_DELETE = 'subDelete'
}
/* eslint-enable no-shadow */
