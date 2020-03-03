import { buildSchema, GraphQLObjectType, GraphQLSchema, print } from 'graphql';
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { SchemaComposer } from 'graphql-compose';
import { RelationshipMetadataBuilder, FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder'
import { getModelTypesFromSchema } from './getModelTypesFromSchema'
import { GraphbackCRUDGeneratorConfig } from './GraphbackCRUDGeneratorConfig'
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig'
import { ModelDefinition } from './ModelDefinition';
import { SchemaCompType } from './SchemaComposer';

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

    private supportedCrudMethods: GraphbackCRUDGeneratorConfig;
    private schemaComposer: SchemaCompType;
    private models: ModelDefinition[];

    public constructor(globalConfig: GraphbackGlobalConfig, schemaComposer: SchemaCompType) {
        this.schemaComposer = schemaComposer;
        this.supportedCrudMethods = Object.assign(defaultCRUDGeneratorConfig, globalConfig.crudMethods)
    }

    public getSchemaComposer() {
        return this.schemaComposer;
    }

    /**
     * Get Graphback Models - GraphQL Types with additional CRUD configuration
     */
    public getModelDefinitions() {
        //Contains map of the models with their underlying CRUD configuration
        this.models = [];
        //Get actual user types
        const modelTypes = this.getGraphQLTypesWithModel();

        const relationshipBuilder = new RelationshipMetadataBuilder(modelTypes);
        relationshipBuilder.build();

        for (const modelType of modelTypes) {
            const model = this.buildModel(modelType, relationshipBuilder.getModelRelationships(modelType.name));
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
        const schema = this.schemaComposer.buildSchema();
        const types = getModelTypesFromSchema(schema);

        return types.filter((modelType: GraphQLObjectType) => parseMarker('model', modelType.description))
    }

    private buildModel(modelType: GraphQLObjectType, relationships: FieldRelationshipMetadata[]): ModelDefinition {
        let crudOptions = parseAnnotations('crud', modelType.description)
        //Merge CRUD options from type with global ones
        crudOptions = Object.assign(this.supportedCrudMethods, crudOptions)

        return { graphqlType: modelType, relationships, crudOptions };
    }
}
