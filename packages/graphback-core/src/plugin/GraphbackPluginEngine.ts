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
        for (const plugin of this.plugins) {
            newSchema = plugin.transformSchema(this.metadata);
            // FIXME kinda convoluted 
            // FIXME - should schema stay original object?
            this.metadata.setSchema(newSchema);

        }

        return this.metadata;
    }
}