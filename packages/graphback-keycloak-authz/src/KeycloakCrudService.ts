import {
  GraphbackPage,
  ResultList,
  GraphbackOrderBy
} from "@graphback/runtime";
import { isAuthorizedByRole } from "keycloak-connect-graphql";
import { GraphbackCRUDService } from '../../graphback-core/src/runtime/GraphbackCRUDService';
import { CrudServiceAuthConfig } from './definitions';
import { getEmptyServiceConfig, UnauthorizedError } from "./utils";

/**
 * options object for the KeycloakCrudService
 */
export type KeycloakCrudServiceOptions = {
  /**
   * Configuration for authentication
   */
  authConfig: CrudServiceAuthConfig,

  /**
   * Service that will be called by Auth service
   */
  service: GraphbackCRUDService
};

/**
 * This custom CRUD Service shows another potential way to add auth
 *
 * This is actually quite nice and clean but it does not allow for field level auth.
 * It's still a possibility that we could go with though!
 */
export class KeycloakCrudService<T = any> implements GraphbackCRUDService<T> {

  private authConfig: CrudServiceAuthConfig;
  private wrappingService: GraphbackCRUDService;

  public constructor({ service, authConfig }: KeycloakCrudServiceOptions) {
    this.authConfig = authConfig || getEmptyServiceConfig();
    this.wrappingService = service;
  }

  public create(data: T, context: any): Promise<T> {
    if (this.authConfig.create && this.authConfig.create.roles && this.authConfig.create.roles.length > 0) {
      const { roles } = this.authConfig.create;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return this.wrappingService.create(data, context);
  }

  public update(data: T, context: any): Promise<T> {
    if (this.authConfig.update && this.authConfig.update.roles && this.authConfig.update.roles.length > 0) {
      const { roles } = this.authConfig.update;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return this.wrappingService.update(data, context);
  }

  public delete(data: T, context: any): Promise<T> {
    if (this.authConfig.delete && this.authConfig.delete.roles && this.authConfig.delete.roles.length > 0) {
      const { roles } = this.authConfig.delete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return this.wrappingService.delete(data, context);
  }

  public findOne(args: any, context: any): Promise<T> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return this.wrappingService.findOne(args, context);
  }

  public findBy(filter: any, context: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<ResultList<T>> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return this.wrappingService.findBy(filter, orderBy, page, context);
  }

  public subscribeToCreate(filter?: any, context?: any): AsyncIterator<T> {
    return this.wrappingService.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate(filter?: any, context?: any): AsyncIterator<T> {
    return this.wrappingService.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete(filter?: any, context?: any): AsyncIterator<T> {
    return this.wrappingService.subscribeToDelete(filter, context)
  }

  public batchLoadData(relationField: string, id: string | number, filter: any, context: any) {
    return this.wrappingService.batchLoadData(relationField, id, filter, context)
  }
}
