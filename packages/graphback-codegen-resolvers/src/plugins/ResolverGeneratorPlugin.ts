import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, getFieldName, GraphbackOperationType } from '@graphback/core';
import { GraphQLSchema } from 'graphql';
import { join } from 'path';

export interface ResolverGeneratorPluginOptions {
    resolverPath: string
    // Provides extension for graphql-code-generator types
    // generated for resolvers
    types?: {
        /**
         * Name of the resolver import
         * For example `Resolvers`
         */
        resolverRootType: string

        /**
         * Relative location for root resolver typings.
         * For example: '../../types'
         */
        resolverRootLocation: string
    }
}

export class ResolverGeneratorPlugin extends GraphbackPlugin {
    private options: ResolverGeneratorPluginOptions;
    constructor(options: ResolverGeneratorPluginOptions) {
        super();

        // TODO: default options
        this.options = options;
    }

    public getPluginName() {
        return 'RESOLVER_GENERATOR';
    }

    public transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema {
        const resolvers = this.generate(metadata.getModelDefinitions());

        this.write(resolvers);

        return metadata.getSchema();
        // metadata.getGraphQLTypesWithModel
    }

    private write(resolvers: { generated: any; custom: any; }) {
        const resolversDir = join(process.cwd(), this.options.resolverPath);

        const generated = resolvers.generated;

        for (const typeName of Object.keys(resolvers.generated)) {
            const typeResolver = resolvers.generated[typeName];
            const resolverTemplate = generateResolverTemplate(typeResolver);
            console.log(resolverTemplate);
        }
    }

    private generate(modelDefinitions: ModelDefinition[]) {
        const resolvers = {
            generated: {},
            custom: {}
        };

        for (const { graphqlType, crudOptions } of modelDefinitions) {
            if (crudOptions.disableGen) {
                continue;
            }

            const generatedResolvers = {
                Query: {},
                Mutation: {},
                Subscription: {}
            };


            const objectName = graphqlType.name.toLowerCase();
            if (crudOptions.create) {
                const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.CREATE);
                // tslint:disable-next-line: no-any
                generatedResolvers.Mutation[fieldName] = createTemplate(objectName, crudOptions.subCreate)
            }
            if (crudOptions.update) {
                const fieldName = getFieldName(graphqlType.name, GraphbackOperationType.UPDATE);
                generatedResolvers.Mutation[fieldName] = updateTemplate(objectName, crudOptions.subUpdate);
            }
            // if (crudOptions.update) {
            //     const updateField = getFieldName(graphqlType.name, GraphbackOperationType.UPDATE);
            //     // tslint:disable-next-line: no-any
            //     generatedResolvers.Mutation[updateField] = `(_, args, context) => {
            //         validateRuntimeContext(context);
            //         return context.crudService.update("${objectName}", args.id, args.input, {
            //             publishEvent: ${crudOptions.subUpdate}
            //         })
            //     }`
            // }
            // if (resolverElement.config.delete) {
            //     const deleteField = getFieldName(graphqlType.name, GraphbackOperationType.DELETE);
            //     // tslint:disable-next-line: no-any
            //     resolvers.Mutation[deleteField] = (parent: any, args: any, context: any) => {
            //         rgeneratedResolvers;
            // }

            // if (resolverElement.config.findAll) {
            //     const findAllField = getFieldName(graphqlType.name, GraphbackOperationType.FIND_ALL, 's');
            //     // tslint:disable-next-line: no-any
            //     resolvers.Query[findAllField] = (parent: any, args: any, context: any) => {
            //         return this.service.findAll(objectName, context)
            //     }
            // }
            // if (resolverElement.config.find) {
            //     const findField = getFieldName(graphqlType.name, GraphbackOperationType.FIND, 's');
            //     // tslint:disable-next-line: no-any
            //     resolvers.Query[findField] = (parent: any, args: any, context: any) => {
            //         return this.service.findBy(objectName, args.fields, context)
            //     }
            // }

            // this.createRelations(resolverElement, resolvers)

            // this.createSubscriptions(resolverElement, resolvers, objectName)

            resolvers.generated[graphqlType.name] = generatedResolvers;
        }

        // Delete Mutations key if not needed.
        // if (Object.keys(resolvers.Mutation).length === 0) {
        //     delete resolvers.Mutation;
        // }

        // // Delete Subscriptions key if not needed.
        // if (Object.keys(resolvers.Subscription).length === 0) {
        //     delete resolvers.Subscription;
        // }
        // TODO relationships

        return resolvers;
    }

    // tslint:disable-next-line: no-any
    // private createSubscriptions(resolverElement: InputModelTypeContext, resolvers: any, objectName: string) {
    //     if (resolverElement.config.create && resolverElement.config.subCreate) {
    //         resolvers.Subscription[`new${graphqlType.name}`] = {
    //             // tslint:disable-next-line: no-any
    //             subscribe: (_: any, __: any, context: any) => {
    //                 return this.service.subscribeToCreate(objectName, context);
    //             }
    //         }
    //     }

    //     if (resolverElement.config.update && resolverElement.config.subUpdate) {
    //         resolvers.Subscription[`updated${graphqlType.name}`] = {
    //             // tslint:disable-next-line: no-any
    //             subscribe: (_: any, __: any, context: any) => {
    //                 return this.service.subscribeToUpdate(objectName, context);
    //             }
    //         }
    //     }

    //     if (resolverElement.config.delete && resolverElement.config.subDelete) {
    //         resolvers.Subscription[`deleted${graphqlType.name}`] = {
    //             // tslint:disable-next-line: no-any
    //             subscribe: (_: any, __: any, context: any) => {
    //                 return this.service.subscribeToDelete(objectName, context);
    //             }
    //         }
    //     }
    // }
}

const assignResolverKeys = (resolvers: any) => {
    const resolverNames = Object.keys(resolvers);

    return resolverNames.map((resolverName: string, i: number) => {
        const resolverFn = resolvers[resolverName];

        return `${resolverName}: ${resolverFn}`;
    });

}

const generateResolverTemplate = (typeResolvers: { Query: any, Mutation: any, Subscription: any }) => {
    const mutations = assignResolverKeys(typeResolvers.Mutation)

    return `import { validateRuntimeContext } from "@graphback/runtime";

export default {
    Query: {
    },
    Mutation: {
        ${mutations.join(',\n\t')}
    }
};
`;
}

const defaultResolverArgs = `_, args, context`;

const createTemplate = (tableName: string, subscription: boolean): string => {
    return `fieldName: (${defaultResolverArgs}) => {
            validateRuntimeContext(context);
            return context.crudService.create("${tableName}", args.input, {
                publishEvent: ${subscription}
            }, context);
        }`;
}

const updateTemplate = (tableName: string, subscription: boolean): string => {
    return `fieldName: (${defaultResolverArgs}) => {
            validateRuntimeContext(context);
            return context.crudService.update("${tableName}", args.id, args.input, {
                publishEvent: ${subscription}
            }, context);
        }`
}