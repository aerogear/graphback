import { GraphbackCRUDService, ResultList } from './GraphbackCRUDService';
import { GraphbackOrderBy, GraphbackPage } from '.';

/**
 * ProxyService that can be used by any services that wish to extend
 * Graphback functionality.
 * Service works by proxying method requests to another service or
 * datastore.
 */
export class GraphbackProxyService<T = any> implements GraphbackCRUDService<T> {

  protected proxiedService: GraphbackCRUDService;

  public constructor(service: GraphbackCRUDService) {
    this.proxiedService = service;
  }

  public create(data: T, context: any): Promise<T> {
    return this.proxiedService.create(data, context);
  }

  public update(data: T, context: any): Promise<T> {
    return this.proxiedService.update(data, context);
  }

  public delete(data: T, context: any): Promise<T> {
    return this.proxiedService.delete(data, context);
  }

  public findOne(args: any, context: any): Promise<T> {
    return this.proxiedService.findOne(args, context);
  }

  public findBy(filter: any, context: any, page?: GraphbackPage, orderBy?: GraphbackOrderBy): Promise<ResultList<T>> {
    return this.proxiedService.findBy(filter, context, page, orderBy);
  }

  public subscribeToCreate(filter?: any, context?: any): AsyncIterator<T> {
    return this.proxiedService.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate(filter?: any, context?: any): AsyncIterator<T> {
    return this.proxiedService.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete(filter?: any, context?: any): AsyncIterator<T> {
    return this.proxiedService.subscribeToDelete(filter, context)
  }

  public batchLoadData(relationField: string, id: string | number, filter: any, context: any) {
    return this.proxiedService.batchLoadData(relationField, id, filter, context)
  }
}
