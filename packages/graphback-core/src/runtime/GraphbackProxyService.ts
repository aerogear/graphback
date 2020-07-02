import { GraphbackCRUDService, ResultList } from './GraphbackCRUDService';
import { QueryFilter } from './QueryFilter';
import { GraphbackOrderBy, GraphbackPage } from '.';

/**
 * ProxyService that can be used by any services that wish to extend
 * Graphback functionality.
 * Service works by proxying method requests to another service or
 * datastore.
 */
export class GraphbackProxyService<Type = any> implements GraphbackCRUDService<Type> {

  protected proxiedService: GraphbackCRUDService;

  public constructor(service: GraphbackCRUDService) {
    this.proxiedService = service;
  }

  public create(data: Type, context: any): Promise<Type> {
    return this.proxiedService.create(data, context);
  }

  public update(data: Type, context: any): Promise<Type> {
    return this.proxiedService.update(data, context);
  }

  public delete(data: Type, context: any): Promise<Type> {
    return this.proxiedService.delete(data, context);
  }

  public findOne(args: any, context: any): Promise<Type> {
    return this.proxiedService.findOne(args, context);
  }

  public findBy(filter: QueryFilter<Type>, context: any, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<ResultList<Type>> {
    return this.proxiedService.findBy(filter, context, page, orderBy);
  }

  public subscribeToCreate(filter?: any, context?: any): AsyncIterator<Type> {
    return this.proxiedService.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate(filter?: any, context?: any): AsyncIterator<Type> {
    return this.proxiedService.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete(filter?: any, context?: any): AsyncIterator<Type> {
    return this.proxiedService.subscribeToDelete(filter, context)
  }

  public batchLoadData(relationField: string, id: string | number, filter: any, context: any) {
    return this.proxiedService.batchLoadData(relationField, id, filter, context)
  }
}
