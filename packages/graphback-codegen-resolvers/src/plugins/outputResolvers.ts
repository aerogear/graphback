import { lowerCaseFirstChar } from '../util/lowerCaseFirstChar';
import { generateBlankResolverTemplate, generateResolverTemplate } from './apolloTSResolverFormatter';
import { ResolverGeneratorPluginOptions } from './ResolverGeneratorPlugin';

export interface OutputResolvers {
    generated: OutputResolverGroup
    custom: OutputResolverGroup
    index: string
}
export interface OutputResolverGroup {
    resolvers?: ResolverOutputDefinition[]
    index?: string
}

export interface ResolverOutputDefinition {
    name: string
    output: string
}

const createResolversIndex = (resolverNames: string[], exportName: string = 'resolvers'): string => {
    const imports = resolverNames.map((name: string) => {
        return `import * as ${name}Resolvers from './${name}'`;
    }).join('\n');

    const importNames = resolverNames.map((name: string) => `${name}Resolvers`);

    return `${imports}

    export const ${exportName} = [${importNames.join(', ')}];`;
}

const createCustomResolversIndex = (resolverNames: string[], exportName: string = 'resolvers'): string => {
    const imports = resolverNames.map((name: string) => {
        return `import ${name} from './${name}'`;
    }).join('\n');

    const importNames = resolverNames.map((name: string) => name);

    return `${imports}

    export const ${exportName} = [${importNames.join(', ')}];`;
}

export const createOutputResolvers = (resolverTypes: any, options: ResolverGeneratorPluginOptions): OutputResolverGroup => {
    const resolverGroup: OutputResolverGroup = { resolvers: [] };

    for (const resolverType of Object.keys(resolverTypes)) {
        const typeResolvers = resolverTypes[resolverType];
        const output = generateResolverTemplate(typeResolvers, options);

        const outputResolver = {
            name: lowerCaseFirstChar(resolverType),
            output
        }

        resolverGroup.resolvers.push(outputResolver);
    }

    resolverGroup.index = createResolversIndex(resolverGroup.resolvers.map((r: ResolverOutputDefinition) => r.name), 'generatedResolvers');

    return resolverGroup;
}

const groupResolversByResolverType = (resolversByType: any): { Query: any; Mutation: any; Subscription: any } => {
    const resolvers = {
        Query: {},
        Mutation: {},
        Subscription: {}
    }

    Object.values(resolversByType).forEach((baseType: any) => {
        Object.keys(baseType).forEach((resolverKind: any) => {
            const fields = baseType[resolverKind];
            resolvers[resolverKind] = { ...resolvers[resolverKind], ...fields };
        })
    });

    return resolvers;
}

export const createCustomOutputResolvers = (resolverTypes: any): OutputResolverGroup => {
    const resolverGroup: OutputResolverGroup = { resolvers: [] };

    const resolvers = groupResolversByResolverType(resolverTypes);

    for (const resolverType of Object.keys(resolvers)) {
        const resolverFields = resolvers[resolverType];

        for (const fieldName of Object.keys(resolverFields)) {
            const resolverValue = resolverFields[fieldName];
            const resolverOutput = generateBlankResolverTemplate(resolverType, fieldName, resolverValue);

            const outputResolver = {
                name: fieldName,
                output: resolverOutput
            }

            resolverGroup.resolvers.push(outputResolver);
        }
    }

    resolverGroup.index = createCustomResolversIndex(resolverGroup.resolvers.map((r: ResolverOutputDefinition) => r.name), 'customResolvers');

    return resolverGroup;
}