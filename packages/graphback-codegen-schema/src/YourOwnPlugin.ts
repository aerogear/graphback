import { SchemaCRUDPlugin, SchemaCRUDPluginConfig } from './SchemaCRUDPlugin';
import { getFieldName, GraphbackOperationType, GraphbackContext, getSelectedFieldsFromResolverInfo, ModelDefinition } from '@graphback/core';
import { GraphQLResolveInfo } from 'graphql';
import { IFieldResolver } from '@graphql-tools/utils';


/**
 * Plugin that can be used when creating `buildGraphbackAPI` that will override schema plugin
 *
  ```ts
   const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
    dataProviderCreator: createMongoDbProvider(db),
    plugins: [new YourPlugin()]
  });
  ```
 */
export class YourOwnPlugin extends SchemaCRUDPlugin {


  public constructor(pluginConfig?: SchemaCRUDPluginConfig) {
    super(pluginConfig)
  }
  protected addFindQueryResolver(model: ModelDefinition, queryObj: IFieldResolver<any, any>) {
    const modelType = model.graphqlType
    const modelName = modelType.name;
    const findField = getFieldName(modelName, GraphbackOperationType.FIND);

    queryObj[findField] = async (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      const selectedFields = getSelectedFieldsFromResolverInfo(info, model, "items");
      const count = getSelectedFieldsFromResolverInfo(info, model).some((field: string) => field === "count");
      const graphback = {
        services: context.graphback.services,
        // here we have what we query form the database for root type (not relationship)
        options: { selectedFields, aggregations: { count } }
      };
      // extend info
      // https://github.com/graphql/graphql-js/blob/7b3241329e1ff49fb647b043b80568f0cf9e1a7c/src/execution/execute.js#L680
      // info = buildResolveInfo(...)
      return context.graphback.services[modelName].findBy(args.filter, { ...context, graphback }, args.page, args.orderBy)
    }
  }
}
