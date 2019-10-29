
/**
 * Configuration for input and output folders
 */
export interface FolderConfig {
    /**
     * Input model used for providing source for code generation
     */
    model: string,

    /**
     * Location for resolvers.
     *
     * NOTE: all contents in this folder will be removed and regenerated every time generation process is triggered
     */
    resolvers: string,

    /**
     * Location for schema file
     */
    schema: string,

    /**
     * Location for client side queries and mutations
     */
    client: string

    /**
     * Location to save migrations
     */
    migrations: string
}
