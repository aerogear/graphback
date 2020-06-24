import { GraphbackCRUDService, ResultList } from './GraphbackCRUDService';
import { GraphbackOrderBy, GraphbackPage } from '.';

/**
 * This custom CRUD Service shows another potential way to add auth
 *
 * This is actually quite nice and clean but it does not allow for field level auth.
 * It's still a possibility that we could go with though!
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

  public findBy(filter: any, context: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage): Promise<ResultList<T>> {
    return this.proxiedService.findBy(filter, context, orderBy, page);
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
