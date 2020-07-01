
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
   * relations operation auth rules used for fetching relationships
   */
  relations?: Map<string, CrudOperationAuthConfig>
};

export type CrudOperationAuthConfig = {
  roles: string[]
};

export type CrudServicesAuthConfig = {
  [key: string]: CrudServiceAuthConfig
}
