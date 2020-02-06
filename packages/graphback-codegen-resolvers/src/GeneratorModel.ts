export interface OutputResolvers {
    entities: FileDefinition[]
    generated: FileDefinition[]
    custom: FileDefinition[]
}

export interface FileDefinition {
    fileName: string
    output: string
}