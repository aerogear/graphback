import { ResolverGeneratorPluginOptions } from './ResolverGeneratorPlugin';
import { join } from 'path';

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

const alphabeticSort = (a: string, b: string) => {
    if (a < b) {
        return -1
    }
    if (a > b) {
        return 1
    }

    return 0
}

const getDefaultResolverImports = (path: string, names: string[]) => {
    return names.sort(alphabeticSort).map((name: string) => {
        return `import ${name}Resolvers from '${path}/${name}'`;
    }).join('\n');
}

const getResolverImports = (path: string, names: string[]) => {
    return names.sort(alphabeticSort).map((name: string) => {
        return `import { ${name}Resolvers } from '${path}/${name}'`;
    }).join('\n');
}

export const resolversIndexTemplate = (modules: string[], exportName?: string) => {
    const fileImports = getDefaultResolverImports('.', modules);

    return `${fileImports}
    
export const ${exportName || 'resolvers'} = [${modules.map((name: string) => `${name}Resolvers`).join(', ')}]`;
}

export const resolversRootIndexTemplate = (resolverGroups: string[]) => {
    const sortedImportNames = resolverGroups.map((name: string) => name).sort(alphabeticSort);
    
    return `${sortedImportNames.map((name: string) => getResolverImports('.', [name])).join('\n')}
    
export const resolvers = [${resolverGroups.map((name: string) => `...${name}Resolvers`)}];`;
}