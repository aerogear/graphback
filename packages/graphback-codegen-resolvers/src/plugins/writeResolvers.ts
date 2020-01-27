import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import * as prettier from 'prettier';
import { generateBlankResolverTemplate, generateResolverTemplate, resolversIndexTemplate, resolversRootIndexTemplate } from './ApolloTypeScriptResolverFormatter';
import { ResolverGeneratorPluginOptions } from './ResolverGeneratorPlugin';

export function writeTypeScriptResolvers(resolvers: { generated: any; custom: any; }, options: ResolverGeneratorPluginOptions) {
    const resolversDir = resolve(options.resolverPath);

    if (!existsSync(resolversDir)) {
        mkdirSync(resolversDir);
    }

    writeGeneratedResolvers(resolvers.generated, options);
    writeCustomResolvers(resolvers.custom, options);
}

function writeGeneratedResolvers(resolvers: any, options: ResolverGeneratorPluginOptions) {
    const generatedDir = resolve(options.resolverPath, 'generated');

    if (!existsSync(generatedDir)) {
        mkdirSync(generatedDir);
    }

    const importNames = [];
    const generatedKeys = Object.keys(resolvers);
    for (const typeName of generatedKeys) {
        const resolversOutput = resolvers[typeName];
        const resolverTemplate = generateResolverTemplate(resolversOutput, options);
        // TODO: smarter formatting based on environment
        const formattedTemplate = prettier.format(resolverTemplate, { semi: false, parser: "babel" });

        const fileName = typeName.toLowerCase();

        importNames.push(fileName);

        writeFileSync(join(generatedDir, `${fileName}.ts`), formattedTemplate);
    }

    const indexOutput = resolversIndexTemplate(importNames.map((name: string) => ({ importAs: `${name}Resolvers`, importFrom: name })), `resolvers`);

    const formattedIndex = prettier.format(indexOutput, { semi: false, parser: "babel" });
    writeFileSync(resolve(options.resolverPath, 'generated', 'index.ts'), formattedIndex);
}

function writeCustomResolvers(resolvers: any, options: ResolverGeneratorPluginOptions) {
    const customDir = resolve(options.resolverPath, 'custom');

    if (!existsSync(customDir)) {
        mkdirSync(customDir);
    }

    const importNames = [];
    const resolverBase = Object.values(resolvers);
    for (const graphqlBaseType of resolverBase) {
        for (const resolverType of Object.keys(graphqlBaseType)) {
            const typeResolvers = graphqlBaseType[resolverType];

            for (const resolverField of Object.keys(typeResolvers)) {
                const resolverTemplate = generateBlankResolverTemplate(resolverType, resolverField, typeResolvers[resolverField]);
                const formattedTemplate = prettier.format(resolverTemplate, { semi: false, parser: "babel" });

                writeFileSync(join(customDir, `${resolverField}.ts`), formattedTemplate);

                importNames.push(resolverField);
            }
        }
    }

    const indexOutput = resolversIndexTemplate(importNames.map((name: string) => ({ importAs: name, importFrom: name })), `customResolvers`);

    const formattedIndex = prettier.format(indexOutput, { semi: false, parser: "babel" });
    writeFileSync(resolve(options.resolverPath, 'custom', 'index.ts'), formattedIndex);
}