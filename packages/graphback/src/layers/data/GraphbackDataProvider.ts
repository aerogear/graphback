
// If we come with Union on client we might use some complex JSON for describing rules
// and single key for type for simple use cases
// tslint:disable-next-line: no-any
export type AdvancedFilter = any;

/**
 * Graphback layered architecture component that can be called 
 * from the service layer in both RESTFULL and GraphQL middlewares.
 * 
 * Graphback implements server side procesing using following flow:
 * 
 * `GraphQL Resolvers` ->  `GraphbackCRUDService` [1-*] -> `GraphbackDataProvider`
 * 
 * Data layer can be composable (each provider can reference multiple layers of other providers).
 * 
 * @see GraphbackCRUDService
 */
// tslint:disable-next-line: no-any
export interface GraphbackDataProvider<Type = any, GraphbackContext = any> {

    /**
     * Implementation for object creation 
     * 
     * @param name name of the object to create
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    create(name: string, data: Type, context?: GraphbackContext): Promise<Type>;
    
    /**
     * Implementation for object updates 
     * 
     * @param name name of the object to create
     * @param id of the object to update
     * @param data input data
     * @param context context object passed from graphql or rest layer
     */
    update(name: string, id: string, data: Type, context?: GraphbackContext): Promise<Type>;

    /**
     * Implementation for object deletes 
     * 
     * @param name name of the object to create
     * @param id of the object to delete
     * @param context context object passed from graphql or rest layer
     */
    delete(name: string, id: string, context?: GraphbackContext): Promise<string>;

    /**
     * Implementation for reading object 
     * 
     * @param name name of the object to create
     * @param id id of the object
     * @param context context object passed from graphql or rest layer
     */
    read(name: string, id: string, context?: GraphbackContext):  Promise<Type>;

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


    /**
     * Read multiple items by their id's (used for lazy data loading purposes)
     * 
     * @param name 
     * @param ids array of identifiers that needs to be fetched
     */
    batchRead(name: string, ids: string[]): Promise<Type[]>

}
