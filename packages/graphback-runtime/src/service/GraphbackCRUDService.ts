import { AdvancedFilter } from '../data/GraphbackDataProvider';
import { GraphbackPage } from "../GraphbackPage"

export interface ResultList<T = any> {
  items: T[]
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
    create(data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object updates
     *
     * @param data input data including id
     * @param context context object passed from graphql or rest layer
     */
    update(data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object deletes
     *
     * @param id of the object to delete
     * @param data data used for consistency reasons
     * @param context context object passed from graphql or rest layer
     */
    delete(data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Fetch a single record by its unique attribute(s)
     *
     * @param filter - the unique attributes to fetch the record with
     * @param context context object from GraphQL/REST layer
     */
    findOne(filter: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * @deprecated
     * @param page
     * @param context
     */
    findAll(page?: GraphbackPage, context?: any): Promise<Type[]>

    /**
     * Implementation for reading objects with filtering capabilities
     *
     * @param filter filter by specific type
     * @param context context object passed from graphql or rest layer
     */
    findBy(filter: Type | AdvancedFilter, page?: GraphbackPage, context?: GraphbackContext): Promise<ResultList<Type>>;

    /**
     * Subscription for all creation events
     *
     * @param filter filter used in subscription
     * @param context additional context
     */
    subscribeToCreate(filter?: any, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Subscription for all update events
     *
     * @param filter filter used in subscription
     * @param context additional context
     */
    subscribeToUpdate(filter?: any, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Subscription for all deletion events
     *
     * @param filter filter used in subscription
     * @param context additional context
     */
    subscribeToDelete(filter?: any, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Speciallized function that can utilize batching the data basing on
     * DataLoader library
     *
     * @param context resolver context object that will be used to apply new loader
     * @param name name of the object we want to load
     * @param relationField - name of the field that will be used to match ids
     * @param id id of the object we want to load
     */
    batchLoadData(relationField: string, id: string | number, filter: any, context: any);

}
