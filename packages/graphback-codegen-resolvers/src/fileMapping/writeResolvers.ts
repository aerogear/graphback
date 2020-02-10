import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { FileDefinition, OutputFileSystem } from './GeneratorModel';

export function writeResolvers(outputResolvers: OutputFileSystem, config: ResolverGeneratorPluginConfig) {
    const customResolversPath: string = join(config.outputPath, '/', config.customResolversFolderName)
    const generatedResolversPath: string = join(config.outputPath, '/', config.generatedServicesFolderName)

    createFolders(customResolversPath, generatedResolversPath);

    writeFileSync(`${generatedResolversPath}/${outputResolvers.generated.fileName}`, outputResolvers.generated.output);

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