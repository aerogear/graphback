import { GraphQLObjectType, GraphQLSchema, GraphQLField } from 'graphql'
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { getBaseType } from '../utils/getBaseType'
import { hasListType } from '../utils/hasListType'
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
    private relationshipMetadata: RelationshipMetadataBuilder;

    public constructor(globalConfig: GraphbackGlobalConfig, schema: GraphQLSchema) {
        this.schema = schema;
        this.supportedCrudMethods = Object.assign(defaultCRUDGeneratorConfig, globalConfig.crudMethods)
        this.relationshipMetadata = new RelationshipMetadataBuilder();
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
            this.relationshipMetadata.buildModelRelationships(modelType);
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

        const modelRelationships = this.relationshipMetadata.getModelRelationships(modelType.name);

        return { graphqlType: modelType, relationships: modelRelationships, crudOptions };
    }

    private validateOneToManyRelationshipMetadata(parentType: GraphQLObjectType, relationType: GraphQLObjectType, parentFieldName: string, relationFieldName: string) {
        if (!relationFieldName) {
            throw new Error(`${parentType.name}.${parentFieldName} '@oneToMany' annotation requires a relation field name.`)
        }

        const relationModelField = relationType.getFields()[relationFieldName];

        if (!relationModelField) {
            throw new Error(`${relationType.name} model requires a '${relationFieldName}' field.`)
        }

        const relationFieldBaseType = getBaseType(relationModelField.type);

        if (relationFieldBaseType.name !== parentType.name || hasListType(relationModelField.type)) {
            throw new Error(`${relationType.name}.${relationFieldName} field must be type ${parentType.name}`);
        }
    }

    private validateOneToOneRelationshipMetadata(parentType: GraphQLObjectType, relationType: GraphQLObjectType, parentFieldName: string, relationFieldName: string) {
        if (!relationFieldName) {
            throw new Error(`${parentType.name}.${parentFieldName} '@oneToOne' annotation requires a relation field name.`)
        }

        const relationModelField = relationType.getFields()[relationFieldName];

        if (!relationModelField) {
            throw new Error(`${relationType.name} model requires a '${relationFieldName}' field.`)
        }

        const relationFieldBaseType = getBaseType(relationModelField.type);

        if (relationFieldBaseType.name !== parentType.name || hasListType(relationModelField.type)) {
            throw new Error(`${relationType.name}.${relationFieldName} field must be type ${parentType.name}`);
        }
    }
}