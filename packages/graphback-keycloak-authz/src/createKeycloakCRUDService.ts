import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService, ServiceCreator } from '@graphback/core';
import { KeycloakCrudService } from './KeycloakCrudService';
import { CrudServiceAuthConfig } from './KeycloakConfig';

/**
 * Creates a new KeycloakCrudService by wrapping original service.
 * This method can work with both CRUDService (default) and DataSyncService
 *
 * @param authConfig  - CRUD auth config for entire model
 *  @param serviceCreator - function that creates wrapper service
 */
export function createKeycloakCRUDService(authConfig: CrudServiceAuthConfig, serviceCreator: ServiceCreator) {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const service = serviceCreator(model, dataProvider);
    authConfig = authConfig || {};
    const objConfig = authConfig[model.graphqlType.name];
    const keycloakService = new KeycloakCrudService({ service, authConfig: objConfig });

    return keycloakService;
  }
}
