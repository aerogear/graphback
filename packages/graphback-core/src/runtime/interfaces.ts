import { ModelDefinition } from '..';
import { GraphbackCRUDService } from './GraphbackCRUDService';
import { QueryFilter } from './QueryFilter';
import { GraphbackDataProvider } from '.';

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

/**
 * Arguments interface for the `findBy` CRUD query
 */
export interface FindByArgs {
  filter?: QueryFilter
  page?: GraphbackPage
  orderBy?: GraphbackOrderBy
}

/**
 * Creator method that can be used by underlying implementation to create new data service
 */
export type DataProviderCreator = (model: ModelDefinition) => GraphbackDataProvider

/**
 * Creator method that can be used by underlying implementation to create new data service
 */
export type ServiceCreator = (model: ModelDefinition, dataProvider: GraphbackDataProvider) => GraphbackCRUDService
