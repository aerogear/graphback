export interface OutputResolvers {
    generated: FileDefinition[]
    custom: FileDefinition[]
}

export interface FileDefinition {
    fileName: string
    output: string
}