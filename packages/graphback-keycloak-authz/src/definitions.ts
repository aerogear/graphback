export type CrudOperationAuthConfig = {
  roles: string[]
};

export type CrudServiceAuthConfig = {
  create?: CrudOperationAuthConfig,
  read?: CrudOperationAuthConfig,
  update?: CrudOperationAuthConfig,
  delete?: CrudOperationAuthConfig,
};

export type CrudServicesAuthConfig = {
  [key: string]: CrudServiceAuthConfig
}
