import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { OutputResolvers, FileDefinition } from './GeneratorModel';
import { ResolverGeneratorPluginConfig } from './ResolverGeneratorPlugin';



export function writeResolvers(outputResolvers: OutputResolvers, config: ResolverGeneratorPluginConfig) {
    const customResolversPath: string = join(config.outputPath, '/', config.customResolversFolderName)
    const generatedResolversPath: string = join(config.outputPath, '/', config.generatedResolversFolderName)
    const modelEntitiesPath: string = join(config.outputPath, '/', config.entitiesFolderName)

    createFolders(customResolversPath, generatedResolversPath, modelEntitiesPath);

    outputResolvers.generated.forEach((resolverDefinition: FileDefinition) => {
        writeFileSync(`${generatedResolversPath}/${resolverDefinition.fileName}`, resolverDefinition.output);
    });

    outputResolvers.entities.forEach((resolverDefinition: FileDefinition) => {
        writeFileSync(`${generatedResolversPath}/${resolverDefinition.fileName}`, resolverDefinition.output);
    });

    outputResolvers.custom.forEach((resolverDefinition: FileDefinition) => {
        const fileName = `${customResolversPath}/${resolverDefinition.fileName}`;
        if (!existsSync(fileName)) {
            writeFileSync(fileName, resolverDefinition.output);
        }
    });
}

function createFolders(generatedResolversPath: string, customResolversPath: string) {
    try {
        if (!existsSync(generatedResolversPath)) {
            mkdirSync(generatedResolversPath, { recursive: true });
        }
        if (!existsSync(customResolversPath)) {
            mkdirSync(customResolversPath, { recursive: true });
        }
    } catch (err) {
        throw new Error(`Error when creating resolvers folders: ${err}`)
    }
}