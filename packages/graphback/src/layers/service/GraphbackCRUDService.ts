import { InputModelTypeContext } from '../../input/ContextTypes';
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
// tslint:disable-next-line: no-any
export interface GraphbackCRUDService<Type = any, GraphbackContext = any> {

    /**
     * Implementation for object creation 
     * 
     * @param name name of the object to create
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    create(inputType: InputModelTypeContext, data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object updates 
     * 
     * @param name name of the object to create
     * @param id of the object to update
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    update(inputType: InputModelTypeContext, id: string, data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object deletes 
     * 
     * @param name name of the object to create
     * @param data input data containing id 
     * @param context context object passed from graphql or rest layer
     */
    delete(inputType: InputModelTypeContext, id: string, context?: GraphbackContext): Promise<string>;

    /**
     * Implementation for reading object 
     * 
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    read(inputType: InputModelTypeContext, id: string, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for finding all objects
     * 
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    findAll(inputType: InputModelTypeContext, context?: GraphbackContext): Promise<Type[]>;

    /**
     * Implementation for reading objects with filtering capabilities
     * 
     * @param name name of the object to create
     * @param filter filter by specific type
     * @param context context object passed from graphql or rest layer
     */
    findBy(inputType: InputModelTypeContext, filter: Type | AdvancedFilter, context?: GraphbackContext): Promise<Type[]>;

    /**
     * Subscription for all creation events
     * 
     * @param name name of the component to subscribe
     * @param context additional context
     */
    subscribeToCreate(inputType: InputModelTypeContext, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Subscription for all update events
     * 
     * @param name name of the component to subscribe
     * @param context additional context
     */
    subscribeToUpdate(inputType: InputModelTypeContext, context?: GraphbackContext): AsyncIterator<Type> | undefined

    /**
     * Subscription for all deletion events
     * 
     * @param name name of the component to subscribe
     * @param context additional context
     */
    subscribeToDelete(inputType: InputModelTypeContext, context?: GraphbackContext): AsyncIterator<Type> | undefined
}