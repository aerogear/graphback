import { ResolverGeneratorPluginOptions } from './ResolverGeneratorPlugin';

const generateRuntimeImport = (): string => {
    return `import { validateRuntimeContext } from "@graphback/runtime";`
};

const mapResolverKeys = (resolvers: any) => {
    const resolverNames = Object.keys(resolvers);

    return resolverNames.map((resolverName: string) => {
        const resolverFn = resolvers[resolverName];

        return `${resolverName}: ${resolverFn}`;
    });
}

export const generateResolverTemplate = (typeResolvers: { Query: any, Mutation: any, Subscription: any }, options: ResolverGeneratorPluginOptions) => {
    const mutations = mapResolverKeys(typeResolvers.Mutation)
    const queries = mapResolverKeys(typeResolvers.Query);
    const subscriptions = mapResolverKeys(typeResolvers.Subscription);

    const outputResolvers = [];

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

    let resolverType = '';
    let typedImports = '';
    if (options.types) {
        resolverType = ` as ${options.types.resolverRootType}`;
        typedImports = `import { ${options.types.resolverRootType} } from "${options.types.resolverRootLocation}\n"`;
    }

    return `${generateRuntimeImport()}\n${typedImports}\nexport default {
        ${outputResolvers.join(`,\n\n  `)}
}${resolverType};`;
}