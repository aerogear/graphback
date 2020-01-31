import { ResolverGeneratorPluginOptions } from '../../plugin/ResolverGeneratorPlugin';
import { createCustomResolversIndexJS, createResolversIndexJS as createResolversIndexJS, resolverFileTemplateJS as resolverJSFileTemplate, rootResolversIndexJS } from './jsResolverFormatter';
import { createResolversIndexTS, resolverFileTemplateTS as resolverTSFileTemplate, rootResolversIndexTS } from './tsResolverFormatter';

const mapResolverKeyValueTemplates = (resolvers: any) => {
    const resolverNames = Object.keys(resolvers);

    return resolverNames.map((resolverName: string) => {
        const resolverFn = resolvers[resolverName];

        return `${resolverName}: ${resolverFn}`;
    });
}

export const createBlankResolverTemplate = (resolverType: string, name: string, output: string) => {
    return `export default {
        ${resolverType}: {
            ${name}: ${output}
        }
    }`;
}

function createResolverFileTemplate(name: string, outputResolvers: string[], options: ResolverGeneratorPluginOptions) {
    switch (options.format) {
        case 'js':
            return resolverJSFileTemplate(name, outputResolvers);
        case 'ts':
            return resolverTSFileTemplate(outputResolvers, options);
        default:
            throw new Error(`"${options.format}" resolvers are not supported`);
    }
}

export const createResolverTemplate = (name: string, typeResolvers: { Query: any, Mutation: any, Subscription: any }, options: ResolverGeneratorPluginOptions) => {
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

export const createResolversIndex = (resolverNames: string[], exportName: string = 'resolvers', format: string): string => {
    switch (format) {
        case 'js':
            return createResolversIndexJS(resolverNames, exportName);
        case 'ts':
            return createResolversIndexTS(resolverNames, exportName);
        default:
            throw new Error(`"${format}" resolver format not supported.`)
    }
}

export const createCustomResolversIndex = (resolverNames: string[], exportName: string = 'resolvers', format: string): string => {
    switch (format) {
        case 'js':
            return createCustomResolversIndexJS(resolverNames, exportName);
        case 'ts':
            return createResolversIndexTS(resolverNames, exportName);
        default:
            throw new Error(`"${format}" resolver format not supported.`)
    }
}

export const createRootResolversIndex = (format: string, groups: string[] = ['generated', 'custom']) => {
    switch (format) {
        case 'js':
            return rootResolversIndexJS(groups);
        case 'ts':
            return rootResolversIndexTS(groups);
        default:
            throw new Error(`"${format}" resolver format not supported.`)
    }
}