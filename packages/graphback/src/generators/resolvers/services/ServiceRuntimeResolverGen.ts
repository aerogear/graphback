import { getFieldName, getTableName, ResolverType } from '../../..'
import { Type } from '../../../input/ContextTypes'
import { GraphbackCRUDService } from '../../../layers/service/GraphbackCRUDService'

/**
 * Generate runtime resolver layer using Apollo GraphQL format 
 * and injected service layer. Service layer offers various capabilities like monitoring, cache etc. 
 * so resolver logic can be kept simple and interchangable.
 */
export class ServicesRuntimeResolverGenerator {
  private inputContext: Type[]
  private service: GraphbackCRUDService

  constructor(inputContext: Type[], service: GraphbackCRUDService) {
    this.inputContext = inputContext

    this.service = service;
  }

  public generate() {
    const resolvers = {}; 
    for (const resolverElement of this.inputContext) {
      if (resolverElement.config.disableGen) {
        continue;
      }
      // FIXME Do we need to have indirect dependency between resolvers and schema thru config.
      // How about shadowing generated stuff with custom query/mutation
      const tableName = getTableName(resolverElement.name)
      if (resolverElement.config.create) {
        const resolverCreateField = getFieldName(resolverElement.name, ResolverType.CREATE);
        // tslint:disable-next-line: no-any
        resolvers[resolverCreateField] = (_: any, args: any, context: any) => {
          return this.service.createObject(tableName, args, context)
        }
      }
      if (resolverElement.config.update) {
        const updateField = getFieldName(resolverElement.name, ResolverType.UPDATE);
        // tslint:disable-next-line: no-any
        resolvers[updateField] = (_: any, args: any, context: any) => {
          return this.service.updateObject(tableName, args.id, args.input, context)
        }
      }
      if (resolverElement.config.delete) {
        const deleteField = getFieldName(resolverElement.name, ResolverType.DELETE);
        // tslint:disable-next-line: no-any
        resolvers[deleteField] = (_: any, args: any, context: any) => {
          return this.service.deleteObject(tableName, args.id, context)
        }
      }
      if (resolverElement.config.findAll) {
        const findAllField = getFieldName(resolverElement.name, ResolverType.FIND_ALL);
        // tslint:disable-next-line: no-any
        resolvers[findAllField] = (_: any, args: any, context: any) => {
          return this.service.findAll(tableName, context)
        }
      }
      if (resolverElement.config.find) {
        const findField = getFieldName(resolverElement.name, ResolverType.FIND);
        // tslint:disable-next-line: no-any
        resolvers[findField] = (_: any, args: any, context: any) => {
          return this.service.findBy(tableName, args.filter, context)
        }
      }
      // TODO subscriptions
      // TODO logging
      // TODO metrics

    }

    return resolvers;
  }
}