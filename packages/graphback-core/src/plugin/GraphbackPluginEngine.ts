import { buildSchema, GraphQLSchema } from 'graphql';
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig';
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

    private plugins: GraphbackPlugin[]
    private metadata: GraphbackCoreMetadata;

    constructor(schema: GraphQLSchema | string, config: GraphbackGlobalConfig) {
        this.plugins = [];
        if (!schema) {
            throw new Error("Plugin engine requires schema");
        }
        let graphQLSchema;
        if (typeof schema === "string") {
            graphQLSchema = buildSchema(schema);
        } else {
            graphQLSchema = schema;
        }
        this.metadata = new GraphbackCoreMetadata(config, graphQLSchema);
    }

    public registerPlugin(...plugins: GraphbackPlugin[]): void {
        this.plugins.push(...plugins);
    }

    public execute(): GraphbackCoreMetadata {
        if (this.plugins.length === 0) {
            throw new Error("GraphbackEngine: No Graphback plugins registered")
        }
        
        // First we need to apply all required changes to the schema we need 
        // This is to ensure that every plugin can add changes to the schema
        for (const plugin of this.plugins) {
            const newSchema = plugin.transformSchema(this.metadata);
            this.metadata.setSchema(newSchema);
        }

        // Now we can save schema and all resouces that are related to it
        for (const plugin of this.plugins) {
            plugin.createResources(this.metadata);
        }

        return this.metadata;
    }
}
