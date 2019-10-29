import { InputModelTypeContext } from '../../../input/ContextTypes'
import { GraphbackCRUDService } from '../../../layers/service/GraphbackCRUDService'
import { getFieldName } from '../../../utils'
import { ResolverType } from '../ResolverType'

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
  private inputContext: InputModelTypeContext[]
  private service: GraphbackCRUDService

  constructor(inputContext: InputModelTypeContext[], service: GraphbackCRUDService) {
    this.inputContext = inputContext

    this.service = service;
  }

  public generate() {
    const resolvers = {
      Query: {},
      Mutation: {},
      Subscription: {}
    };
    for (const resolverElement of this.inputContext) {
      if (resolverElement.config.disableGen) {
        continue;
      }

      if (resolverElement.config.create) {
        const resolverCreateField = getFieldName(resolverElement.name, ResolverType.CREATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: any) => {
          return this.service.create(resolverElement, args.input, context)
        }
      }
      if (resolverElement.config.update) {
        const updateField = getFieldName(resolverElement.name, ResolverType.UPDATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (parent: any, args: any, context: any) => {
          return this.service.update(resolverElement, args.id, args.input, context)
        }
      }
      if (resolverElement.config.delete) {
        const deleteField = getFieldName(resolverElement.name, ResolverType.DELETE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
          return this.service.delete(resolverElement, args.id, context)
        }
      }
      if (resolverElement.config.findAll) {
        const findAllField = getFieldName(resolverElement.name, ResolverType.FIND_ALL, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findAllField] = (parent: any, args: any, context: any) => {
          return this.service.findAll(resolverElement, context)
        }
      }
      if (resolverElement.config.find) {
        const findField = getFieldName(resolverElement.name, ResolverType.FIND, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findField] = (parent: any, args: any, context: any) => {
          return this.service.findBy(resolverElement, args.fields, context)
        }
      }

      this.createSubscriptions(resolverElement, resolvers)
    }

    // Delete Mutations key if not needed.
    if (Object.keys(resolvers.Mutation).length === 0) {
      delete resolvers.Mutation;
    }

    // Delete Subscriptions key if not needed.
    if (Object.keys(resolvers.Subscription).length === 0) {
      delete resolvers.Subscription;
    }
    // TODO relationships

    return resolvers;
  }

  // tslint:disable-next-line: no-any
  private createSubscriptions(resolverElement: InputModelTypeContext, resolvers: any) {
    if (resolverElement.config.create && resolverElement.config.subCreate) {
      resolvers.Subscription[`new${resolverElement.name}`] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToCreate(resolverElement, context);
        }
      }
    }

    if (resolverElement.config.update && resolverElement.config.subUpdate) {
      resolvers.Subscription[`updated${resolverElement.name}`] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToUpdate(resolverElement, context);
        }
      }
    }

    if (resolverElement.config.delete && resolverElement.config.subDelete) {
      resolvers.Subscription[`deleted${resolverElement.name}`] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToDelete(resolverElement, context);
        }
      }
    }
  }
}
