import * as DataLoader from "dataloader"
import { GraphbackRuntimeOptions } from '../api/GraphbackRuntimeOptions';
import { AdvancedFilter } from '../data/GraphbackDataProvider';


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
     * @param name name of the object to create
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    create(name: string, data: Type, options?: GraphbackRuntimeOptions, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object updates
     *
     * @param name name of the object to create
     * @param id of the object to update
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    update(name: string, id: string, data: Type, options?: GraphbackRuntimeOptions, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object deletes
     *
     * @param name name of the object to create
     * @param id of the object to delete
     * @param data data used for consistency reasons
     * @param context context object passed from graphql or rest layer
     */
    delete(name: string, id: string, data?: Type, options?: GraphbackRuntimeOptions, context?: GraphbackContext): Promise<string>;

    /**
     * Implementation for reading object
     *
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    read(name: string, id: string, options?: GraphbackRuntimeOptions, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for finding all objects
     *
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    findAll(name: string, options?: GraphbackRuntimeOptions, context?: GraphbackContext): Promise<Type[]>;

    /**
     * Implementation for reading objects with filtering capabilities
     *
     * @param name name of the object to create
     * @param filter filter by specific type
     * @param context context object passed from graphql or rest layer
     */
    findBy(name: string, filter: Type | AdvancedFilter, options?: GraphbackRuntimeOptions, context?: GraphbackContext): Promise<Type[]>;

    /**
     * Subscription for all creation events
     *
     * @param name name of the component to subscribe
     * @param context additional context
     */
    subscribeToCreate(name: string, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Subscription for all update events
     *
     * @param name name of the component to subscribe
     * @param context additional context
     */
    subscribeToUpdate(name: string, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Subscription for all deletion events
     *
     * @param name name of the component to subscribe
     * @param context additional context
     */
    subscribeToDelete(name: string, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Speciallized function that can utilize batching the data basing on 
     * DataLoader library
     * 
     * @param context resolver context object that will be used to apply new loader
     * @param name name of the object we want to load
     * @param relationField - name of the field that will be used to match ids
     * @param id id of the object we want to load 
     */
    batchLoadData(name: string, relationField: string, id: string | number, context: any);

}
