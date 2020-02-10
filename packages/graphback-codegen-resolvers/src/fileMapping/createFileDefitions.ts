import { GeneratorResolversFormat } from '../generators/createResolvers';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { createBlankResolverTemplate, createResolverTemplate } from '../templates/resolverWrapper';
import { FileDefinition } from './GeneratorModel';


export interface OutputResolvers {
    generated: ResolverOutputDefinition[]
    custom: ResolverOutputDefinition[]
}

export interface ResolverOutputDefinition {
    name: string
    output: string
}

export const createGeneratedResolversFile = (resolvers: GeneratorResolversFormat, options: ResolverGeneratorPluginConfig): FileDefinition => {
    const generatedResolvers = createResolverTemplate(resolvers, options);

    return {
        fileName: `resolvers.${options.format}`,
        output: generatedResolvers
    };
}

export const createCustomResolversFile = (resolvers: GeneratorResolversFormat, options: ResolverGeneratorPluginConfig): FileDefinition[] => {
    const customResolverFiles: FileDefinition[] = [];

    for (const resolverType of Object.keys(resolvers)) {
        const resolverFields = resolvers[resolverType];
        for (const fieldName of Object.keys(resolverFields)) {
            const resolverContent = resolverFields[fieldName];
            const resolverOutput = createBlankResolverTemplate(resolverType, fieldName, resolverContent, options);

            const outputResolver = {
                fileName: `${lowerCaseFirstChar(fieldName)}${resolverType}.${options.format}`,
                output: resolverOutput
            }

            customResolverFiles.push(outputResolver);
        }
    }

    return customResolverFiles;
}

function lowerCaseFirstChar(text: string) {
    return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}