export type AuthStrategy = 'role';

export type ModelOperation = 'create' | 'update' | 'delete' | 'read';

export interface ModelAuthRule {
  allow: AuthStrategy,
  operations?: ModelOperation[],
  roles: string[],
};

export interface ModelAuthConfig {
  name: string
  auth: {
    rules: ModelAuthRule[]
  }
};

export type ModelAuthConfigs = ModelAuthConfig[];

export type CrudOperationAuthConfig = {
  roles: string[]
};

export type CrudServiceAuthConfig= {
  create: CrudOperationAuthConfig,
  read: CrudOperationAuthConfig,
  update: CrudOperationAuthConfig,
  delete: CrudOperationAuthConfig,
};
