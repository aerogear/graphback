import { createBlankResolverTemplate, createCustomResolversIndex, createResolversIndex, createResolverTemplate } from '../formatters/apollo';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { lowerCaseFirstChar } from '../util/lowerCaseFirstChar';

export interface OutputResolvers {
    generated: OutputResolverGroup
    custom: OutputResolverGroup
    index?: string
}

export interface OutputResolverGroup {
    resolvers?: ResolverOutputDefinition[]
    index?: string
}

export interface ResolverOutputDefinition {
    name: string
    output: string
}

export const createOutputResolvers = (baseTypeResolvers: any, options: ResolverGeneratorPluginConfig): OutputResolverGroup => {
    const resolverGroup: OutputResolverGroup = { resolvers: [] };

    for (const baseTypeName of Object.keys(baseTypeResolvers)) {
        const typeResolvers = baseTypeResolvers[baseTypeName];
        const output = createResolverTemplate(baseTypeName, typeResolvers, options);

        const outputResolver = {
            name: lowerCaseFirstChar(baseTypeName),
            output
        }

        resolverGroup.resolvers.push(outputResolver);
    }

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

// TODO: Enable custom resolvers using default CRUD names
export const createCustomOutputResolvers = (resolverTypes: any, options: ResolverGeneratorPluginConfig): OutputResolverGroup => {
    const resolverGroup: OutputResolverGroup = { resolvers: [] };

    const resolvers = groupResolversByResolverType(resolverTypes);

    for (const resolverType of Object.keys(resolvers)) {
        const resolverFields = resolvers[resolverType];

        for (const fieldName of Object.keys(resolverFields)) {
            const resolverValue = resolverFields[fieldName];
            const resolverOutput = createBlankResolverTemplate(resolverType, fieldName, resolverValue, options);

            const outputResolver = {
                name: fieldName,
                output: resolverOutput
            }

            resolverGroup.resolvers.push(outputResolver);
        }
    }

    return resolverGroup;
}