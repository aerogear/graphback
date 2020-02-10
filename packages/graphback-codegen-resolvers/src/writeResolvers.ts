import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { OutputFileSystem } from './GeneratorModel';
import { ResolverGeneratorPluginConfig } from './ResolverGeneratorPlugin';

export function writeResolvers(outputResolvers: OutputFileSystem, config: ResolverGeneratorPluginConfig) {
    const generatedServicesFolderName: string = join(config.outputPath, '/', config.generatedServicesFolderName)

    createFolders(generatedServicesFolderName);
    writeFileSync(`${config.outputPath}/${outputResolvers.resolvers.fileName}`, outputResolvers.resolvers.output);
}

function createFolders(path: string) {
    try {
        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
        }
    } catch (err) {
        throw new Error(`Error when creating resolvers folders: ${err}`)
    }
}