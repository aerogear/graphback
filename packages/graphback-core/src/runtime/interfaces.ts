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
  graphback: GraphbackServiceConfigMap
}

/**
 * Interface represents GraphbackPage type
 */
export interface GraphbackPage {
  limit?: number
  offset?: number
}

export type SortDirection = 'asc' | 'desc'

/**
 * @todo move this into a common file
 */
export interface GraphbackOrderBy {
  order?: SortDirection
  field: string
}
