import { GraphQLObjectType, GraphQLField, isObjectType, GraphQLScalarType, GraphQLOutputType, GraphQLNonNull, GraphQLList } from 'graphql';
import { isModelType } from '../crud';
import { getBaseType } from '../utils/getBaseType';
import { transformForeignKeyName } from '../db';
import { parseRelationshipAnnotation } from './relationshipHelpers';

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
    name: string
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
            const annotation = parseRelationshipAnnotation(field);

            const relationType = getBaseType(field.type) as GraphQLObjectType;
            let relationField = relationType.getFields()[annotation.field];

            if (annotation.kind === 'oneToMany') {
                
                if (!relationField) {
                    relationField = this.createManyToOneField(annotation, modelType, field.name);
                }

                this.addOneToMany(modelType, field);
                this.addManyToOne(relationType, relationField);
            } else if (annotation.kind === 'manyToOne') {
                
                if (!relationField) {
                    relationField = this.createOneToManyField(annotation, modelType, field.name);
                }

                this.addManyToOne(modelType, field);
                this.addOneToMany(relationType, relationField);
            } else if (annotation.kind === 'oneToOne') {
                // TODO
            }
        }
    }

    public getModelRelationships(modelName: string): FieldRelationshipMetadata[] {
        return this.relationships.filter((relationship: FieldRelationshipMetadata) => relationship.owner.name === modelName);
    }

    private createManyToOneField(relationshipAnnotation: RelationshipAnnotation, baseType: GraphQLOutputType, relationFieldName: string): GraphQLField<any, any> {
        const columnField = relationshipAnnotation.name || transformForeignKeyName(relationshipAnnotation.field);
        const fieldDescription = `@manyToOne field: '${relationFieldName}', name: '${columnField}'`;
        
        return {
            name: relationshipAnnotation.field,
            description: fieldDescription,
            type: baseType,
            args: [],
            extensions: []
        }
    }

    private createOneToManyField(relationshipAnnotation: RelationshipAnnotation, baseType: GraphQLOutputType, relationFieldName: string): GraphQLField<any, any> {
        const columnField = relationshipAnnotation.name || transformForeignKeyName(relationshipAnnotation.field);
        const fieldDescription = `@oneToMany field: '${relationFieldName}', name: '${columnField}'`;

        const fieldListType = GraphQLNonNull(GraphQLList(baseType));
        
        return {
            name: relationshipAnnotation.field,
            description: fieldDescription,
            type: fieldListType,
            args: [],
            extensions: []
        }
    }

    private addOneToMany(ownerType: GraphQLObjectType, field: GraphQLField<any, any>) {
        this.validateField(ownerType.name, field);

        const metadata = parseRelationshipAnnotation(field);
        const relationType = getBaseType(field.type) as GraphQLObjectType;

        const oneToMany: FieldRelationshipMetadata = {
            kind: 'oneToMany',
            owner: ownerType,
            ownerField: field,
            relationType,
            relationFieldName: metadata.field,
            relationForeignKey: metadata.name
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
        const metadata = parseRelationshipAnnotation(field);
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