import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { parseMarker } from 'graphql-metadata';
import { getUserTypesFromSchema } from './getUserTypesFromSchema';

/**
 * Graphback plugin interface
 * Plugins are base for every graphback generator and schema transformers. 
 * See documentation for the complete list of the plugins.
 * 
 * Plugins can:
 * 
 * - Modify the schema
 * - Create resources like files, db tables etc.
 * - Perform some in memory operations based on configuration
 */
export abstract class GraphbackPlugin {

    /**
     * Performs transformation on the schema and returns target schemaƒ
     * @param schema 
     */
    public abstract transformSchema(schema: GraphQLSchema): GraphQLSchema;

    /**
     * @returns Unique name of the plugin
     */
    public abstract getPluginName(): string;

    protected logWarning(message: string): void {
        // tslint:disable-next-line: no-console
        console.log(`Warning - ${this.getPluginName()}: ${message}`)
    }

    protected logError(message: string): void {
        // tslint:disable-next-line: no-console
        console.error(`Error - ${this.getPluginName()}: ${message}`)
    }

    /**
     * Helper for plugins to fetch all types that should be processed by Graphback plugins.
     * To mark type as enabled for graphback generators we need to add `model` annotations over the type. 
     * 
     * Returns all user types that have @model in description
     * @param schema 
     */
    protected getUserModels(schema: GraphQLSchema): GraphQLObjectType[] {
        const types = getUserTypesFromSchema(schema)

        return types.filter((modelType: GraphQLObjectType) => parseMarker('model', modelType.description))
    }
};
