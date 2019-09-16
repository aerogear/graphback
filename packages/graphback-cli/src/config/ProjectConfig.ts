import { GraphQLGeneratorConfig } from 'graphback';
import { FileConfig } from './FileConfig';

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
    db: {
        // tslint:disable-next-line: no-any
        dbConfig: any,
        database: string
    },

    /**
     * GraphQL generator engine configuration
     */
    graphqlCRUD: GraphQLGeneratorConfig,

    /**
     * Configuration for input/output folders
     */
    folders: FileConfig

    /**
     * Empty object config that can be created to generate client
     * Reserved for future usage
     */
    client: object
}