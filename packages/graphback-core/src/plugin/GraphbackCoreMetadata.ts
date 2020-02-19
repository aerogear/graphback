import { GraphQLObjectType, GraphQLSchema, GraphQLField } from 'graphql'
import { parseAnnotations, parseMarker } from 'graphql-metadata'
import { parseDbAnnotations } from '../annotations/parser'
import { getBaseType } from '../utils/getBaseType'
import { getPrimaryKey, transformForeignKeyName } from '../db'
import { isModelType } from '../crud'
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

            return dbAnnotations.oneToMany || dbAnnotations.oneToOne;
        }).forEach((f: GraphQLField<any, any>) => {
            const dbAnnotations: any = parseDbAnnotations(f);

            if (dbAnnotations.oneToMany) {
                const relationType = getBaseType(f.type) as GraphQLObjectType;

                // ignore types that are do not have `@model` marker
                if (!isModelType(relationType)) {
                    return;
                }

                const oneToMany: RelationshipMetadata = {
                    parent: modelType,
                    parentField: f.name,
                    relationshipKind: 'oneToMany',
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
                    relationshipKind: 'manyToOne',
                    relationType: modelType,
                    relationField: f.name,
                    foreignKey: {
                        name: transformForeignKeyName(dbAnnotations.oneToMany, 'to-db'),
                        type: modelPrimaryKey.type
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

                const primaryKeyField = getPrimaryKey(relationType);
                const foreignKeyFieldName = transformForeignKeyName(f.name, 'to-db');

                const oneToOne: RelationshipMetadata = {
                    parent: modelType,
                    parentField: f.name,
                    relationshipKind: 'oneToOne',
                    relationType,
                    relationField: dbAnnotations.oneToOne,
                    foreignKey: {
                        name: foreignKeyFieldName,
                        type: primaryKeyField.type
                    }
                };

                relationships.push(oneToOne);
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