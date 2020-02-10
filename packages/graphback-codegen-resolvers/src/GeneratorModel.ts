
/**
 * Defines generator output
 */
export interface OutputFileSystem {
    resolvers: FileDefinition
    services: FileDefinition[]
    index: FileDefinition
}

/**
 * Contains definition of the single file
 */
export interface FileDefinition {
    fileName: string
    output: string
}