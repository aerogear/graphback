import { getFieldName, getTableName, ResolverType } from '../../..'
import { Type } from '../../../input/ContextTypes'
import { GraphbackCRUDService } from '../../../layers/service/GraphbackCRUDService'

/**
 * Generate runtime resolver layer using Apollo GraphQL format 
 * and injected service layer. Service layer offers various capabilities like monitoring, cache etc. 
 * so resolver logic can be kept simple and interchangable.
 * 
 * Resolvers are formatted using graphql-tools format
 * 
 * ```javascript
 * const resolvers = {
 *    Query: {...}
 *    Mutation: {...}
 *    Subscription: {...}
 * }
 * ```
 * 
 */
export class LayeredRuntimeResolverGenerator {
  private inputContext: Type[]
  private service: GraphbackCRUDService

  constructor(inputContext: Type[], service: GraphbackCRUDService) {
    this.inputContext = inputContext

    this.service = service;
  }

  public generate() {
    const resolvers = {
      Query: {},
      Mutation: {}
    };
    for (const resolverElement of this.inputContext) {
      if (resolverElement.config.disableGen) {
        continue;
      }

      const tableName = getTableName(resolverElement.name)
      if (resolverElement.config.create) {
        const resolverCreateField = getFieldName(resolverElement.name, ResolverType.CREATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[resolverCreateField] = (_: any, args: any, context: any) => {
          return this.service.create(tableName, args.input, context)
        }
      }
      if (resolverElement.config.update) {
        const updateField = getFieldName(resolverElement.name, ResolverType.UPDATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (_: any, args: any, context: any) => {
          return this.service.update(tableName, args.id, args.input, context)
        }
      }
      if (resolverElement.config.delete) {
        const deleteField = getFieldName(resolverElement.name, ResolverType.DELETE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (_: any, args: any, context: any) => {
          return this.service.delete(tableName, args.id, context)
        }
      }
      if (resolverElement.config.findAll) {
        const findAllField = getFieldName(resolverElement.name, ResolverType.FIND_ALL, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findAllField] = (_: any, args: any, context: any) => {
          return this.service.findAll(tableName, context)
        }
      }
      if (resolverElement.config.find) {
        const findField = getFieldName(resolverElement.name, ResolverType.FIND, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findField] = (_: any, args: any, context: any) => {
          return this.service.findBy(tableName, args.filter, context)
        }
      }
      // TODO subscriptions
      // TODO relationships
    }

    return resolvers;
  }
}