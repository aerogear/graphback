import { getFieldName, GraphbackOperationType, InputModelTypeContext } from "@graphback/core"
import { GraphbackCRUDService } from '../service/GraphbackCRUDService'

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
      const objectName = resolverElement.name.toLowerCase();
      if (resolverElement.config.create) {
        const resolverCreateField = getFieldName(resolverElement.name, GraphbackOperationType.CREATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: any) => {
          return this.service.create(objectName, args.input, {
            publishEvent: resolverElement.config.subCreate
          }, context)
        }
      }
      if (resolverElement.config.update) {
        const updateField = getFieldName(resolverElement.name, GraphbackOperationType.UPDATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (parent: any, args: any, context: any) => {
          return this.service.update(objectName, args.id, args.input, {
            publishEvent: resolverElement.config.subUpdate
          }, context)
        }
      }
      if (resolverElement.config.delete) {
        const deleteField = getFieldName(resolverElement.name, GraphbackOperationType.DELETE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
          return this.service.delete(objectName, args.id, args.input, {
            publishEvent: resolverElement.config.subDelete
          }, context)
        }
      }

      if (resolverElement.config.findAll) {
        const findAllField = getFieldName(resolverElement.name, GraphbackOperationType.FIND_ALL, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findAllField] = (parent: any, args: any, context: any) => {
          return this.service.findAll(objectName, context)
        }
      }
      if (resolverElement.config.find) {
        const findField = getFieldName(resolverElement.name, GraphbackOperationType.FIND, 's');
        // tslint:disable-next-line: no-any
        resolvers.Query[findField] = (parent: any, args: any, context: any) => {
          return this.service.findBy(objectName, args.fields, context)
        }
      }

      this.createRelations(resolverElement, resolvers)

      this.createSubscriptions(resolverElement, resolvers, objectName)
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
  private createSubscriptions(resolverElement: InputModelTypeContext, resolvers: any, objectName: string) {
    if (resolverElement.config.create && resolverElement.config.subCreate) {
      resolvers.Subscription[`new${resolverElement.name}`] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToCreate(objectName, context);
        }
      }
    }

    if (resolverElement.config.update && resolverElement.config.subUpdate) {
      resolvers.Subscription[`updated${resolverElement.name}`] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToUpdate(objectName, context);
        }
      }
    }

    if (resolverElement.config.delete && resolverElement.config.subDelete) {
      resolvers.Subscription[`deleted${resolverElement.name}`] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToDelete(objectName, context);
        }
      }
    }
  }

  private createRelations(resolverElement: InputModelTypeContext, resolvers: any) {
    for (const field of resolverElement.fields) {

      if (field.isType) {

        if (field.directives.OneToOne || !field.isArray) {
          // OneToOne
          let foreignIdName = `${resolverElement.name.toLowerCase()}Id`;
          if (field.directives.OneToOne) {
            foreignIdName = field.directives.OneToOne.field;
          }
          // TODO:
        }
        else if (field.directives.OneToMany || field.isArray) {
          // OneToMany
          let foreignId = `${resolverElement.name.toLowerCase()}Id`;
          if (field.directives.OneToMany) {
            foreignId = field.directives.OneToMany.field;
          }

          if (resolvers[resolverElement.name] === undefined) {
            resolvers[resolverElement.name] = {};
          }

          // tslint:disable-next-line: no-any
          resolvers[resolverElement.name][field.name] = (parent: any, args: any, context: any) => {
            return this.service.findBy(field.type.toLowerCase(), { [foreignId]: parent.id }, context);
          };
        }
      }
    }
  }
}

