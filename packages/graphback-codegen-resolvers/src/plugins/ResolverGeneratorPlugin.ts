import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition } from '@graphback/core';
import { GraphQLSchema, printSchema, visit, parse, NamedTypeNode, buildASTSchema } from 'graphql';
import { ResolverGeneratorOptions } from '../api/ResolverGeneratorOptions';

const defaultOptions: ResolverGeneratorOptions = {
    format: 'ts'
}

export class ResolverGeneratorPlugin extends GraphbackPlugin {
    private config: ResolverGeneratorOptions;
    constructor(config?: ResolverGeneratorOptions) {
        super();
        this.config = { ...defaultOptions, ...config };
    }

    public getPluginName() {
        return 'RESOLVER_GENERATOR';
    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const resolvers = getResolvers(metadata.getSchema());
        return metadata.getSchema();
    }
}

export const getResolvers = (schema: GraphQLSchema) => {
    // Parse it to get ast
    const schemaAST = parse(printSchema(schema));
    const result = visit(schemaAST, { leave: {
        NamedType: (node: NamedTypeNode) => {
            console.log(node);
        }
    }})

    return buildASTSchema(result);
}