import { GraphbackContext } from '@graphback/core';
import { isAuthorizedByRole } from 'keycloak-connect-graphql';
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
 * Checks if user is allowed to create/update particular field
 */
export function checkAuthRulesForInput(context: GraphbackContext, authConfig: CrudServiceAuthConfig, inputKeys: string[]) {
  if (authConfig.updateFields) {
    for (const inputKey of inputKeys) {
      if (authConfig.updateFields[inputKey]) {
        const { roles } = authConfig.updateFields[inputKey];
        if (!isAuthorizedByRole(roles, context)) {
          throw new UnauthorizedError()
        }
      }
    }
  }
}

/**
 * Checks if user is allowed to request particular field
 */
export function checkAuthRulesForSelections(context: GraphbackContext, authConfig: CrudServiceAuthConfig, selectedFields?: string[]) {
  if (authConfig.returnFields && selectedFields && selectedFields) {
    for (const selectedField of selectedFields) {
      if (authConfig.returnFields[selectedField]) {
        const { roles } = authConfig.returnFields[selectedField];
        if (!isAuthorizedByRole(roles, context)) {
          throw new UnauthorizedError(`Unauthorized to fetch: ${selectedField}`)
        }
      }
    }
  }
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