import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as prettier from 'prettier';
import { OutputResolvers, ResolverOutputDefinition } from '../output/outputResolvers';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';

// TODO: Move code formatting 
// TODO BROKEN for JS. THis should be part of the resolver formatter.
function formatDocument(contents: string) {
    try {
        return prettier.format(contents, { semi: false, parser: 'typescript' });
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("Cannot format resolvers implementation", e)

        return contents;
    }
}

export function writeResolvers(outputResolvers: OutputResolvers, options: ResolverGeneratorPluginConfig) {
    // TODO (this should be configurable
    const customResolversPath: string = join(options.outputPath, "/custom")
    const generatedResolversPath: string = join(options.outputPath, "/generated")

    createFolders(customResolversPath, generatedResolversPath);

    outputResolvers.generated.resolvers.forEach((resolverDefinition: ResolverOutputDefinition) => {
        writeFileSync(`${generatedResolversPath}/${resolverDefinition.name}.${options.format}`, formatDocument(resolverDefinition.output));
    });

    outputResolvers.custom.resolvers.forEach((resolverDefinition: ResolverOutputDefinition) => {
        const fileName = `${customResolversPath}/${resolverDefinition.name}.${options.format}`;
        if (!existsSync(fileName)) {
            writeFileSync(fileName, formatDocument(resolverDefinition.output));
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