import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { OutputFileSystem } from './GeneratorModel';
import { ResolverGeneratorPluginConfig } from './ResolverGeneratorPlugin';

export function writeResolvers(outputFiles: OutputFileSystem, config: ResolverGeneratorPluginConfig) {
    createFolders(config.outputPath);
    writeFileSync(`${config.outputPath}/${outputFiles.resolvers.fileName}`, outputFiles.resolvers.output);
    writeFileSync(`${config.outputPath}/${outputFiles.index.fileName}`, outputFiles.index.output);
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