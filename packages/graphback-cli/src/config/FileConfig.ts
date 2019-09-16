
/**
 * Configuration for input and output files 
 */
export interface FileConfig {
    /**
     * Input model used for processing files
     */
    model: string,

    /**
     * Location for generated resolvers.
     * 
     * NOTE: all contents in this folder will be removed and regenerated every time generation process is triggered
     */
    generatedResolvers: string,

    /**
     * Location for custom resolvers 
     */
    customResolvers: string,

    /**
     * Location for schema file
     */
    schema: string,

    /**
     * Location for client side queries and mutations
     */
    client: string
}