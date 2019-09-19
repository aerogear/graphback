/**
 * Configuration options for OpenAPI generator
 */
export interface OpenApiConfig {
    /**
     * Transform OpenAPI to GraphQL Schema 
     * 
     * @default false
     */
    includeComments: boolean,

    /**
     * Migration migrates GraphQL schema only once.
     * Use this flag to continusly migrate OpenAPI definition in model folder
     * 
     * @default false
     */
    reuseOpenAPIModel: boolean

    /**
     * Removes queries and mutations comming from OpenAPI spec
     * 
     * @default false
     */
    includeQueriesAndMutations: boolean
}