import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import * as prettier from 'prettier';
import { generateBlankResolverTemplate, generateResolverTemplate, resolversIndexTemplate, resolversRootIndexTemplate } from './ApolloTypeScriptResolverFormatter';
import { ResolverGeneratorPluginOptions } from './ResolverGeneratorPlugin';

// TODO: Move code formatting to core
function formatFile(contents: string) {
    return prettier.format(contents, { semi: false, parser: 'typescript' });
}

export function writeTypeScriptResolvers(resolvers: { generated: any; custom: any; }, options: ResolverGeneratorPluginOptions) {
    const resolversPath = resolve(options.resolverPath);

    if (!existsSync(resolversPath)) {
        mkdirSync(resolversPath, { recursive: true });
    }

    writeGeneratedResolvers(resolvers.generated, options);
    writeCustomResolvers(resolvers.custom, options);
    writeResolversIndex(resolversPath, Object.keys(resolvers));
}

function writeResolversIndex(resolversPath: string, modules: string[]) {
    const template = resolversRootIndexTemplate(modules);
    writeFileSync(join(resolversPath, 'index.ts'), formatFile(template));
}

function writeGeneratedResolvers(resolvers: any, options: ResolverGeneratorPluginOptions) {
    const generatedResolversPath = resolve(options.resolverPath, 'generated');

    if (!existsSync(generatedResolversPath)) {
        mkdirSync(generatedResolversPath, { recursive: true });
    }

    const importNames = [];
    const generatedKeys = Object.keys(resolvers);
    for (const typeName of generatedKeys) {
        const resolversOutput = resolvers[typeName];
        const resolverTemplate = generateResolverTemplate(resolversOutput, options);

        const fileName = typeName.toLowerCase();

        importNames.push(fileName);

        writeFileSync(join(generatedResolversPath, `${fileName}.ts`), formatFile(resolverTemplate));
    }

    const indexOutput = resolversIndexTemplate(importNames.map((name: string) => ({ importAs: `${name}Resolvers`, importFrom: name })), `generatedResolvers`);

    writeFileSync(resolve(options.resolverPath, 'generated', 'index.ts'), formatFile(indexOutput));
}

function writeCustomResolvers(resolvers: any, options: ResolverGeneratorPluginOptions) {
    const customResolversPath = resolve(options.resolverPath, 'custom');

    if (!existsSync(customResolversPath)) {
        mkdirSync(customResolversPath, { recursive: true });
    }

    const importNames = [];
    const resolverBase = Object.values(resolvers);
    // TODO: Refactor to remove need for 3-level nested for loop
    for (const graphqlBaseType of resolverBase) {
        for (const resolverType of Object.keys(graphqlBaseType)) {
            const typeResolvers = graphqlBaseType[resolverType];

            for (const resolverField of Object.keys(typeResolvers)) {
                const resolverTemplate = generateBlankResolverTemplate(resolverType, resolverField, typeResolvers[resolverField]);

                const customResolverPath = join(customResolversPath, `${resolverField}.ts`);

                if (!existsSync(customResolverPath)) {
                    writeFileSync(customResolverPath, formatFile(resolverTemplate));
                }

                importNames.push(resolverField);
            }
        }
    }

    const indexOutput = resolversIndexTemplate(importNames.map((name: string) => ({ importAs: name, importFrom: name })), `customResolvers`);

    writeFileSync(resolve(options.resolverPath, 'custom', 'index.ts'), indexOutput);
}