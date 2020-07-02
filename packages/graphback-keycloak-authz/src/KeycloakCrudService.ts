import { isAuthorizedByRole, KeycloakContext } from "keycloak-connect-graphql";
import { GraphbackCRUDService, ResultList, GraphbackOrderBy, GraphbackPage, GraphbackProxyService, GraphbackContext, QueryFilter } from '@graphback/core';
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
export class KeycloakCrudService<Type = any> extends GraphbackProxyService<Type> {

  private authConfig: CrudServiceAuthConfig;

  public constructor({ service, authConfig }: KeycloakCrudServiceOptions) {
    super(service);
    this.authConfig = authConfig || getEmptyServiceConfig();
  }

  public create(data: Type, context: GraphbackContext | KeycloakContext | any): Promise<Type> {
    if (this.authConfig.create && this.authConfig.create.roles && this.authConfig.create.roles.length > 0) {
      const { roles } = this.authConfig.create;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    this.checkAuthRulesForInput(context, Object.keys(data));

    return super.create(data, context);
  }

  public update(data: Type, context: GraphbackContext | KeycloakContext | any): Promise<Type> {
    if (this.authConfig.update && this.authConfig.update.roles && this.authConfig.update.roles.length > 0) {
      const { roles } = this.authConfig.update;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }
    this.checkAuthRulesForInput(context, Object.keys(data));

    return super.update(data, context);
  }

  public delete(data: Type, context: GraphbackContext | KeycloakContext | any): Promise<Type> {
    if (this.authConfig.delete && this.authConfig.delete.roles && this.authConfig.delete.roles.length > 0) {
      const { roles } = this.authConfig.delete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.delete(data, context);
  }

  public findOne(args: any, context: GraphbackContext | KeycloakContext | any): Promise<Type> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    this.checkAuthRulesForSelections(context);

    return super.findOne(args, context);
  }

  public findBy(filter: QueryFilter<Type>, context: GraphbackContext | KeycloakContext | any | any, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<ResultList<Type>> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    if (this.authConfig.filterUsingAuthInfo && context.kauth) {
      if (typeof this.authConfig.filterUsingAuthInfo !== 'function') {
        throw new Error("Wrong auth filter implementation")
      }

      filter = this.authConfig.filterUsingAuthInfo(filter, context.kauth.accessToken.content)
    }

    this.checkAuthRulesForSelections(context);

    return super.findBy(filter, context, page, orderBy);
  }

  public subscribeToCreate(filter?: any, context?: any): AsyncIterator<Type> {
    if (this.authConfig.subCreate && this.authConfig.subCreate.roles && this.authConfig.subCreate.roles.length > 0) {
      const { roles } = this.authConfig.subCreate;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate(filter?: any, context?: any): AsyncIterator<Type> {
    if (this.authConfig.subUpdate && this.authConfig.subUpdate.roles && this.authConfig.subUpdate.roles.length > 0) {
      const { roles } = this.authConfig.subUpdate;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete(filter?: any, context?: any): AsyncIterator<Type> {
    if (this.authConfig.subDelete && this.authConfig.subDelete.roles && this.authConfig.subDelete.roles.length > 0) {
      const { roles } = this.authConfig.subDelete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToDelete(filter, context)
  }

  public batchLoadData(relationField: string, id: string | number, filter: any, context: GraphbackContext | KeycloakContext | any) {
    if (this.authConfig?.relations[relationField]?.roles.length > 0) {
      const { roles } = this.authConfig?.relations[relationField];
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.batchLoadData(relationField, id, filter, context)
  }

  /**
   * Checks if user is allowed to create/update particular field
   */
  private checkAuthRulesForInput(context: any, inputKeys: string[]) {
    if (this.authConfig.updateFields) {
      for (const inputKey of inputKeys) {
        if (this.authConfig.updateFields[inputKey]) {
          const { roles } = this.authConfig.updateFields[inputKey];
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
  private checkAuthRulesForSelections(context: any) {
    const selectedFields = context.graphback?.options?.selectedFields;
    if (this.authConfig.returnFields && selectedFields) {
      for (const selectedField of selectedFields) {
        if (this.authConfig.returnFields[selectedField]) {
          const { roles } = this.authConfig.returnFields[selectedField];
          if (!isAuthorizedByRole(roles, context)) {
            throw new UnauthorizedError(`Unauthorized to fetch: ${selectedField}`)
          }
        }
      }
    }
  }
}

