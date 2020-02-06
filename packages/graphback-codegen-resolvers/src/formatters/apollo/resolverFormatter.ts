import * as prettier from 'prettier';
import { ResolverGeneratorPluginConfig } from '../../ResolverGeneratorPlugin';
import { blankResolverJS, createCustomResolversIndexJS, createResolversIndexJS as createResolversIndexJS, resolverFileTemplateJS as resolverJSFileTemplate, rootResolversIndexJS } from './jsResolverFormatter';
import { blankResolverTS, createResolversIndexTS, resolverFileTemplateTS as resolverTSFileTemplate, rootResolversIndexTS } from './tsResolverFormatter';

const mapResolverKeyValueTemplates = (resolvers: any) => {
    const resolverNames = Object.keys(resolvers);

    return resolverNames.map((resolverName: string) => {
        const resolverFn = resolvers[resolverName];

        return `${resolverName}: ${resolverFn}`;
    });
}

export const createBlankResolverTemplate = (resolverType: string, name: string, output: string, options: ResolverGeneratorPluginConfig) => {
    switch (options.format) {
        case 'js':
            return blankResolverJS(resolverType, name, output);
        case 'ts':
            return blankResolverTS(resolverType, name, output, options);
        default:
            throw new Error(`"${options.format}" resolvers are not supported`);
    }
}



export const createResolverTemplate = (name: string, typeResolvers: { Query: any, Mutation: any, Subscription: any }, options: ResolverGeneratorPluginConfig) => {
    const mutations = mapResolverKeyValueTemplates(typeResolvers.Mutation)
    const queries = mapResolverKeyValueTemplates(typeResolvers.Query);
    const subscriptions = mapResolverKeyValueTemplates(typeResolvers.Subscription);

    const outputResolvers: string[] = [];

    // TODO: Relationships
    // if (relations.length) {}

    if (queries.length) {
        outputResolvers.push(`Query: {
            ${queries.join(',\n')}
        }`)
    }
    if (mutations.length) {
        outputResolvers.push(`Mutation: {
            ${mutations.join(',\n')}
        }`)
    }
    if (subscriptions.length) {
        outputResolvers.push(`Subscription: {
            ${subscriptions.join(',\n')}
        }`)
    }

    return createResolverFileTemplate(name, outputResolvers, options);
}

function createResolverFileTemplate(name: string, outputResolvers: string[], options: ResolverGeneratorPluginConfig) {
    switch (options.format) {
        case 'js':
            return formatDocumentJS(resolverJSFileTemplate(name, outputResolvers));
        case 'ts':
            return formatDocumentTs(resolverTSFileTemplate(outputResolvers, options));
        default:
            throw new Error(`"${options.format}" resolvers are not supported`);
    }
}

export const createResolversIndex = (resolverNames: string[], exportName: string = 'resolvers', format: string): string => {
    switch (format) {
        case 'js':
            return formatDocumentJS(createResolversIndexJS(resolverNames, exportName));
        case 'ts':
            return formatDocumentTs(createResolversIndexTS(resolverNames, exportName));
        default:
            throw new Error(`"${format}" resolver format not supported.`)
    }
}

export const createCustomResolversIndex = (resolverNames: string[], exportName: string = 'resolvers', format: string): string => {
    switch (format) {
        case 'js':
            return formatDocumentJS(createCustomResolversIndexJS(resolverNames, exportName));
        case 'ts':
            return formatDocumentTs(createResolversIndexTS(resolverNames, exportName));
        default:
            throw new Error(`"${format}" resolver format not supported.`)
    }
}

export const createRootResolversIndex = (format: string, groups: string[] = ['generated', 'custom']) => {
    switch (format) {
        case 'js':
            return formatDocumentJS(rootResolversIndexJS(groups));
        case 'ts':
            return formatDocumentTs(rootResolversIndexTS(groups));
        default:
            throw new Error(`"${format}" resolver format not supported.`)
    }
}

function formatDocumentJS(contents: string) {
    try {
        return prettier.format(contents, { semi: false, parser: 'babel' });
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("Cannot format resolvers implementation", e)

        return contents;
    }
}

function formatDocumentTs(contents: string) {
    try {
        return prettier.format(contents, { semi: false, parser: 'typescript' });
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("Cannot format resolvers implementation", e)

        return contents;
    }
}