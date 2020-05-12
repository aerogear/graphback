import { ModelAuthRule, ModelOperation, CrudServiceAuthConfig } from "./definitions"


const supportedCrudOperations = ['create', 'read', 'update', 'delete'];

export function getOperationsFromRule(rule: ModelAuthRule): ModelOperation[] {
  if (rule.operations && rule.operations.length > 0){
    const invalidOperation = rule.operations.find((operation: string) => !supportedCrudOperations.includes(operation));
    if (invalidOperation) {
      throw new Error(`auth rule ${JSON.stringify(rule)} is invalid\n"${invalidOperation}" is not a supported operation`);
    }

    return rule.operations;
  }

  return supportedCrudOperations as ModelOperation[];
}

export function getEmptyServiceConfig() {
  const serviceConfig = {} as CrudServiceAuthConfig;
  for (const operation of supportedCrudOperations) {
    serviceConfig[operation] = { roles: [] };
  }

  return serviceConfig;
}

export function isAuthorizedByRole(roles: string[], context?: any) {
  for (const role of roles) {
    if (context.kauth.hasRole(role)) {
      return true
    }
  }

  return false
}