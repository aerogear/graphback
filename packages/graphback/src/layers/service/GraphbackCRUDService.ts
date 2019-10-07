import { AdvancedFilter } from '../data/GraphbackDataProvider';


/**
 * TODO
 */
// tslint:disable-next-line: no-any
export interface GraphbackCRUDService<Type = any, GraphbackContext = any> {
    // FIXME Pagination support
    // CRUD
    createObject(name: string, data: Type, context?: GraphbackContext): Promise<Type>;
    updateObject(name: string, id: string, data: Type, context?: GraphbackContext): Promise<Type>;
    deleteObject(name: string, id: string, context?: GraphbackContext): Promise<string>;
    readObject(name: string, id: string, context?: GraphbackContext):  Promise<Type>;

    // Find
    findAll(name: string, context?: GraphbackContext): Promise<Type[]>;
    findBy(name: string, filter: Type | AdvancedFilter, context?: GraphbackContext): Promise<Type[]>;

    // TODO Dataloader support
    // Caching support for nested queries
    // readObjectWithCache(id: String, data: Type);
}