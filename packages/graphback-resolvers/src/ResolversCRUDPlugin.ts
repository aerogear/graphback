import { GraphbackPlugin, GraphbackCoreMetadata, getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition, getPrimaryKey, FieldRelationshipMetadata, getDeltaQuery } from '@graphback/core';
import { IResolvers } from '@graphql-tools/utils'


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
export class ResolversCRUDPlugin extends GraphbackPlugin {

  public addResolvers(metadata: GraphbackCoreMetadata): IResolvers {
    const resolvers: IResolvers = {
      Query: {},
      Mutation: {},
      Subscription: {}
    }

    const models = metadata.getModelDefinitions()

    for (const model of models) {
      const modelName = model.graphqlType.name;
      if (model.crudOptions.create) {
        const resolverCreateField = getFieldName(modelName, GraphbackOperationType.CREATE);

        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].create(args.input, context)
        }
      }
      if (model.crudOptions.update) {
        const updateField = getFieldName(modelName, GraphbackOperationType.UPDATE);

        resolvers.Mutation[updateField] = (parent: any, args: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].update(args.input, context)
        }
      }
      if (model.crudOptions.delete) {
        const deleteField = getFieldName(modelName, GraphbackOperationType.DELETE);

        resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].delete(args.input, context)
        }
      }

      if (model.crudOptions.findOne) {
        const findOneField = getFieldName(modelName, GraphbackOperationType.FIND_ONE);
        const primaryKeyLabel = getPrimaryKey(model.graphqlType).name;

        resolvers.Query[findOneField] = (parent: any, args: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].findOne({ [primaryKeyLabel]: args.id }, context)
        }
      }
      if (model.crudOptions.find) {
        const findField = getFieldName(modelName, GraphbackOperationType.FIND);
        //tslint:disable-next-line: no-any
        resolvers.Query[findField] = (parent: any, args: any, context: any) => {
          return context.services[modelName].findBy(args.filter, args.orderBy, args.page, context)
        }
      }

      // TODO: new DataSync resolver plugin
      // If delta marker is encountered, add resolver for `delta` query
      if (model.config.deltaSync) {
        const deltaQuery = getDeltaQuery(model.graphqlType.name)

        resolvers.Query[deltaQuery] = async (parent: any, args: any, context: any) => {
          const dataSyncService: any = context.services[modelName];

          if (dataSyncService.sync === undefined) {
            throw Error("Please use DataSync provider for delta queries");
          }

          return dataSyncService.sync(args.lastSync);
        }
      }

      const relationResolvers = this.createRelations(model.relationships);

      if (relationResolvers) {
        resolvers[modelName] = relationResolvers;
      }

      this.createSubscriptions(model, resolvers)
    }

    return resolvers
  }

  public getPluginName() {
    return 'ResolversCRUDPlugin'
  }

  public createResources() {
    // no resources to create
  }

  private createRelations(relationships: FieldRelationshipMetadata[]) {
    if (!relationships.length) { return undefined }

    const resolvers = {};
    for (const relationship of relationships) {
      let resolverFn: any;
      const modelName = relationship.relationType.name;
      const relationIdField = getPrimaryKey(relationship.relationType);

      if (relationship.kind === 'oneToMany') {
        resolverFn = (parent: any, args: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].batchLoadData(relationship.relationForeignKey, parent[relationIdField.name], args.filter, context);
        }
      } else {
        resolverFn = (parent: any, _: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].findOne({ [relationIdField.name]: parent[relationship.relationForeignKey] });
        }
      }

      if (resolverFn) {
        resolvers[relationship.ownerField.name] = resolverFn;
      }
    }

    return resolvers;
  }

  private createSubscriptions(resolverElement: ModelDefinition, resolvers: any) {
    const modelName = resolverElement.graphqlType.name;
    if (resolverElement.crudOptions.create && resolverElement.crudOptions.subCreate) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.CREATE)
      resolvers.Subscription[operation] = {
        subscribe: (_: any, __: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].subscribeToCreate({}, context);
        }
      }
    }

    if (resolverElement.crudOptions.update && resolverElement.crudOptions.subUpdate) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.UPDATE)
      resolvers.Subscription[operation] = {
        subscribe: (_: any, __: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].subscribeToUpdate({}, context);
        }
      }
    }

    if (resolverElement.crudOptions.delete && resolverElement.crudOptions.subDelete) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.DELETE)
      resolvers.Subscription[operation] = {
        subscribe: (_: any, __: any, context: any) => {
          if (!context.services || !context.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return context.services[modelName].subscribeToDelete({}, context);
        }
      }
    }
  }
}
