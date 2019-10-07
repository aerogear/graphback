
// If we come with Union on client we might use some complex JSON for describing rules
// and single key for type for simple use cases
// tslint:disable-next-line: no-any
export type AdvancedFilter = any;


// TODO pagination
interface PagedResult<T> {
    result: T;
    total: number;
    page: number;
}

/**
 * Builds CRUD interface for data access 
 */
// tslint:disable-next-line: no-any
export interface GraphbackDataProvider<Type = any, GraphbackContext = any> {
    // FIXME Pagination support
    // CRUD
    // FIXME rename to Object = object?
    createObject(name: string, data: Type, context?: GraphbackContext): Promise<Type>;
    readObject(name: string, id: string, context?: GraphbackContext): Promise<Type>;
    updateObject(name: string, id: string, data: Type, context?: GraphbackContext): Promise<Type>;
    deleteObject(name: string, id: string, context?: GraphbackContext): Promise<string>;

    // Find
    findAll(name: string, context?: GraphbackContext): Promise<Type[]>;
    findBy(name: string, filter: Type | AdvancedFilter, context?: GraphbackContext): Promise<Type[]>;

    // Dataloader support
    // Caching support for nested queries
    // readObjectWithCache(id: String, data: Type);
}
