/* eslint-disable max-lines */
import { GraphQLObjectType, GraphQLField, isObjectType, GraphQLScalarType, GraphQLOutputType, GraphQLNonNull, GraphQLList, getNamedType } from 'graphql';
import { parseMetadata } from 'graphql-metadata';
import { isModelType } from '../crud';
import { transformForeignKeyName } from '../db';
import { hasListType } from '../utils/hasListType';
import { parseRelationshipAnnotation, relationshipFieldDescriptionTemplate, relationshipOneToOneFieldDescriptionTemplate } from './relationshipHelpers';

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
  field?: string
  key?: string
}

/**
 * Builds relationship context for entire data model.
 * Performs validation on relationship fields and metadata
 * Dynamically creates relationship fields and maps values to data layer.
 */
export class RelationshipMetadataBuilder {
  private modelTypes: GraphQLObjectType[];
  private relationships: FieldRelationshipMetadata[];
  public constructor(modelTypes: GraphQLObjectType[]) {
    this.relationships = [];
    this.modelTypes = modelTypes;
  }

  /**
   * Builds relationship context for entire data model
   * Generates fields and anotations
   */
  public build() {
    for (const modelType of this.modelTypes) {
      this.buildModelRelationshipContext(modelType);
    }
  }

  /**
   * Get all relationships
   */
  public getRelationships() {
    return this.relationships;
  }

  /**
   * Get all relationships where the model is the parent.
   * @param modelName
   */
  public getModelRelationships(modelName: string): FieldRelationshipMetadata[] {
    return this.relationships.filter((relationship: FieldRelationshipMetadata) => relationship.owner.name === modelName);
  }

