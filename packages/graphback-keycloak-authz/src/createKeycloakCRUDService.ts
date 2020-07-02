import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService, ServiceCreator } from '@graphback/core';
import { KeycloakCrudService } from './KeycloakCrudService';
import { CrudServiceAuthConfig, CrudServicesAuthConfig } from './KeycloakConfig';

/**
 * Creates a new KeycloakCrudService by wrapping original service.
 * This method can work with both CRUDService (default) and DataSyncService
 *
 * @param authConfig  - CRUD auth config for entire model
 *  @param serviceCreator - function that creates wrapper service
 */
export function createKeycloakCRUDService(authConfigList: CrudServicesAuthConfig, serviceCreator: ServiceCreator) {
  if (!authConfigList || !serviceCreator) {
    throw new Error("Missing required arguments to create keycloak service")
  }

  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const service = serviceCreator(model, dataProvider);
    const objConfig = authConfigList[model.graphqlType.name];
    const keycloakService = new KeycloakCrudService({ service, authConfig: objConfig });

    return keycloakService;
  }
}
