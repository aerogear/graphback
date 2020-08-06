/* eslint-disable max-lines */
import { GraphQLObjectType, GraphQLField, isObjectType, GraphQLScalarType, GraphQLOutputType, GraphQLNonNull, GraphQLList, getNamedType } from 'graphql';
import * as pluralize from 'pluralize';
import { isModelType, lowerCaseFirstChar } from '../crud';
import { transformForeignKeyName } from '../db';
import { hasListType } from '../utils/hasListType';
import { parseRelationshipAnnotation, relationshipFieldDescriptionTemplate, mergeDescriptionWithRelationshipAnnotation, relationshipOneToOneFieldDescriptionTemplate } from './relationshipHelpers';

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
    const fields = this.getRelationshipFields(modelType);

    for (let field of fields) {
      const relationMetadata = this.getRelationshipMetadata(field, modelType);

      if (relationMetadata?.length) {
        this.relationships.push(...relationMetadata)
        continue
      }

      const annotation = parseRelationshipAnnotation(field.description);

      this.validateRelationshipField(modelType.name, field);

      const relationType = getNamedType(field.type) as GraphQLObjectType;

      let relationField = relationType.getFields()[annotation.field];

      if (annotation.kind === 'oneToMany') {
        field = this.updateOneToManyField(field, annotation.field, annotation.key)

        if (!relationField) {
          relationField = this.createManyToOneField(annotation.field, modelType, field.name, annotation.key);
        } else {
          relationField = this.updateManyToOneField(relationField, field.name, annotation.key);
        }

        this.addOneToMany(modelType, field);
        this.addManyToOne(relationType, relationField);

      } else if (annotation.kind === 'manyToOne') {
        if (!relationField) {
          relationField = this.createOneToManyField(annotation.field, modelType, field.name, annotation.key);
        }

        this.addManyToOne(modelType, field);
        this.addOneToMany(relationType, relationField);

      } else if (annotation.kind === 'oneToOne') {
        field = this.updateOneToOneField(field, annotation.key);

        this.addOneToOne(modelType, field);
      }
    }
  }

  private getRelationshipMetadata(field: GraphQLField<any, any>, owner: GraphQLObjectType): FieldRelationshipMetadata[] {
    const fieldType = getNamedType(field.type)

    const outputFields: FieldRelationshipMetadata[] = []

    if (!isObjectType(fieldType) || !isModelType(fieldType)) {
      return undefined
    }

    if (parseRelationshipAnnotation(field.description)) {
      return undefined
    }

    // oneToMany
    if (hasListType(field.type)) {
      const ownerName = owner.name;
      const relationFieldName = lowerCaseFirstChar(ownerName)
      const relationForeignKey = transformForeignKeyName(relationFieldName)

      outputFields.push({
        kind: 'oneToMany',
        owner,
        ownerField: this.updateOneToManyField(field, relationFieldName, relationForeignKey),
        relationType: fieldType,
        relationFieldName,
        relationForeignKey
      })

      outputFields.push({
        kind: 'manyToOne',
        owner: fieldType,
        ownerField: fieldType.getFields()[relationFieldName] || this.createManyToOneField(relationFieldName, owner, pluralize(lowerCaseFirstChar(fieldType.name))),
        relationType: owner,
        relationFieldName: field.name,
        relationForeignKey
      })
    } else if (this.isManyToOne(field, owner)) {
      const relationFieldName = lowerCaseFirstChar(owner.name)

      const oneToManyFieldType = getNamedType(field.type) as GraphQLObjectType

      const oneToManyField = Object.values((oneToManyFieldType.getFields())).find((f: GraphQLField<any, any>) => {
        const relationshipAnnotation = parseRelationshipAnnotation(f.description)

        return (relationshipAnnotation?.kind === 'oneToMany' && relationshipAnnotation.field === field.name)
      });
      const oneToManyFieldAnnotation = parseRelationshipAnnotation(oneToManyField.description)

      const foreignKeyName = oneToManyFieldAnnotation.key || transformForeignKeyName(field.name)

      outputFields.push({
        kind: 'manyToOne',
        owner,
        ownerField: this.updateManyToOneField(field, pluralize(relationFieldName), foreignKeyName),
        relationType: fieldType,
        relationFieldName: foreignKeyName
      })

    } else {
      const foreignKeyName = transformForeignKeyName(lowerCaseFirstChar(field.name))

      outputFields.push({
        kind: 'oneToOne',
        owner,
        ownerField: this.updateOneToOneField(field, foreignKeyName),
        relationType: fieldType,
        relationFieldName: foreignKeyName
      })
    }

    return outputFields
  }

  private isManyToOne(field: GraphQLField<any, any>, owner: GraphQLObjectType): boolean {
    const relationType = getNamedType(field.type)

    if (!isObjectType(relationType) || !isModelType(relationType)) {
      return false
    }

    const relationFields = this.getRelationshipFields(relationType)

    const oneToManyField = relationFields.find((f: GraphQLField<any, any>) => {
      const annotation = parseRelationshipAnnotation(f.description)

      return annotation.kind === 'oneToMany' && annotation.field === field.name
    })

    return Boolean(oneToManyField)
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
    const columnField = columnName || transformForeignKeyName(relationFieldName);
    const fieldDescription = relationshipFieldDescriptionTemplate('oneToMany', relationFieldName, columnField);
    const finalDescription = mergeDescriptionWithRelationshipAnnotation(fieldDescription, field.description);

    return {
      ...field,
      description: finalDescription
    }
  }

  private updateManyToOneField(field: GraphQLField<any, any>, relationFieldName: string, columnName?: string): GraphQLField<any, any> {
    const columnField = columnName || transformForeignKeyName(field.name);
    const fieldDescription = relationshipFieldDescriptionTemplate('manyToOne', relationFieldName, columnField);
    const finalDescription = mergeDescriptionWithRelationshipAnnotation(fieldDescription, field.description);

    return {
      ...field,
      description: finalDescription
    }
  }

  private updateOneToOneField(field: GraphQLField<any, any>, columnName?: string): GraphQLField<any, any> {
    const columnField = columnName || transformForeignKeyName(field.name);
    const fieldDescription = relationshipOneToOneFieldDescriptionTemplate('oneToOne', columnField);
    const finalDescription = mergeDescriptionWithRelationshipAnnotation(fieldDescription, field.description);

    return {
      ...field,
      description: finalDescription
    }
  }

  private addOneToMany(ownerType: GraphQLObjectType, field: GraphQLField<any, any>) {
    this.validateOneToManyRelationship(ownerType.name, field);

    const metadata = parseRelationshipAnnotation(field.description);

    // skip - relationship with key annotation will be generated at later stage
    if (!metadata.key) {
      return;
    }

    const relationType = getNamedType(field.type) as GraphQLObjectType;
    const foreignKeyField = metadata.key || transformForeignKeyName(metadata.field);

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
    this.validateManyToOneField(ownerType.name, field);

    const metadata = parseRelationshipAnnotation(field.description);

    // skip - relationship with key annotation will be generated at later stage
    if (!metadata.key) {
      return;
    }

    const relationType = getNamedType(field.type) as GraphQLObjectType;
    const columnField = metadata.key || transformForeignKeyName(field.name);

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
    this.validateOneToOneRelationship(ownerType.name, field);

    const metadata = parseRelationshipAnnotation(field.description);

    // skip - relationship with key mapping will be generated at a later stage
    if (!metadata.key) {
      return;
    }

    const relationType = getNamedType(field.type) as GraphQLObjectType;

    const columnField = metadata.key || transformForeignKeyName(field.name);

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

    return fields.filter((f: GraphQLField<any, any>) => !!isModelType(getNamedType(f.type)));
  }

  private validateOneToManyRelationship(modelName: string, field: GraphQLField<any, any>) {
    this.validateRelationshipField(modelName, field);

    const oneToManyMetadata = parseRelationshipAnnotation(field.description);

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

    const manyToOneMetadata = parseRelationshipAnnotation(relationField.description);

    if (manyToOneMetadata && oneToManyMetadata.key && manyToOneMetadata.key && oneToManyMetadata.key !== manyToOneMetadata.key) {
      throw new Error(`${modelName}.${field.name} and ${relationModelType.name}.${relationField.name} 'key' annotations are different. Ensure both are the same, or remove one so that it can be generated.`);
    }
  }

  private validateManyToOneField(modelName: string, field: GraphQLField<any, any>) {
    this.validateRelationshipField(modelName, field);

    const metadata = parseRelationshipAnnotation(field.description);

    if (metadata.kind !== 'manyToOne') {
      throw new Error(`${modelName}.${field.name} should be a @manyToOne field, but has a @${metadata.kind} annotation`);
    }
  }

  private validateOneToOneRelationship(modelName: string, field: GraphQLField<any, any>) {
    this.validateRelationshipField(modelName, field);

    const metadata = parseRelationshipAnnotation(field.description);

    if (metadata.kind !== 'oneToOne') {
      throw new Error(`${modelName}.${field.name} should be a @oneToOne field, but has a ${metadata.kind} annotation`);
    }

    if (hasListType(field.type)) {
      throw new Error(`${modelName}.${field.name} is a list type, but should be an object.`)
    }
  }

  private validateRelationshipField(modelName: string, field: GraphQLField<any, any>) {
    const relationshipAnnotation = parseRelationshipAnnotation(field.description);
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
