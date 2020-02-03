import { GraphQLSchema } from "graphql";
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';

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
     * Initialize plugin by passing metadata object.
     * Initialization can setup required data and related visitors that can be shared between:
     * 
     * - transformSchema()
     * - saveResources()
     * 
     * @param metadata - metadata object containing schema
     */
    public abstract init(metadata: GraphbackCoreMetadata): void;

    /**
     * Performs transformation on the schema and returns target schema
     * Implementations should extend this method if they wish to apply some changes
     * to schema. Otherwise unchanged schema should be returned
     * 
     * @param metadata - metadata object containing schema
     */
    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        return metadata.getSchema();
    }

    /**
     * Create resources like files etc. for this plugin.
     * This method should write resouces to filesystem
     */
    public abstract generateResources(): void

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


};
