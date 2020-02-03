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
    private schema: GraphQLSchema
    private metadata: GraphbackCoreMetadata;

    constructor(schema: GraphQLSchema | string, config: GraphbackGlobalConfig) {
        this.plugins = [];
        if (!schema) {
            throw new Error("Plugin engine requires schema");
        }
        if (typeof schema === "string") {
            this.schema = buildSchema(schema);
        } else {
            this.schema = schema;
        }
        this.metadata = new GraphbackCoreMetadata(config, this.schema);
    }

    public registerPlugin(...plugins: GraphbackPlugin[]): void {
        this.plugins.push(...plugins);
    }

    public execute(): GraphbackCoreMetadata {
        let newSchema = this.schema;
        // First we need to apply all required changes to the schema we need 
        // This is to ensure that every plugin can add code to the schema
        for (const plugin of this.plugins) {
            plugin.init(this.metadata);
            newSchema = plugin.transformSchema(this.metadata);
            this.metadata.setSchema(newSchema);
        }

        // Now we can save schema and all resouces that are related to it
        for (const plugin of this.plugins) {
            plugin.generateResources();
        }

        return this.metadata;
    }
}