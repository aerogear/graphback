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
    createObject(name: string, data: Type, context?: GraphbackContext): Promise<Type>;
    
    /**
     * Implementation for object updates 
     * 
     * @param name name of the object to create
     * @param id of the object to update
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    updateObject(name: string, id: string, data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object deletes 
     * 
     * @param name name of the object to create
     * @param data input data containing id 
     * @param context context object passed from graphql or rest layer
     */
    deleteObject(name: string, id: string, context?: GraphbackContext): Promise<string>;

    /**
     * Implementation for reading object 
     * 
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    readObject(name: string, id: string, context?: GraphbackContext):  Promise<Type>;

    /**
     * Implementation for finding all objects
     * 
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    findAll(name: string, context?: GraphbackContext): Promise<Type[]>;

    /**
     * Implementation for reading objects with filtering capabilities
     * 
     * @param name name of the object to create
     * @param filter filter by specific type
     * @param context context object passed from graphql or rest layer
     */
    findBy(name: string, filter: Type | AdvancedFilter, context?: GraphbackContext): Promise<Type[]>;

    
}