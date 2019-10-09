import { getFieldName, getTableName, ResolverType } from '../../..'
import { ModelTypeContext } from '../../../input/ContextTypes'
import { GraphbackCRUDService } from '../../../layers/service/GraphbackCRUDService'
import { subscriptionTopicMapping } from './subscriptionTopicMapping'

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
  private inputContext: ModelTypeContext[]
  private service: GraphbackCRUDService

  constructor(inputContext: ModelTypeContext[], service: GraphbackCRUDService) {
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

      const tableName = getTableName(resolverElement.name)
      if (resolverElement.config.create) {
        const resolverCreateField = getFieldName(resolverElement.name, ResolverType.CREATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: any) => {
          return this.service.create(tableName, args.input, context)
        }
      }
      if (resolverElement.config.update) {
        const updateField = getFieldName(resolverElement.name, ResolverType.UPDATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (parent: any, args: any, context: any) => {
          return this.service.update(tableName, args.id, args.input, context)
        }
      }
      if (resolverElement.config.delete) {
        const deleteField = getFieldName(resolverElement.name, ResolverType.DELETE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
          return this.service.delete(tableName, args.id, context)
        }
      }
      if (resolverElement.config.findAll) {
        const findAllField = getFieldName(resolverElement.name, ResolverType.FIND_ALL, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findAllField] = (parent: any, args: any, context: any) => {
          return this.service.findAll(tableName, context)
        }
      }
      if (resolverElement.config.find) {
        const findField = getFieldName(resolverElement.name, ResolverType.FIND, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findField] = (parent: any, args: any, context: any) => {
          return this.service.findBy(tableName, args.fields, context)
        }
      }

      this.createSubscriptions(resolverElement, resolvers)
    }
    // TODO relationships

    return resolvers;
  }

  // tslint:disable-next-line: no-any
  private createSubscriptions(resolverElement: ModelTypeContext, resolvers: any) {
    if (resolverElement.config.subCreate) {
      // tslint:disable-next-line: no-any
      resolvers.Subscription[`new${resolverElement.name}`] = (parent: any, parentparent: any, context: any) => {
        if (!context.pubSub) {
          // TODO internal logger?
          console.log("Missing pubsub mechanism in context object")

          return;
        }
        const createSubKey = subscriptionTopicMapping(ResolverType.CREATE, resolverElement.name);

        return context.pubSub.asyncIterator(createSubKey)
      }
    }

    if (resolverElement.config.subUpdate) {
      // tslint:disable-next-line: no-any
      resolvers.Subscription[`updated${resolverElement.name}`] = (parent: any, parentparent: any, context: any) => {
        if (!context.pubSub) {
          // TODO internal logger?
          console.log("Missing pubsub mechanism in context object")

          return;
        }
        const createSubKey = subscriptionTopicMapping(ResolverType.UPDATE, resolverElement.name);

        return context.pubSub.asyncIterator(createSubKey)
      }
    }

    if (resolverElement.config.subDelete) {
      // tslint:disable-next-line: no-any
      resolvers.Subscription[`deleted${resolverElement.name}`] = (parent: any, parentparent: any, context: any) => {
        if (!context.pubSub) {
          // TODO internal logger?
          console.log("Missing pubsub mechanism in context object")

          return;
        }
        const createSubKey = subscriptionTopicMapping(ResolverType.DELETE, resolverElement.name);

        return context.pubSub.asyncIterator(createSubKey)
      }
    }

    // Delete subscriptions if not needed.
    if (Object.keys(resolvers.Subscription).length === 0) {
      delete resolvers.Subscription;
    }
  }
}