import { CRUDService, GraphbackDataProvider, GraphbackPubSub } from "@graphback/runtime";
import { GraphQLObjectType } from 'graphql';
import { isAuthorizedByRole } from "keycloak-connect-graphql";
import { CrudServiceAuthConfig } from './definitions';
import { getEmptyServiceConfig } from "./utils";

/**
 * options object for the KeycloakCrudService
 */
export type KeycloakCrudServiceOptions = {
  modelType: GraphQLObjectType,
  db: GraphbackDataProvider,
  subscriptionConfig: GraphbackPubSub,
  authConfig: CrudServiceAuthConfig,
};

/**
 * This custom CRUD Service shows another potential way to add auth
 * 
 * This is actually quite nice and clean but it does not allow for field level auth.
 * It's still a possibility that we could go with though!
 */
export class KeycloakCrudService<T = any> extends CRUDService {

  private authConfig: CrudServiceAuthConfig;

  public constructor({ modelType, db, subscriptionConfig, authConfig }: KeycloakCrudServiceOptions) {
    super(modelType, db, subscriptionConfig);
    this.authConfig = authConfig || getEmptyServiceConfig();
  }

  public create(data: T, context?: any): Promise<T> {
    if (this.authConfig.create && this.authConfig.create.roles && this.authConfig.create.roles.length > 0) {
      const { roles } = this.authConfig.create;
      if (!isAuthorizedByRole(roles, context)) {
        throw new Error(`User is not authorized.`);
      }
    }

    return super.create(data, context);
  }

  public update(data: T, context?: any): Promise<T> {
    if (this.authConfig.update && this.authConfig.update.roles && this.authConfig.update.roles.length > 0) {
      const { roles } = this.authConfig.update;
      if (!isAuthorizedByRole(roles, context)) {
        throw new Error(`User is not authorized.`);
      }
    }

    return super.update(data, context);
  }

  public delete(data: T, context?: any): Promise<T> { 
    if (this.authConfig.delete && this.authConfig.delete.roles && this.authConfig.delete.roles.length > 0) {
      const { roles } = this.authConfig.delete;
      if (!isAuthorizedByRole(roles, context)) {
        throw new Error(`User is not authorized.`);
      }
    }

    return super.delete(data, context);
  }

  public findAll(context?: any): Promise<T[]> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new Error(`User is not authorized.`);
      }
    }

    return super.findAll(context);
  }

  public findBy(filter: any, context?: any): Promise<T[]> {
    if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
      const { roles } = this.authConfig.read;
      if (!isAuthorizedByRole(roles, context)) {
        throw new Error(`User is not authorized.`);
      }
    }

    return super.findBy(filter, context);
  }
}
