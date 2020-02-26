import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { RelationshipMetadataBuilder } from '../relationships/RelationshipMetadata'
import { getModelTypesFromSchema } from './getModelTypesFromSchema'
import { GraphbackCRUDGeneratorConfig } from './GraphbackCRUDGeneratorConfig'
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig'
import { ModelDefinition } from './ModelDefinition';

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
    private models: ModelDefinition[];
    private relationshipBuilder: RelationshipMetadataBuilder;

    public constructor(globalConfig: GraphbackGlobalConfig, schema: GraphQLSchema) {
        this.schema = schema;
        this.supportedCrudMethods = Object.assign(defaultCRUDGeneratorConfig, globalConfig.crudMethods)
        this.relationshipBuilder = new RelationshipMetadataBuilder();
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
        //Get actual user types 
        const modelTypes = this.getGraphQLTypesWithModel();
        for (const modelType of modelTypes) {
            this.relationshipBuilder.buildRelationshipContext(modelType);
        }

        for (const modelType of modelTypes) {
            const model = this.buildModel(modelType)
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

    private buildModel(modelType: GraphQLObjectType): ModelDefinition {
        let crudOptions = parseAnnotations('crud', modelType.description)
        //Merge CRUD options from type with global ones
        crudOptions = Object.assign(this.supportedCrudMethods, crudOptions)

        const modelRelationships = this.relationshipBuilder.getModelRelationships(modelType.name);

        return { graphqlType: modelType, relationships: modelRelationships, crudOptions };
    }
}