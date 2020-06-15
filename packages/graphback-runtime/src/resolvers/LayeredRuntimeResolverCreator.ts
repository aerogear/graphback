import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition, getPrimaryKey, FieldRelationshipMetadata, getDeltaQuery } from '@graphback/core';
import { GraphbackContext } from '../service/GraphbackContext';

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
 * TODO: Remove this class and GraphbackRuntime once https://github.com/aerogear/graphback/issues/1448 is completed
 */
export class LayeredRuntimeResolverCreator {
  private models: ModelDefinition[];

  public constructor(models: ModelDefinition[]) {
    this.models = models;
  }

  public generate() {
    const resolvers = {
      Query: {},
      Mutation: {},
      Subscription: {}
    };
    for (const resolverElement of this.models) {
      const modelName = resolverElement.graphqlType.name;
      if (resolverElement.crudOptions.create) {
        const resolverCreateField = getFieldName(modelName, GraphbackOperationType.CREATE);
        //tslint:disable-next-line: no-any
        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].create(args.input, context)
        }
      }
      if (resolverElement.crudOptions.update) {
        const updateField = getFieldName(modelName, GraphbackOperationType.UPDATE);
        //tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (parent: any, args: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].update(args.input, context)
        }
      }
      if (resolverElement.crudOptions.delete) {
        const deleteField = getFieldName(modelName, GraphbackOperationType.DELETE);
        //tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (parent: any, args: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].delete(args.input, context)
        }
      }

      if (resolverElement.crudOptions.findOne) {
        const findOneField = getFieldName(modelName, GraphbackOperationType.FIND_ONE);
        const primaryKeyLabel = getPrimaryKey(resolverElement.graphqlType).name;
        //tslint:disable-next-line: no-any
        resolvers.Query[findOneField] = (parent: any, args: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].findOne({ [primaryKeyLabel]: args.id }, context)
        }
      }
      if (resolverElement.crudOptions.find) {
        const findField = getFieldName(modelName, GraphbackOperationType.FIND);
        //tslint:disable-next-line: no-any
        resolvers.Query[findField] = (parent: any, args: any, context: GraphbackContext) => {
          return context.graphback[modelName].findBy(args.filter, args.orderBy, args.page, context)
        }
      }

      // If delta marker is encountered, add resolver for `delta` query
      if (resolverElement.config.deltaSync) {
        const deltaQuery = getDeltaQuery(resolverElement.graphqlType.name)

        resolvers.Query[deltaQuery] = async (parent: any, args: any, context: GraphbackContext) => {
          const dataSyncService: any = context.graphback[modelName];

          if (dataSyncService.sync === undefined) {
            throw Error("Please use DataSync service for delta queries");
          }

          return dataSyncService.sync(args.lastSync, args.filter);
        }
      }

      const relationResolvers = this.createRelations(resolverElement.relationships);

      if (relationResolvers) {
        resolvers[modelName] = relationResolvers;
      }

      this.createSubscriptions(resolverElement, resolvers)
    }

    //Delete Mutations key if not needed.
    if (Object.keys(resolvers.Mutation).length === 0) {
      delete resolvers.Mutation;
    }

    //Delete Subscriptions key if not needed.
    if (Object.keys(resolvers.Subscription).length === 0) {
      delete resolvers.Subscription;
    }

    return resolvers;
  }


  //tslint:disable-next-line: no-any
  private createSubscriptions(resolverElement: ModelDefinition, resolvers: any) {
    const modelName = resolverElement.graphqlType.name;
    if (resolverElement.crudOptions.create && resolverElement.crudOptions.subCreate) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.CREATE)
      resolvers.Subscription[operation] = {
        //tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].subscribeToCreate({}, context);
        }
      }
    }

    if (resolverElement.crudOptions.update && resolverElement.crudOptions.subUpdate) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.UPDATE)
      resolvers.Subscription[operation] = {
        //tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].subscribeToUpdate({}, context);
        }
      }
    }

    if (resolverElement.crudOptions.delete && resolverElement.crudOptions.subDelete) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.DELETE)
      resolvers.Subscription[operation] = {
        //tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].subscribeToDelete({}, context);
        }
      }
    }
  }

  private createRelations(relationships: FieldRelationshipMetadata[]) {
    if (!relationships.length) { return undefined }

    const resolvers = {};
    for (const relationship of relationships) {
      let resolverFn: any;
      const modelName = relationship.relationType.name;
      const relationIdField = getPrimaryKey(relationship.relationType);

      if (relationship.kind === 'oneToMany') {
        resolverFn = (parent: any, args: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].batchLoadData(relationship.relationForeignKey, parent[relationIdField.name], args.filter, context);
        }
      } else {
        resolverFn = (parent: any, args: any, context: GraphbackContext) => {
          if (!context.graphback || !context.graphback[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.graphback[modelName].findOne({ [relationIdField.name]: parent[relationship.relationForeignKey] });
        }
      }

      if (resolverFn) {
        resolvers[relationship.ownerField.name] = resolverFn;
      }
    }

    return resolvers;
  }
}

