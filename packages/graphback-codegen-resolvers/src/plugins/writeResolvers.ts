import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as prettier from 'prettier';
import { OutputResolvers, ResolverOutputDefinition } from './outputResolvers';
import { ResolverGeneratorPluginOptions } from './ResolverGeneratorPlugin';

// TODO: Move code formatting to core
function formatDocument(contents: string) {
    return prettier.format(contents, { semi: false, parser: 'babel' });
}

export function writeResolvers(outputResolvers: OutputResolvers, options: ResolverGeneratorPluginOptions) {
    const customResolversPath: string = join(options.resolverPath, "/custom")
    const generatedResolversPath: string = join(options.resolverPath, "/generated")

    createFolders(customResolversPath, generatedResolversPath);

    outputResolvers.generated.resolvers.forEach((resolverDefinition: ResolverOutputDefinition) => {
        writeFileSync(`${generatedResolversPath}/${resolverDefinition.name}.${options.format}`, formatDocument(resolverDefinition.output));
    });
    writeFileSync(`${generatedResolversPath}/index.${options.format}`, formatDocument(outputResolvers.generated.index));

    outputResolvers.custom.resolvers.forEach((resolverDefinition: ResolverOutputDefinition) => {
        const fileName = `${customResolversPath}/${resolverDefinition.name}.${options.format}`;
        if (!existsSync(fileName)) {
            writeFileSync(fileName, formatDocument(resolverDefinition.output));
        }
    });
    writeFileSync(`${customResolversPath}/index.${options.format}`, formatDocument(outputResolvers.custom.index));
    writeFileSync(`${options.resolverPath}/index.${options.format}`, formatDocument(outputResolvers.index));
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