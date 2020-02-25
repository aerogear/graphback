import { GraphQLObjectType, GraphQLSchema, GraphQLField } from 'graphql'
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { getBaseType } from '../utils/getBaseType'
import { hasListType } from '../utils/hasListType'
import { RelationshipMetadata } from '../relationships/RelationshipMetadata'
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
    private relationshipMetadata: RelationshipMetadata;

    public constructor(globalConfig: GraphbackGlobalConfig, schema: GraphQLSchema) {
        this.schema = schema;
        this.supportedCrudMethods = Object.assign(defaultCRUDGeneratorConfig, globalConfig.crudMethods)
        this.relationshipMetadata = new RelationshipMetadata();
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

    // private buildRelationships(modelType: GraphQLObjectType): RelationshipMetadataDeprecated[] {
    //     const relationships = [];

    //     // TODO: Move to helper
    //     Object.values(modelType.getFields()).filter((f: GraphQLField<any, any>) => {
    //         const relationshipAnnotation = parseRelationshipAnnotation(f);

    //         return !!relationshipAnnotation;
    //     }).forEach((f: GraphQLField<any, any>) => {
    //         const relationshipInfo = parseRelationshipAnnotation(f);

    //         if (relationshipInfo.kind === 'oneToMany') {
    //             const relationType = getBaseType(f.type) as GraphQLObjectType;

    //             // ignore types that do not have `@model` marker
    //             // TODO document this
    //             if (!isModelType(relationType)) {
    //                 return;
    //             }

    //             this.validateOneToManyRelationshipMetadataDeprecated(modelType, relationType, f.name, relationshipInfo.field)

    //             const oneToMany: RelationshipMetadataDeprecated = {
    //                 parent: modelType,
    //                 parentField: f.name,
    //                 kind: 'oneToMany',
    //                 relationType,
    //                 relationField: relationshipInfo.field,
    //                 foreignKey: {
    //                     name: transformForeignKeyName(relationshipInfo.field, 'to-db')
    //                 }
    //             };

    //             const modelPrimaryKey = getPrimaryKey(modelType);

    //             const manyToOne: RelationshipMetadataDeprecated = {
    //                 parent: relationType,
    //                 parentField: relationshipInfo.field,
    //                 kind: 'manyToOne',
    //                 relationType: modelType,
    //                 relationField: f.name,
    //                 foreignKey: {
    //                     name: transformForeignKeyName(relationshipInfo.field, 'to-db'),
    //                     type: getBaseType(modelPrimaryKey.type)
    //                 }
    //             };

    //             relationships.push(oneToMany, manyToOne);
    //         }

    //         if (relationshipInfo.kind === 'oneToOne') {
    //             const relationType = getBaseType(f.type) as GraphQLObjectType;

    //             // ignore types that are do not have `@model` marker
    //             if (!isModelType(relationType)) {
    //                 return;
    //             }

    //             this.validateOneToOneRelationshipMetadataDeprecated(modelType, relationType, f.name, relationshipInfo.field);

    //             const relationPrimaryKey = getPrimaryKey(relationType);
    //             const foreignKeyFieldName = transformForeignKeyName(f.name, 'to-db');

    //             const oneToOne: RelationshipMetadataDeprecated = {
    //                 parent: modelType,
    //                 parentField: f.name,
    //                 kind: 'oneToOne',
    //                 relationType,
    //                 relationField: relationshipInfo.field,
    //                 foreignKey: {
    //                     name: foreignKeyFieldName,
    //                     type: getBaseType(relationPrimaryKey.type)
    //                 }
    //             };

    //             const modelPrimaryKey = getPrimaryKey(modelType)

    //             const oppositeOneToOne: RelationshipMetadataDeprecated = {
    //                 parent: relationType,
    //                 parentField: relationshipInfo.field,
    //                 kind: 'oneToOne',
    //                 relationType: modelType,
    //                 relationField: f.name,
    //                 foreignKey: {
    //                     name: transformForeignKeyName(relationshipInfo.field, 'to-db'),
    //                     type: getBaseType(modelPrimaryKey.type)
    //                 }
    //             };

    //             relationships.push(oneToOne, oppositeOneToOne);
    //         }

    //         if (relationshipInfo.kind === 'manyToOne') {
    //             // TODO: Check if is object type
    //             const relationType = getBaseType(f.type) as GraphQLObjectType;

    //             // ignore types that do not have `@model` marker
    //             // TODO document this
    //             if (!isModelType(relationType)) {
    //                 return;
    //             }

    //             const primaryKey = getPrimaryKey(relationType);
    //             const foreignKeyFieldName = transformForeignKeyName(f.name, 'to-db');

    //             const manyToOne: RelationshipMetadataDeprecated = {
    //                 parent: modelType,
    //                 parentField: f.name,
    //                 kind: 'manyToOne',
    //                 relationType,
    //                 relationField: relationshipInfo.kind,
    //                 foreignKey: {
    //                     name: foreignKeyFieldName,
    //                     type: getBaseType(primaryKey.type)
    //                 }
    //             };

    //             const oneToMany: RelationshipMetadataDeprecated = {
    //                 parent: relationType,
    //                 parentField: relationshipInfo.kind,
    //                 kind: 'oneToMany',
    //                 relationType: modelType,
    //                 relationField: f.name,
    //                 foreignKey: {
    //                     name: foreignKeyFieldName
    //                 }
    //             };

    //             relationships.push(manyToOne, oneToMany);
    //         }
    //     });

    //     return relationships;
    // }

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