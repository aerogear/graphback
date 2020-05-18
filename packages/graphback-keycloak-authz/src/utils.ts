import { CrudServiceAuthConfig } from "./definitions"


const supportedCrudOperations = ['create', 'read', 'update', 'delete'];

export function getEmptyServiceConfig() {
  const serviceConfig = {} as CrudServiceAuthConfig;
  for (const operation of supportedCrudOperations) {
    serviceConfig[operation] = { roles: [] };
  }

  return serviceConfig;
}
