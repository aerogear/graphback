import { buildSchema, GraphQLSchema } from 'graphql';
import { GraphbackPlugin } from './GraphbackPlugin';

/**
 * Allows to execute chain of plugins that create resources. 
 * Common use case is to decorate GraphQL schema with additional 
 * actions and generate files like resolvers and database access logic
 * 
 * Usage:
 * ```js
 * const engine = GraphbackPluginEngine(schema);
 * engine.registerPlugin(plugin);
 * printSchema(engine.execute());
 * ```
 */
export class GraphbackPluginEngine {

    private plugins: GraphbackPlugin[];
    private schema: GraphQLSchema;

    constructor(schema: GraphQLSchema | string) {
        if (!schema) {
            throw new Error("Plugin engine requires schema");
        }
        if (typeof schema === "string") {
            this.schema = buildSchema(schema);
        } else {
            this.schema = schema;
        }
    }

    public registerPlugin(plugin: GraphbackPlugin): void {
        this.plugins.push(plugin);
    }

    public execute(): GraphQLSchema {
        let newSchema = this.schema;
        for (const plugin of this.plugins) {
            newSchema = plugin.transformSchema(newSchema);
        }

        return newSchema;
    }
}