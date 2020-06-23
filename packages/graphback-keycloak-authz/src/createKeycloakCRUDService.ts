import { ModelDefinition, GraphbackDataProvider, GraphbackCRUDService, CreateCRUDServiceOptions, CRUDServiceConfig, CRUDService } from '@graphback/core';
import { KeycloakCrudService } from './KeycloakCrudService';
import { CrudServiceAuthConfig } from './KeycloakConfig';

/**
 * Creates a new KeycloakCrudService
 *
 * @param config
 * @this {authConfig} authConfig - CRUD auth config for entire model
 */
export function createKeycloakCRUDService(authConfig: CrudServiceAuthConfig, serviceCreator: (model: ModelDefinition, dataProvider: GraphbackDataProvider) => GraphbackCRUDService, crudConfig?: CreateCRUDServiceOptions) {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const serviceConfig: CRUDServiceConfig = {
      ...crudConfig,
      crudOptions: model.crudOptions
    }

    const service = new CRUDService(model.graphqlType.name, dataProvider, serviceConfig)
    const keycloakService = new KeycloakCrudService({ service, authConfig });

    return keycloakService;
  }
}

/**
 * Creates a new KeycloakCrudService
 *
 * @param config
 * @this {authConfig} authConfig - CRUD auth config for entire model
 */
export function createKeycloakDataSyncCRUDService(authConfig: CrudServiceAuthConfig, crudConfig?: CreateCRUDServiceOptions) {
  return (model: ModelDefinition, dataProvider: GraphbackDataProvider): GraphbackCRUDService => {
    const serviceConfig: CRUDServiceConfig = {
      ...crudConfig,
      crudOptions: model.crudOptions
    }

    const service = new CRUDService(model.graphqlType.name, dataProvider, serviceConfig)
    const keycloakService = new KeycloakCrudService({ service, authConfig });

    return keycloakService;
  }
}
