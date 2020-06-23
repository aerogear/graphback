
/**
 * Operations supported by RBAC config
 */
export type CrudServiceAuthConfig = {
  create?: CrudOperationAuthConfig,
  read?: CrudOperationAuthConfig,
  update?: CrudOperationAuthConfig,
  delete?: CrudOperationAuthConfig,
};

export type CrudOperationAuthConfig = {
  roles: string[]
};

export type CrudServicesAuthConfig = {
  [key: string]: CrudServiceAuthConfig
}
