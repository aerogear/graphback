import { join } from 'path';
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

export const generateBlankResolverTemplate = (resolverType: string, name: string, output: string) => {
    return `export default {
        ${resolverType}: {
            ${name}: ${output}
        }
    }`;
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

const getDefaultResolverImports = (path: string, modules: { importAs: string; importFrom: string }[]) => {
    return modules.map((m: any) => {
        return `import ${m.importAs} from '${path}/${m.importFrom}'`;
    }).join('\n');
}

const getResolverImports = (path: string, modules: { importAs: string; importFrom: string }[]) => {
    return modules.map((m: any) => {
        return `import { ${m.importAs} } from '${path}/${m.importFrom}'`;
    }).join('\n');
}

export const resolversIndexTemplate = (modules: { importAs: string; importFrom: string }[], exportName?: string) => {
    const fileImports = getDefaultResolverImports('.', modules);

    return `${fileImports}
    
export const ${exportName || 'resolvers'} = [${modules.map((m: any) => `${m.importAs}`).join(', ')}]`;
}

export const resolversRootIndexTemplate = (resolverGroups: string[]) => {

    return `${resolverGroups.map((name: string) => getResolverImports('.', [{ importAs: name, importFrom: name }])).join('\n')}
    
export const resolvers = [${resolverGroups.map((name: string) => `...${name}`)}];`;
}