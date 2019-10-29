import { GraphQLGeneratorConfig } from 'graphback';
import { FolderConfig } from './FolderConfig';
import { OpenApiConfig } from './OpenApiConfig'

/**
 * Configuration for project that specifies every aspect of generation process.
 * Sections:
 *
 * - DB - database generation
 * - graphqlCRUD - graphql CRUD generation
 * - folders - input/outputs of the generator
 */
 export interface ProjectConfig {
    /**
     * Database configuration
     */
    db?: {
        // tslint:disable-next-line: no-any
        dbConfig: any,
        database: string
        initialization?: string
    },

    /**
     * GraphQL generator engine configuration
     */
    graphqlCRUD?: GraphQLGeneratorConfig,

    /**
     * Configuration for input/output folders
     */
    folders?: FolderConfig

    /**
     * Empty object config that can be created to generate client
     * Reserved for future usage
     */
    client?: object

    /**
     * Configuration for OpenApi generator
     */
    openApi?: OpenApiConfig
}

