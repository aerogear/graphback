
/**
 * Defines generator output
 */
export interface OutputFileSystem {
    generated: FileDefinition
    custom: FileDefinition[]
    services: FileDefinition[]
    index: FileDefinition
}

export interface FileDefinition {
    fileName: string
    output: string
}