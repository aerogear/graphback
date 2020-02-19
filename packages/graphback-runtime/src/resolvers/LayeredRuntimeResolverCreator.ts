import { getFieldName, getSubscriptionName, GraphbackOperationType, ModelDefinition, RelationshipMetadata, getPrimaryKey } from '@graphback/core';
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
export class LayeredRuntimeResolverCreator {
  private services: { [key: string]: GraphbackCRUDService }
  private models: ModelDefinition[];

  public constructor(models: ModelDefinition[], services: { [key: string]: GraphbackCRUDService }) {
    this.models = models;
    this.services = services;
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
        resolvers.Mutation[resolverCreateField] = (parent: any, args: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].create(args.input, context)
        }
      }
      if (resolverElement.crudOptions.update) {
        const updateField = getFieldName(modelName, GraphbackOperationType.UPDATE);
        //tslint:disable-next-line: no-any
        resolvers.Mutation[updateField] = (parent: any, args: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].update(args.input, context)
        }
      }
      if (resolverElement.crudOptions.delete) {
        const deleteField = getFieldName(modelName, GraphbackOperationType.DELETE);
        //tslint:disable-next-line: no-any
        resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].delete(args.input, context)
        }
      }

      if (resolverElement.crudOptions.findAll) {
        const findAllField = getFieldName(modelName, GraphbackOperationType.FIND_ALL);
        //tslint:disable-next-line: no-any
        resolvers.Query[findAllField] = (parent: any, args: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].findAll(context)
        }
      }
      if (resolverElement.crudOptions.find) {
        const findField = getFieldName(modelName, GraphbackOperationType.FIND);
        //tslint:disable-next-line: no-any
        resolvers.Query[findField] = (parent: any, args: any, context: any) => {
          return this.services[modelName].findBy(args.fields, context)
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
        subscribe: (_: any, __: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].subscribeToCreate({}, context);
        }
      }
    }

    if (resolverElement.crudOptions.update && resolverElement.crudOptions.subUpdate) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.UPDATE)
      resolvers.Subscription[operation] = {
        //tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].subscribeToUpdate({}, context);
        }
      }
    }

    if (resolverElement.crudOptions.delete && resolverElement.crudOptions.subDelete) {
      const operation = getSubscriptionName(modelName, GraphbackOperationType.DELETE)
      resolvers.Subscription[operation] = {
        //tslint:disable-next-line: no-any
        subscribe: (_: any, __: any, context: any) => {
          if (!this.services[modelName]) {
            throw new Error(`Missing service for ${modelName}`);
          }

          return this.services[modelName].subscribeToDelete({}, context);
        }
      }
    }
  }

  private createRelations(relationships: RelationshipMetadata[]) {
    if (!relationships.length) { return undefined }

    const resolvers = {};
    for (const relationship of relationships) {
      let resolverFn: any;
      const modelName = relationship.relationType.name;
      const relationIdField = getPrimaryKey(relationship.relationType);

      if (!this.services[modelName]) {
        throw new Error(`Missing service for ${modelName}`);
      }

      if (relationship.relationshipKind === 'oneToMany') {
        resolverFn = (parent: any, args: any, context: any) => {
          return this.services[modelName].batchLoadData(relationship.foreignKey.name, parent[relationIdField.name], context);
        }
      } else {
        resolverFn = (parent: any, args: any, context: any) => {
          return this.services[modelName].findBy({ id: parent[relationIdField.name] }).then((results: any) => results[0])
        }
      }

      if (resolverFn) {
        resolvers[relationship.parentField] = resolverFn;
      }
    }

    return resolvers;
  }
}

