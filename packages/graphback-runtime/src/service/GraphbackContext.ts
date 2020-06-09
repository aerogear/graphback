import { GraphbackCRUDService } from './GraphbackCRUDService';

/**
 * Map model names to a CRUD service
 */
export interface GraphbackServiceConfigMap {
  [modelName: string]: GraphbackCRUDService
}

/**
 * GraphQL context interface according to Graphback runtime layer format
 */
export interface GraphbackContext {
  services: GraphbackServiceConfigMap
}
