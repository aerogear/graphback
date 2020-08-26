import { GraphQLResolveInfo } from 'graphql';
import { FindByArgs } from './interfaces';
import { QueryFilter } from './QueryFilter';

export interface ResultList<T = any> {
  items: T[],
  count?: number;
  limit?: number;
  offset?: number;
}

/**
 * Graphback layered architecture component that can be called
 * from the resolver layer in GraphQL and Middlerware layer in RESTfull approach.
 *
 * Graphback implements server side procesing using following flow:
 *
 * `GraphQL Resolvers` ->  `GraphbackCRUDService` [1-*] -> `GraphbackDataProvider`
 *
 * Services can be composable (each service can reference multiple layers of other services).
 * For data abstraction Graphback `GraphbackDataProvider` can be being used.
 *
 * @see GraphbackDataProvider
 */
//tslint:disable-next-line: no-any
export interface GraphbackCRUDService<Type = any, GraphbackContext = any> {
  /**
   * Implementation for object creation
   *
   * @param data input data
   * @param context context object passed from graphql or rest layer
   */
  create(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;

  /**
   * Implementation for object updates
   *
   * @param data input data including id
   * @param context context object passed from graphql or rest layer
   */
  update(data: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;

  /**
   * Implementation for object deletes
   *
   * @param data data used for consistency reasons
   * @param context context object passed from graphql or rest layer
   */
  delete(data: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;

  /**
   * Fetch a single record by its unique attribute(s)
   *
   * @param filter - the unique attributes to fetch the record with
   * @param context context object from GraphQL/REST layer
   */
  findOne(filter: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;

  /**
   * Implementation for reading objects with filtering capabilities
   * 
   * @param {FindByArgs} [args] - Query arguments
   * @param {QueryFilter} [args.filter] - GraphQLCRUD filter to query specific data
   * @param {GraphbackPage} [args.page] - Gagination options
   * @param {GraphbackOrderBy} [args.orderBy] - optionally sort the results by a field
   * @param {GraphbackContext} [context] - context object passed from graphql or rest layer
   * @param {GraphQLResolveInfo} [info] - GraphQL query resolver info
   * @param {string} [path] - Path to a tree branch which should be mapped during fields extraction
   */
  findBy(args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>>;

  /**
   * Subscription for all creation events
   *
   * @param filter filter used in subscription
   * @param context additional context
   */
  subscribeToCreate(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> | undefined

  /**
   * Subscription for all update events
   *
   * @param filter filter used in subscription
   * @param context additional context
   */
  subscribeToUpdate(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> | undefined

  /**
   * Subscription for all deletion events
   *
   * @param filter filter used in subscription
   * @param context additional context
   */
  subscribeToDelete(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> | undefined

  /**
   * Specialized function that can utilize batching the data basing on
   * DataLoader library
   * 
   * @param {string} relationField - name of the field that will be used to match ids
   * @param {string|number} id - id of the object we want to load
   * @param {QueryFilter} [filter] - GraphQLCRUD filter object
   * @param {GraphbackContext} context - resolver context object that will be used to apply new loader
   * @param {GraphQLResolveInfo} info - GraphQL resolver info
   */
  batchLoadData(relationField: string, id: string | number, filter: QueryFilter, context: GraphbackContext, info?: GraphQLResolveInfo);
}
