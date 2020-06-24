import { CrudServiceAuthConfig } from "./KeycloakConfig"


const supportedCrudOperations = ['create', 'read', 'update', 'delete'];

export function getEmptyServiceConfig() {
  const serviceConfig = {} as CrudServiceAuthConfig;
  for (const operation of supportedCrudOperations) {
    serviceConfig[operation] = { roles: [] };
  }

  return serviceConfig;
}

/**
 * Custom Error class. The code property will be propagated back to the client side
 * for proper error handling
 */
export class UnauthorizedError extends Error {
  public code: string;

  public constructor(message: string = "User is not authorized.") {
    super(message);
    this.code = 'FORBIDDEN';
  }
}