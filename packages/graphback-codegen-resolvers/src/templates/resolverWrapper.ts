import * as prettier from 'prettier';
import { GeneratorResolversFormat } from '../GeneratorResolversFormat';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { blankResolverJS, resolverFileTemplateJS, } from './jsResolverTemplate';
import { blankResolverTS, resolverFileTemplateTS, } from './tsResolverTemplate';

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
            return formatDocumentJS(blankResolverJS(resolverType, name, output));
        case 'ts':
            return formatDocumentTs(blankResolverTS(resolverType, name, output, options));
        default:
            throw new Error(`"${options.format}" resolvers are not supported`);
    }
}

export const createResolverTemplate = (typeResolvers: GeneratorResolversFormat, options: ResolverGeneratorPluginConfig) => {
    const mutations = mapResolverKeyValueTemplates(typeResolvers.Mutation)
    const queries = mapResolverKeyValueTemplates(typeResolvers.Query);
    const subscriptions = mapResolverKeyValueTemplates(typeResolvers.Subscription);

    const outputResolvers: string[] = [];

    if (options.layout === "apollo") {
        if (queries.length) {
            outputResolvers.push(`Query: {
            ${queries.join(',\n')}
        },`)
        }
        if (mutations.length) {
            outputResolvers.push(`Mutation: {
            ${mutations.join(',\n')}
        },`)
        }
        if (subscriptions.length) {
            outputResolvers.push(`Subscription: {
            ${subscriptions.join(',\n')}
        }`)
        }
    } else if (options.layout === "graphql") {
        outputResolvers.push(`${queries.join(',\n')}`)
        outputResolvers.push(`${mutations.join(',\n')}`)
        outputResolvers.push(`${subscriptions.join(',\n')}`)
    } else {
        throw new Error("Wrong layout specified in resolver generator plugin")
    }

    return createResolverFileTemplate(name, outputResolvers, options);
}

function createResolverFileTemplate(name: string, outputResolvers: string[], options: ResolverGeneratorPluginConfig) {
    switch (options.format) {
        case 'js':
            return formatDocumentJS(resolverFileTemplateJS(name, outputResolvers));
        case 'ts':
            return formatDocumentTs(resolverFileTemplateTS(outputResolvers, options));
        default:
            throw new Error(`"${options.format}" resolvers are not supported`);
    }
}

function formatDocumentJS(contents: string) {
    try {
        return prettier.format(contents, { semi: false, parser: 'babel' });
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.log("Cannot format resolvers document", e)

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