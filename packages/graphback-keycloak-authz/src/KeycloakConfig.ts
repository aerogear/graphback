import { KeycloakOptions } from "keycloak-connect"
/**
 * Operations supported by RBAC config
 */
export type CrudServiceAuthConfig = {
  /**
   * Create operation auth rules
   */
  create?: CrudOperationAuthConfig,
  /**
   * Read operation auth rules
   */
  read?: CrudOperationAuthConfig,
  /**
   * Update operation auth rules
   */
  update?: CrudOperationAuthConfig,
  /**
   * Delete operation auth rules
   */
  delete?: CrudOperationAuthConfig,

  /**
   * Create operation auth rules
   */
  subCreate?: CrudOperationAuthConfig,

  /**
   * Update operation auth rules
   */
  subUpdate?: CrudOperationAuthConfig,

  /**
   * Delete operation auth rules
   */
  subDelete?: CrudOperationAuthConfig,

  /**
   * Relations operation auth rules used for fetching objects that are in relation to main object we query
   */
  relations?: { [key: string]: CrudOperationAuthConfig }

  /**
   * Provides rules for creating and updating certain fields.
   * Creating or updating object with field specified will require role
   */
  updateFields?: { [key: string]: CrudOperationAuthConfig }

  /**
   * Provides rules for fetching fields back from database
   */
  returnFields?: { [key: string]: CrudOperationAuthConfig }

  /**
   * Provides ability to supply additional filter arguments that will be computed on server.
   * This method can be used to determine owner of the resources for logged in user.
   */
  filterUsingAuthInfo?: AuthFilter
};

/**
 * @param filter - filter object that can be extended to add extra query
 * @param profileInfo - profile information hidden in token (req.kauth.grant.access_token.content)
 * @return filter - new filter field for your specific database
 */
export type AuthFilter = (filter: any, profileInfo: any) => any

export type CrudOperationAuthConfig = {
  roles: string[]
};

export type CrudServicesAuthConfig = {
  [key: string]: CrudServiceAuthConfig
}
