import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { OutputResolvers, ResolverOutputDefinition } from '../output/outputResolvers';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';



export function writeResolvers(outputResolvers: OutputResolvers, options: ResolverGeneratorPluginConfig) {
    // TODO (this should be configurable
    const customResolversPath: string = join(options.outputPath, "/custom")
    const generatedResolversPath: string = join(options.outputPath, "/generated")

    createFolders(customResolversPath, generatedResolversPath);

    outputResolvers.generated.resolvers.forEach((resolverDefinition: ResolverOutputDefinition) => {
        writeFileSync(`${generatedResolversPath}/${resolverDefinition.name}.${options.format}`, resolverDefinition.output);
    });
    writeFileSync(`${generatedResolversPath}/index.${options.format}`, outputResolvers.generated.index);

    outputResolvers.custom.resolvers.forEach((resolverDefinition: ResolverOutputDefinition) => {
        const fileName = `${customResolversPath}/${resolverDefinition.name}.${options.format}`;
        if (!existsSync(fileName)) {
            writeFileSync(fileName, resolverDefinition.output);
        }
    });
    writeFileSync(`${customResolversPath}/index.${options.format}`, outputResolvers.custom.index);
    writeFileSync(`${options.outputPath}/index.${options.format}`, outputResolvers.index);
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