  /**
   * Collects relationship information for a model based on relationship field annotations
   * and pushes to list of all relationships in data model.
   *
   * @param modelType
   */
  private buildModelRelationshipContext(modelType: GraphQLObjectType) {
    const fields = Object.values(modelType.getFields());

    for (let field of fields) {
      const annotation = parseRelationshipAnnotation(field.description);
      if (!annotation) {
        continue;
      }

      this.validateRelationshipField(modelType.name, field, annotation);

      const relationType = getNamedType(field.type) as GraphQLObjectType;

      let relationField = relationType.getFields()[annotation.field];

      if (annotation.kind === 'oneToMany') {
        field = this.updateOneToManyField(field, annotation.field, annotation.key)

        if (!relationField) {
          relationField = this.createManyToOneField(annotation.field, modelType, field.name, annotation.key);
        } else {
          relationField = this.updateManyToOneField(relationField, field.name, annotation.key);
        }

        // Avoid reparsing if annotation key defined
        const oneToManyAnnotation = annotation.key ? annotation : parseRelationshipAnnotation(field.description);

        const manyToOneAnnotation = parseRelationshipAnnotation(relationField.description);

        this.addOneToMany(modelType, field, oneToManyAnnotation, manyToOneAnnotation);
        this.addManyToOne(relationType, relationField, manyToOneAnnotation);

      } else if (annotation.kind === 'manyToOne') {

        if (!relationField) {
          relationField = this.createOneToManyField(annotation.field, modelType, field.name, annotation.key);
        }

        const oneToManyAnnotation = parseRelationshipAnnotation(relationField.description);

        this.addManyToOne(modelType, field, annotation);
        this.addOneToMany(relationType, relationField, oneToManyAnnotation, annotation);

      } else if (annotation.kind === 'oneToOne') {
        field = this.updateOneToOneField(field, annotation.key);

        // avoid reparsing if annotation key defined
        const oneToOneAnnotation = annotation.key ? annotation : parseRelationshipAnnotation(field.description)
        this.addOneToOne(modelType, field, oneToOneAnnotation);
      }
    }
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
      extensions: [],
      isDeprecated: false,
      deprecationReason: undefined
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
      extensions: [],
      isDeprecated: false,
      deprecationReason: undefined
    }
  }

  private updateOneToManyField(field: GraphQLField<any, any>, relationFieldName: string, columnName?: string): GraphQLField<any, any> {
    if (!columnName) {
      const columnField = transformForeignKeyName(relationFieldName);
      const fieldDescription = relationshipFieldDescriptionTemplate('oneToMany', relationFieldName, columnField);
      const oldDescription = field.description ? `\n${field.description}` : '';

      return {
        ...field,
        description: `${fieldDescription}${oldDescription}`
      }
    }

    return field;
  }

  private updateManyToOneField(field: GraphQLField<any, any>, relationFieldName: string, columnName?: string): GraphQLField<any, any> {
    const manyToOneMetadata = parseMetadata("manyToOne", field.description);

    if (!manyToOneMetadata || !manyToOneMetadata.key) {
      const columnField = columnName || transformForeignKeyName(field.name);
      const fieldDescription = relationshipFieldDescriptionTemplate('manyToOne', relationFieldName, columnField)
      const oldDescription = field.description ? `\n${field.description}` : '';

      return {
        ...field,
        description: `${fieldDescription}${oldDescription}`
      }
    }

    return field;
  }

  private updateOneToOneField(field: GraphQLField<any, any>, columnName?: string): GraphQLField<any, any> {
    if (!columnName) {
      const columnField = transformForeignKeyName(field.name);
      const fieldDescription = relationshipOneToOneFieldDescriptionTemplate('oneToOne', columnField);
      const oldDescription = field.description ? `\n${field.description}` : '';

      return {
        ...field,
        description: `${fieldDescription}${oldDescription}`
      }
    }

    return field;
  }

  private addOneToMany(ownerType: GraphQLObjectType, field: GraphQLField<any, any>, oneToManyAnnotation: RelationshipAnnotation, corresspondingManyToOneMetadata: RelationshipAnnotation) {
    this.validateOneToManyRelationship(ownerType.name, field, oneToManyAnnotation, corresspondingManyToOneMetadata);

    // skip - relationship with key annotation will be generated at later stage
    if (!oneToManyAnnotation.key) {
      return;
    }

    const relationType = getNamedType(field.type) as GraphQLObjectType;

    const oneToMany: FieldRelationshipMetadata = {
      kind: 'oneToMany',
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: oneToManyAnnotation.field,
      relationForeignKey: oneToManyAnnotation.key
    };

    this.relationships.push(oneToMany);
  }

  private addManyToOne(ownerType: GraphQLObjectType, field: GraphQLField<any, any>, manyToOneAnnotation: RelationshipAnnotation) {
    this.validateManyToOneField(ownerType.name, field, manyToOneAnnotation);

    // skip - relationship with key annotation will be generated at later stage
    if (!manyToOneAnnotation.key) {
      return;
    }

    const relationType = getNamedType(field.type) as GraphQLObjectType;

    const manyToOne: FieldRelationshipMetadata = {
      kind: 'manyToOne',
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: manyToOneAnnotation.field,
      relationForeignKey: manyToOneAnnotation.key
    }

    this.relationships.push(manyToOne);
  }

  private addOneToOne(ownerType: GraphQLObjectType, field: GraphQLField<any, any>, oneToOneAnnotation: RelationshipAnnotation) {
    this.validateOneToOneRelationship(ownerType.name, field, oneToOneAnnotation);

    // skip - relationship with key mapping will be generated at a later stage
    if (!oneToOneAnnotation.key) {
      return;
    }

    const relationType = getNamedType(field.type) as GraphQLObjectType;

    const oneToOne: FieldRelationshipMetadata = {
      kind: 'oneToOne',
      owner: ownerType,
      ownerField: field,
      relationType,
      relationFieldName: oneToOneAnnotation.field,
      relationForeignKey: oneToOneAnnotation.key
    };

    this.relationships.push(oneToOne);
  }

  private validateOneToManyRelationship(modelName: string, field: GraphQLField<any, any>, oneToManyMetadata: RelationshipAnnotation, corresspondingManyToOneMetadata: RelationshipAnnotation) {
    this.validateRelationshipField(modelName, field, oneToManyMetadata);

    if (oneToManyMetadata.kind !== 'oneToMany') {
      throw new Error(`${modelName}.${field.name} should be a @oneToMany field, but has a @${oneToManyMetadata.kind} annotation`);
    }

    const relationModelType = getNamedType(field.type) as GraphQLObjectType;
    const relationField = relationModelType.getFields()[oneToManyMetadata.field];

    // field will be generated, no need to validate
    if (!relationField) {
      return;
    }

    if (hasListType(relationField.type)) {
      throw new Error(`${relationModelType.name}.${relationField.name} is a list type, but should be '${relationField.name}: ${modelName}'.`)
    }

    const relationFieldBaseType = getNamedType(relationField.type);

    if (!isObjectType(relationFieldBaseType) || relationFieldBaseType.name !== modelName) {
      throw new Error(`${modelName}.${field.name} relationship field maps to ${relationModelType.name}.${relationField.name} (${relationFieldBaseType.name} type) which should be ${modelName} type.`);
    }

    if (oneToManyMetadata?.key !== corresspondingManyToOneMetadata?.key) {
      throw new Error(`${modelName}.${field.name} and ${relationModelType.name}.${relationField.name} 'key' annotations are different. Ensure both are the same, or remove one so that it can be generated.`);
    }
  }

  private validateManyToOneField(modelName: string, field: GraphQLField<any, any>, manyToOneAnnotation: RelationshipAnnotation) {
    this.validateRelationshipField(modelName, field, manyToOneAnnotation);

    if (manyToOneAnnotation.kind !== 'manyToOne') {
      throw new Error(`${modelName}.${field.name} should be a @manyToOne field, but has a @${manyToOneAnnotation.kind} annotation`);
    }
  }

  private validateOneToOneRelationship(modelName: string, field: GraphQLField<any, any>, oneToOneAnnotation: RelationshipAnnotation) {
    this.validateRelationshipField(modelName, field, oneToOneAnnotation);

    if (oneToOneAnnotation.kind !== 'oneToOne') {
      throw new Error(`${modelName}.${field.name} should be a @oneToOne field, but has a ${oneToOneAnnotation.kind} annotation`);
    }

    if (hasListType(field.type)) {
      throw new Error(`${modelName}.${field.name} is a list type, but should be an object.`)
    }
  }

  private validateRelationshipField(modelName: string, field: GraphQLField<any, any>, relationshipAnnotation: RelationshipAnnotation) {
    if (!relationshipAnnotation) {
      throw new Error(`${modelName}.${field.name} is missing a relationship annotation.`)
    }

    const fieldBaseType = getNamedType(field.type);

    if (!isObjectType(fieldBaseType)) {
      throw new Error(`${modelName}.${field.name} is marked as a relationship field, but has type ${fieldBaseType.name}. Relationship fields must be object types.`);
    }

    if (!isModelType(fieldBaseType)) {
      throw new Error(`${modelName}.${field.name} is marked as a relationship field, but type ${fieldBaseType.name} is missing the @model annotation.`);
    }
  }
}
