import { ModelDefinition } from '..';
import { GraphbackCRUDService } from './GraphbackCRUDService';
import { GraphbackDataProvider } from '.';

/**
 * Map model names to a CRUD service
 */
export interface GraphbackServiceConfigMap {
  [modelName: string]: GraphbackCRUDService
}
/**
 * Contains resolver options
 */
export interface GraphbackResolverOptions {
  selectedFields: string[],
  aggregations?: { // A map that indicates the type of aggreation that can be perfomed withing the current context
    count?: boolean
  }
}

/**
 * GraphQL context interface according to Graphback runtime layer format
 */
export interface GraphbackContext {
  graphback: {
    services: GraphbackServiceConfigMap,
    options: GraphbackResolverOptions
  }
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

/**
 * Creator method that can be used by underlying implementation to create new data service
 */
export type DataProviderCreator = (model: ModelDefinition) => GraphbackDataProvider

/**
 * Creator method that can be used by underlying implementation to create new data service
 */
export type ServiceCreator = (model: ModelDefinition, dataProvider: GraphbackDataProvider) => GraphbackCRUDService
