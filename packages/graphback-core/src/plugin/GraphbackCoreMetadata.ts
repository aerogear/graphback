import { GraphQLObjectType, GraphQLSchema, GraphQLField } from 'graphql'
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { parseDbAnnotations } from '../annotations/parser'
import { getBaseType } from '../utils/getBaseType'
import { getModelTypesFromSchema } from './getModelTypesFromSchema'
import { GraphbackCRUDGeneratorConfig } from './GraphbackCRUDGeneratorConfig'
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig'
import { ModelDefinition } from './ModelDefinition';
import { RelationshipMetadata } from './ModelRelationshipMetadata'

const defaultCRUDGeneratorConfig = {
    "create": true,
    "update": true,
    "findAll": true,
    "find": true,
    "delete": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true,
}

/**
 * Contains Graphback Core Models
 */
export class GraphbackCoreMetadata {

    private supportedCrudMethods: GraphbackCRUDGeneratorConfig
    private schema: GraphQLSchema;
    private models: ModelDefinition[]

    public constructor(globalConfig: GraphbackGlobalConfig, schema: GraphQLSchema) {
        this.schema = schema;
        this.supportedCrudMethods = Object.assign(defaultCRUDGeneratorConfig, globalConfig.crudMethods)
    }

    public getSchema() {
        return this.schema;
    }

    public setSchema(newSchema: GraphQLSchema) {
        this.schema = newSchema;
    }

    /**
     * Get Graphback Models - GraphQL Types with additional CRUD configuration
     */
    public getModelDefinitions() {

        //Contains map of the models with their underlying CRUD configuration
        this.models = [];
        const relationships = [];
        //Get actual user types 
        const modelTypes = this.getGraphQLTypesWithModel();
        for (const modelType of modelTypes) {
            const relationshipMetadata = this.buildRelationships(modelType);
            relationships.push(...relationshipMetadata);
        }

        for (const modelType of modelTypes) {
            const model = this.buildModel(modelType, relationships)
            this.models.push(model);
        }

        return this.models;
    }

    /**
     * Helper for plugins to fetch all types that should be processed by Graphback plugins.
     * To mark type as enabled for graphback generators we need to add `model` annotations over the type. 
     * 
     * Returns all user types that have @model in description
     * @param schema 
     */
    public getGraphQLTypesWithModel(): GraphQLObjectType[] {
        const types = getModelTypesFromSchema(this.schema)

        return types.filter((modelType: GraphQLObjectType) => parseMarker('model', modelType.description))
    }

    private buildModel(modelType: GraphQLObjectType, relationships: RelationshipMetadata[]) {
        let crudOptions = parseAnnotations('crud', modelType.description)
        //Merge CRUD options from type with global ones
        crudOptions = Object.assign(this.supportedCrudMethods, crudOptions)

        const modelRelations = this.findModelRelationships(modelType.name, relationships);

        return { graphqlType: modelType, relationships: modelRelations, crudOptions };
    }

    private buildRelationships(modelType: GraphQLObjectType): RelationshipMetadata[] {
        const relationships = [];

        // TODO: Move to helper
        Object.values(modelType.getFields()).filter((f: GraphQLField<any, any>) => {
            const dbAnnotations: any = parseDbAnnotations(f);

            // TODO: validate case of multiple relationships on a field
            return dbAnnotations.oneToMany || dbAnnotations.oneToOne;
        }).forEach((f: GraphQLField<any, any>) => {
            const dbAnnotations: any = parseDbAnnotations(f);

            if (dbAnnotations.oneToMany) {
                relationships.push({
                    parent: modelType,
                    parentField: f.name,
                    relationshipKind: 'oneToMany',
                    relationType: getBaseType(f.type),
                    relationField: dbAnnotations.oneToMany
                });
            }

            if (dbAnnotations.oneToOne) {
                relationships.push({
                    parent: modelType,
                    parentField: f.name,
                    relationshipKind: 'oneToOne',
                    relationType: getBaseType(f.type),
                    relationField: dbAnnotations.oneToOne
                });
            }
        });

        return relationships;
    }

    private findModelRelationships(modelName: string, relationships: RelationshipMetadata[]) {
        return relationships.filter((relationship: RelationshipMetadata) => {
            return relationship.parent.name === modelName;
        });
    }
}