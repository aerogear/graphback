import { buildSchema, GraphQLSchema } from 'graphql';
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig';
import { GraphbackPlugin } from './GraphbackPlugin';
import { SchemaComposer } from 'graphql-compose';

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

    private plugins: GraphbackPlugin[]
    private metadata: GraphbackCoreMetadata;

    public constructor(schema: GraphQLSchema | string, config: GraphbackGlobalConfig) {
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
        const schema = this.metadata.getSchema();

        // This will be used to store intermediate schemas
        const schemaComposer = new SchemaComposer(schema);

        //We need to apply all required changes to the schema we need 
        //This is to ensure that every plugin can add changes to the schema
        for (const plugin of this.plugins) {
            const newSchema = plugin.transformSchema(this.metadata);
            schemaComposer.merge(newSchema);
        }

        // Set final schema
        this.metadata.setSchema(schemaComposer.buildSchema());
        return this.metadata;
    }
}
