import { isAuthorizedByRole, KeycloakContext, KeycloakContextBase } from "keycloak-connect-graphql";
import { GraphbackCRUDService, ResultList, GraphbackProxyService, GraphbackContext, QueryFilter, FindByArgs, getSelectedFieldsFromResolverInfo, ModelDefinition } from '@graphback/core';
import { GraphQLResolveInfo } from 'graphql';
import { CrudServiceAuthConfig } from './KeycloakConfig';
import { getEmptyServiceConfig, UnauthorizedError, checkAuthRulesForInput, checkAuthRulesForSelections } from "./utils";

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
 * Context interface for Keycloak which extends Graphback context
 */
export interface GraphbackKeycloakContext extends GraphbackContext {
  kauth: KeycloakContextBase | KeycloakContext | any
}

/**
 * This custom CRUD Service shows another potential way to add auth
 *
 * This is actually quite nice and clean but it does not allow for field level auth.
 * It's still a possibility that we could go with though!
 */
export class KeycloakCrudService<Type = any> extends GraphbackProxyService<Type> {

  private authConfig: CrudServiceAuthConfig;
  private model: ModelDefinition;

  public constructor(model: ModelDefinition, { service, authConfig }: KeycloakCrudServiceOptions) {
    super(service);
    this.authConfig = authConfig || getEmptyServiceConfig();
    this.model = model;
  }

  public create(data: Type, context?: GraphbackKeycloakContext, info?: GraphQLResolveInfo): Promise<Type> {
    if (this.authConfig.create && this.authConfig.create.roles && this.authConfig.create.roles.length > 0) {
      const { roles } = this.authConfig.create;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    checkAuthRulesForInput(context, this.authConfig, Object.keys(data));

    return super.create(data, context, info);
  }

  public update(data: Type, context?: GraphbackKeycloakContext, info?: GraphQLResolveInfo): Promise<Type> {
    if (this.authConfig.update && this.authConfig.update.roles && this.authConfig.update.roles.length > 0) {
      const { roles } = this.authConfig.update;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }
    
    checkAuthRulesForInput(context, this.authConfig, Object.keys(data));

    return super.update(data, context, info);
  }

  public delete(data: Type, context?: GraphbackKeycloakContext, info?: GraphQLResolveInfo): Promise<Type> {
    if (this.authConfig.delete && this.authConfig.delete.roles && this.authConfig.delete.roles.length > 0) {
      const { roles } = this.authConfig.delete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.delete(data, context, info);
  }

  public findOne(args: any, context: GraphbackKeycloakContext, info?: GraphQLResolveInfo): Promise<Type> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    let selectedFields: string[];
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model)
    }

    checkAuthRulesForSelections(context, this.authConfig, selectedFields);

    return super.findOne(args, context, info);
  }

  public findBy(args: FindByArgs, context?: GraphbackKeycloakContext | any, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>> {
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

      args.filter = this.authConfig.filterUsingAuthInfo(args.filter, context.kauth.accessToken.content)
    }

    let selectedFields: string[];
    if (info) {
      selectedFields = getSelectedFieldsFromResolverInfo(info, this.model, path)
    }

    checkAuthRulesForSelections(context, this.authConfig, selectedFields);

    return super.findBy(args, context, info, path);
  }

  public subscribeToCreate(filter?: QueryFilter, context?: GraphbackKeycloakContext): AsyncIterator<Type> {
    if (this.authConfig.subCreate && this.authConfig.subCreate.roles && this.authConfig.subCreate.roles.length > 0) {
      const { roles } = this.authConfig.subCreate;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> {
    if (this.authConfig.subUpdate && this.authConfig.subUpdate.roles && this.authConfig.subUpdate.roles.length > 0) {
      const { roles } = this.authConfig.subUpdate;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> {
    if (this.authConfig.subDelete && this.authConfig.subDelete.roles && this.authConfig.subDelete.roles.length > 0) {
      const { roles } = this.authConfig.subDelete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.subscribeToDelete(filter, context)
  }

  public batchLoadData(relationField: string, id: string | number, filter: QueryFilter, context: GraphbackContext, info?: GraphQLResolveInfo) {
    if (this.authConfig?.relations && this.authConfig?.relations[relationField]?.roles.length > 0) {
      const { roles } = this.authConfig?.relations[relationField];
      if (!isAuthorizedByRole(roles, context)) {
        throw new UnauthorizedError()
      }
    }

    return super.batchLoadData(relationField, id, filter, context, info)
  }
}

