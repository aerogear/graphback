import { isAuthorizedByRole } from "keycloak-connect-graphql";
import { GraphbackCRUDService, ResultList, GraphbackOrderBy, GraphbackPage, GraphbackProxyService } from '@graphback/core';
import { CrudServiceAuthConfig } from './KeycloakConfig';
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
export class KeycloakCrudService<T = any> extends GraphbackProxyService<T> {

  private authConfig: CrudServiceAuthConfig;

  public constructor({ service, authConfig }: KeycloakCrudServiceOptions) {
    super(service);
    this.authConfig = authConfig || getEmptyServiceConfig();
  }

  public create(data: T, context: any): Promise<T> {
    if (this.authConfig.create && this.authConfig.create.roles && this.authConfig.create.roles.length > 0) {
      const { roles } = this.authConfig.create;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.create(data, context);
  }

  public update(data: T, context: any): Promise<T> {
    if (this.authConfig.update && this.authConfig.update.roles && this.authConfig.update.roles.length > 0) {
      const { roles } = this.authConfig.update;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.update(data, context);
  }

  public delete(data: T, context: any): Promise<T> {
    if (this.authConfig.delete && this.authConfig.delete.roles && this.authConfig.delete.roles.length > 0) {
      const { roles } = this.authConfig.delete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.delete(data, context);
  }

  public findOne(args: any, context: any): Promise<T> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.findOne(args, context);
  }

  public findBy(filter: any, context: any, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<ResultList<T>> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.findBy(filter, context, page, orderBy);
  }

  public subscribeToCreate(filter?: any, context?: any): AsyncIterator<T> {
    if (this.authConfig.subCreate && this.authConfig.subCreate.roles && this.authConfig.subCreate.roles.length > 0) {
      const { roles } = this.authConfig.subCreate;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate(filter?: any, context?: any): AsyncIterator<T> {
    if (this.authConfig.subUpdate && this.authConfig.subUpdate.roles && this.authConfig.subUpdate.roles.length > 0) {
      const { roles } = this.authConfig.subUpdate;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete(filter?: any, context?: any): AsyncIterator<T> {
    if (this.authConfig.subDelete && this.authConfig.subDelete.roles && this.authConfig.subDelete.roles.length > 0) {
      const { roles } = this.authConfig.subDelete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToDelete(filter, context)
  }

  public batchLoadData(relationField: string, id: string | number, filter: any, context: any) {
    if (this.authConfig?.relations[relationField]?.roles.length > 0) {
      const { roles } = this.authConfig?.relations[relationField];
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.batchLoadData(relationField, id, filter, context)
  }
}
