import { GraphQLObjectType, GraphQLSchema, GraphQLField, getNullableType } from 'graphql'
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { parseDbAnnotations, parseRelationshipAnnotations } from '../annotations/parser'
import { getBaseType } from '../utils/getBaseType'
import { getPrimaryKey, transformForeignKeyName } from '../db'
import { isModelType } from '../crud'
import { hasListType } from '../utils/hasListType'
import { findModelRelationships } from '../relationships/relationshipHelpers'
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

        const modelRelations = findModelRelationships(modelType.name, relationships);

        return { graphqlType: modelType, relationships: modelRelations, crudOptions };
    }

    private buildRelationships(modelType: GraphQLObjectType): RelationshipMetadata[] {
        const relationships = [];

        // TODO: Move to helper
        Object.values(modelType.getFields()).filter((f: GraphQLField<any, any>) => {
            const dbAnnotations: any = parseRelationshipAnnotations(f);

            return dbAnnotations.oneToMany || dbAnnotations.oneToOne || dbAnnotations.manyToOne;
        }).forEach((f: GraphQLField<any, any>) => {
            const dbAnnotations: any = parseRelationshipAnnotations(f);

            if (dbAnnotations.oneToMany) {
                const relationType = getBaseType(f.type) as GraphQLObjectType;

                // ignore types that do not have `@model` marker
                // TODO document this
                if (!isModelType(relationType)) {
                    return;
                }

                this.validateOneToManyRelationshipMetadata(modelType, relationType, f.name, dbAnnotations.oneToMany)

                const oneToMany: RelationshipMetadata = {
                    parent: modelType,
                    parentField: f.name,
                    kind: 'oneToMany',
                    relationType,
                    relationField: dbAnnotations.oneToMany,
                    foreignKey: {
                        name: transformForeignKeyName(dbAnnotations.oneToMany, 'to-db')
                    }
                };

                const modelPrimaryKey = getPrimaryKey(modelType);

                const manyToOne: RelationshipMetadata = {
                    parent: relationType,
                    parentField: dbAnnotations.oneToMany,
                    kind: 'manyToOne',
                    relationType: modelType,
                    relationField: f.name,
                    foreignKey: {
                        name: transformForeignKeyName(dbAnnotations.oneToMany, 'to-db'),
                        type: getBaseType(modelPrimaryKey.type)
                    }
                };

                relationships.push(oneToMany, manyToOne);
            }

            if (dbAnnotations.oneToOne) {
                const relationType = getBaseType(f.type) as GraphQLObjectType;

                // ignore types that are do not have `@model` marker
                if (!isModelType(relationType)) {
                    return;
                }

                this.validateOneToOneRelationshipMetadata(modelType, relationType, f.name, dbAnnotations.oneToOne);

                const relationPrimaryKey = getPrimaryKey(relationType);
                const foreignKeyFieldName = transformForeignKeyName(f.name, 'to-db');

                const oneToOne: RelationshipMetadata = {
                    parent: modelType,
                    parentField: f.name,
                    kind: 'oneToOne',
                    relationType,
                    relationField: dbAnnotations.oneToOne,
                    foreignKey: {
                        name: foreignKeyFieldName,
                        type: getBaseType(relationPrimaryKey.type)
                    }
                };

                const modelPrimaryKey = getPrimaryKey(modelType)

                const oppositeOneToOne: RelationshipMetadata = {
                    parent: relationType,
                    parentField: dbAnnotations.oneToOne,
                    kind: 'oneToOne',
                    relationType: modelType,
                    relationField: f.name,
                    foreignKey: {
                        name: transformForeignKeyName(dbAnnotations.oneToOne, 'to-db'),
                        type: getBaseType(modelPrimaryKey.type)
                    }
                };

                relationships.push(oneToOne, oppositeOneToOne);
            }

            if (dbAnnotations.manyToOne) {
                // TODO: Check if is object type
                const relationType = getBaseType(f.type) as GraphQLObjectType;

                // ignore types that do not have `@model` marker
                // TODO document this
                if (!isModelType(relationType)) {
                    return;
                }

                const primaryKey = getPrimaryKey(relationType);
                const foreignKeyFieldName = transformForeignKeyName(f.name, 'to-db');

                const manyToOne: RelationshipMetadata = {
                    parent: modelType,
                    parentField: f.name,
                    kind: 'manyToOne',
                    relationType,
                    relationField: dbAnnotations.manyToOne,
                    foreignKey: {
                        name: foreignKeyFieldName,
                        type: getBaseType(primaryKey.type)
                    }
                };

                const oneToMany: RelationshipMetadata = {
                    parent: relationType,
                    parentField: dbAnnotations.manyToOne,
                    kind: 'oneToMany',
                    relationType: modelType,
                    relationField: f.name,
                    foreignKey: {
                        name: foreignKeyFieldName
                    }
                };

                relationships.push(manyToOne, oneToMany);
            }
        });

        return relationships;
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