import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition } from '@graphback/core';
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
// TODO
export class LayeredRuntimeResolverGenerator {
  private service: GraphbackCRUDService
  private models: ModelDefinition[];

  constructor(models: ModelDefinition[], service: GraphbackCRUDService) {
    this.models = models
    this.service = service;
  }

  public generate() {
    const resolvers = {
      Query: {},
      Mutation: {},
      Subscription: {}
    };
    for (const resolverElement of this.models) {
      if (resolverElement.crudOptions.disableGen) {
        continue;
      }
      // TODO this should use mapping
      const objectName = resolverElement.graphqlType.name.toLowerCase();
      if (resolverElement.crudOptions.create) {
        const resolverCreateField = getFieldName(resolverElement.graphqlType.name, GraphbackOperationType.CREATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: any) => {
          return this.service.create(objectName, args.input, {
            publishEvent: resolverElement.crudOptions.subCreate
          }, context)
        }
      }
      if (resolverElement.crudOptions.update) {
        const updateField = getFieldName(resolverElement.graphqlType.name, GraphbackOperationType.UPDATE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (parent: any, args: any, context: any) => {
          return this.service.update(objectName, args.id, args.input, {
            publishEvent: resolverElement.crudOptions.subUpdate
          }, context)
        }
      }
      if (resolverElement.crudOptions.delete) {
        const deleteField = getFieldName(resolverElement.graphqlType.name, GraphbackOperationType.DELETE);
        // tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
          return this.service.delete(objectName, args.id, args.input, {
            publishEvent: resolverElement.crudOptions.subDelete
          }, context)
        }
      }

      if (resolverElement.crudOptions.findAll) {
        const findAllField = getFieldName(resolverElement.graphqlType.name, GraphbackOperationType.FIND_ALL);
        // tslint:disable-next-line: no-any
        resolvers.Query[findAllField] = (parent: any, args: any, context: any) => {
          return this.service.findAll(objectName, context)
        }
      }
      if (resolverElement.crudOptions.find) {
        const findField = getFieldName(resolverElement.graphqlType.name, GraphbackOperationType.FIND);
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
  private createSubscriptions(resolverElement: ModelDefinition, resolvers: any, objectName: string) {
    const name = resolverElement.graphqlType.name;
    if (resolverElement.crudOptions.create && resolverElement.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE)
      resolvers.Subscription[operation] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToCreate(objectName, context);
        }
      }
    }

    if (resolverElement.crudOptions.update && resolverElement.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)
      resolvers.Subscription[operation] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToUpdate(objectName, context);
        }
      }
    }

    if (resolverElement.crudOptions.delete && resolverElement.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE)
      resolvers.Subscription[operation] = {
        // tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          return this.service.subscribeToDelete(objectName, context);
        }
      }
    }
  }

  private createRelations(resolverElement: ModelDefinition, resolvers: any) {
    const fields = Object.values(resolverElement.graphqlType.getFields());
    for (const field of fields) {
      // This is very very broken. Commented out 
      // FIXME
      // TODO
      // Warning!
      // if (field.isType) {
      //   if (field.annotations.OneToOne || !field.isArray) {
      //     // TODO - this is very wrong
      //     let foreignIdName = `${resolverElement.graphqlType.name.toLowerCase()}Id`;
      //     if (field.annotations.OneToOne) {
      //       foreignIdName = field.annotations.OneToOne.field;
      //     }
      //   }
      //   else if (field.annotations.OneToMany || field.isArray) {
      //     // TODO - this is very wrong
      //     let foreignId = `${resolverElement.graphqlType.name.toLowerCase()}Id`;
      //     if (field.annotations.OneToMany) {
      //       foreignId = field.annotations.OneToMany.field;
      //     }

      //     if (resolvers[resolverElement.graphqlType.name] === undefined) {
      //       resolvers[resolverElement.graphqlType.name] = {};
      //     }

      //     // tslint:disable-next-line: no-any
      //     // TODO - this is very wrong
      //     resolvers[resolverElement.graphqlType.name][field.name] = (parent: any, args: any, context: any) => {
      //       return this.service.findBy(field.type.toLowerCase(), { [foreignId]: parent.id }, context);
      //     };
      //  }
      // }
    }
  }
}

