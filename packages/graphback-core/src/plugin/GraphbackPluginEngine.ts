import { buildSchema, GraphQLSchema } from 'graphql';
import { SchemaComposer } from 'graphql-compose';
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig';
import { GraphbackPlugin } from './GraphbackPlugin';
import { SchemaCompType } from './SchemaComposer';

/**
 * Allows to execute chain of plugins that create resources.
 * Common use case is to decorate GraphQL schema with additional
 * actions and generate files like resolvers and database access logic
 *
 * Usage:
 * ```js
 * const engine = GraphbackPluginEngine(schema);
 * engine.registerPlugin(plugin);
 * printSchema(engine.createResources());
 * ```
 */
export class GraphbackPluginEngine {

    private plugins: GraphbackPlugin[];
    private metadata: GraphbackCoreMetadata;

    public constructor(schemaComposer: SchemaCompType, config: GraphbackGlobalConfig) {
        this.plugins = [];
        if (!schemaComposer) {
            throw new Error("Plugin engine requires schema");
        }
        this.metadata = new GraphbackCoreMetadata(config, schemaComposer);
    }

    public registerPlugin(...plugins: GraphbackPlugin[]): void {
        this.plugins.push(...plugins);
    }

    public createResources(): GraphbackCoreMetadata {
        this.createSchema();
        //Save schema and all files
        for (const plugin of this.plugins) {
            plugin.createResources(this.metadata);
        }

        return this.metadata;
    }

    public createSchema(): GraphbackCoreMetadata {
        if (this.plugins.length === 0) {
            throw new Error("GraphbackEngine: No Graphback plugins registered")
        }
        //We need to apply all required changes to the schema we need
        //This is to ensure that every plugin can add changes to the schema
        for (const plugin of this.plugins) {
          plugin.transformSchema(this.metadata);
        }

        return this.metadata;
    }
}
