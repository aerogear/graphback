import { GraphQLObjectType, GraphQLField, isObjectType, GraphQLScalarType, GraphQLOutputType, GraphQLNonNull, GraphQLList } from 'graphql';
import { isModelType } from '../crud';
import { getBaseType } from '../utils/getBaseType';
import { transformForeignKeyName } from '../db';
import { parseRelationshipAnnotation, relationshipFieldDescriptionTemplate } from './relationshipHelpers';

export interface FieldRelationshipMetadata {
    kind: 'oneToMany' | 'oneToOne' | 'manyToOne'
    owner: GraphQLObjectType
    ownerField: GraphQLField<any, any>
    relationType: GraphQLObjectType
    relationFieldName: string
    relationFieldType?: GraphQLScalarType
    relationForeignKey?: string
}

export interface RelationshipAnnotation {
    kind: 'oneToMany' | 'oneToOne' | 'manyToOne'
    field: string
    name?: string // TODO change from 'name' to 'key'
}

// TODO document me
export class RelationshipMetadata {
    private relationships: FieldRelationshipMetadata[];

    public constructor() {
        this.relationships = [];
    }

    public getRelationships(): FieldRelationshipMetadata[] {
        return this.relationships;
    }

    public buildModelRelationships(modelType: GraphQLObjectType) {
        const fields = this.getRelationshipFields(modelType);

        for (const field of fields) {
            const relationshipAnnotation = parseRelationshipAnnotation(field);

            const relationType = getBaseType(field.type) as GraphQLObjectType;
            let relationField = relationType.getFields()[relationshipAnnotation.field];

            if (relationshipAnnotation.kind === 'oneToMany') {

                if (!relationField) {
                    relationField = this.createManyToOneField(relationshipAnnotation.field, modelType, field.name, relationshipAnnotation.name);
                }

                this.addOneToMany(modelType, field);
                this.addManyToOne(relationType, relationField);
            } else if (relationshipAnnotation.kind === 'manyToOne') {

                if (!relationField) {
                    relationField = this.createOneToManyField(relationshipAnnotation.field, modelType, field.name, relationshipAnnotation.name);
                }

                this.addManyToOne(modelType, field);
                this.addOneToMany(relationType, relationField);
            } else if (relationshipAnnotation.kind === 'oneToOne') {
                if (!relationField) {
                    relationField = this.createOneToOneField(relationshipAnnotation.field, modelType, field.name, relationshipAnnotation.name)
                }

                this.addOneToOne(modelType, field);
            }
        }
    }

    public getModelRelationships(modelName: string): FieldRelationshipMetadata[] {
        return this.relationships.filter((relationship: FieldRelationshipMetadata) => relationship.owner.name === modelName);
    }

    private createOneToManyField(fieldName: string, baseType: GraphQLOutputType, relationFieldName: string, columnName?: string): GraphQLField<any, any> {
        const columnField = columnName || transformForeignKeyName(relationFieldName);
        const fieldDescription = relationshipFieldDescriptionTemplate('oneToMany', relationFieldName, columnField);

        const fieldType = GraphQLNonNull(GraphQLList(baseType));

        return {
            name: fieldName,
            description: fieldDescription,
            type: fieldType,
            args: [],
            extensions: []
        }
    }

    private createManyToOneField(fieldName: string, baseType: GraphQLOutputType, relationFieldName: string, columnName?: string): GraphQLField<any, any> {
        const columnField = columnName || transformForeignKeyName(fieldName);
        const fieldDescription = relationshipFieldDescriptionTemplate('manyToOne', relationFieldName, columnField);

        return {
            name: fieldName,
            description: fieldDescription,
            type: baseType,
            args: [],
            extensions: []
        }
    }

    private createOneToOneField(fieldName: string, baseType: GraphQLOutputType, relationFieldName: string, columnName?: string): GraphQLField<any, any> {
        const columnField = columnName || transformForeignKeyName(fieldName);
        const fieldDescription = relationshipFieldDescriptionTemplate('oneToOne', relationFieldName, columnField);

        return {
            name: fieldName,
            description: fieldDescription,
            type: baseType,
            args: [],
            extensions: []
        }
    }

    private addOneToMany(ownerType: GraphQLObjectType, field: GraphQLField<any, any>) {
        this.validateField(ownerType.name, field);

        const metadata = parseRelationshipAnnotation(field);
        const relationType = getBaseType(field.type) as GraphQLObjectType;

        const foreignKeyField = metadata.name || transformForeignKeyName(metadata.field);

        const oneToMany: FieldRelationshipMetadata = {
            kind: 'oneToMany',
            owner: ownerType,
            ownerField: field,
            relationType,
            relationFieldName: metadata.field,
            relationForeignKey: foreignKeyField
        };

        this.relationships.push(oneToMany);
    }

    private addManyToOne(ownerType: GraphQLObjectType, field: GraphQLField<any, any>) {
        this.validateField(ownerType.name, field);

        const metadata = parseRelationshipAnnotation(field);
        const relationType = getBaseType(field.type) as GraphQLObjectType;

        const columnField = metadata.name || transformForeignKeyName(field.name);

        const manyToOne: FieldRelationshipMetadata = {
            kind: 'manyToOne',
            owner: ownerType,
            ownerField: field,
            relationType,
            relationFieldName: metadata.field,
            relationForeignKey: columnField
        }

        this.relationships.push(manyToOne);
    }

    private addOneToOne(ownerType: GraphQLObjectType, field: GraphQLField<any, any>) {
        this.validateField(ownerType.name, field);

        const metadata = parseRelationshipAnnotation(field);
        const relationType = getBaseType(field.type) as GraphQLObjectType;

        const columnField = metadata.name || transformForeignKeyName(field.name);

        const oneToOne: FieldRelationshipMetadata = {
            kind: 'oneToOne',
            owner: ownerType,
            ownerField: field,
            relationType,
            relationFieldName: metadata.field,
            relationForeignKey: columnField
        };

        this.relationships.push(oneToOne);
    }

    private getRelationshipFields(modelType: GraphQLObjectType): GraphQLField<any, any>[] {
        const fields = Object.values(modelType.getFields());

        return fields.filter((f: GraphQLField<any, any>) => !!parseRelationshipAnnotation(f));
    }

    private validateField(modelName: string, field: GraphQLField<any, any>) {
        const fieldBaseType = getBaseType(field.type);

        if (!isObjectType(fieldBaseType)) {
            throw new Error(`${modelName}.${field.name} is marked as a relationship field, but has type '${fieldBaseType.name}'. Relationship fields must be object types.`);
        }

        if (!isModelType(fieldBaseType)) {
            throw new Error(`${modelName}.${field.name} is marked as a relationship field, but type '${fieldBaseType.name}' is missing the @model annotation.`);
        }
    }
}