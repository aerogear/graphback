import { GraphQLField, GraphQLFieldMap, GraphQLObjectType, GraphQLSchema } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { getUserModels } from '../crud';
import { getModelTypesFromSchema } from '../plugin/getModelTypesFromSchema';
import { DatabaseNameTransformDirection, defaultColumnNameTransform, defaultTableNameTransform } from './defaultNameTransforms';
import { getPrimaryKey } from './getPrimaryKey';

/**
 * Contains mapping information between GraphQL Model type and database table
 * 
 * - typeName: Original GraphQLObjectType name
 * - tableName: Name of datase table
 * - id: Indicates the primary key field
 * - fieldMap: Object of key-value mapping between GraphQL fields and database columns.
 */
export interface ModelTableMapping {
  typeName: string
  tableName: string
  idField: string
  fieldMap?: any
}

export const getModelTableMappings = (schema: GraphQLSchema): ModelTableMapping[] => {
  const modelTypes = getModelTypesFromSchema(schema);
  const models = getUserModels(modelTypes);

  return mapModelsToTables(models);
}

export function getModelTableMapping(mappedType: GraphQLObjectType) {
  // TODO 
  // return mappings.find((m: ModelTableMapping) => m.typeName === modelName);
}

function mapModelsToTables(models: GraphQLObjectType[]): ModelTableMapping[] {
  return models.map((model: GraphQLObjectType) => {
    return {
      idField: getPrimaryKey(model).name,
      typeName: model.name,
      tableName: getTableOrColumnName(model),
      fieldMap: mapFieldsToColumns(model.getFields())
    }
  });
}

function mapFieldsToColumns(fieldMap: GraphQLFieldMap<any, any>) {
  let hasCustomMappings = false;
  const mappedFields = Object.values(fieldMap).reduce((obj: any, field: GraphQLField<any, any>) => {

    const columnName = getTableOrColumnName(field);

    if (field.name !== columnName) {
      hasCustomMappings = true;
    }

    obj[field.name] = columnName;

    return obj;
  }, {});

  if (!hasCustomMappings || !Object.keys(mappedFields).length) {
    return undefined;
  }

  return mappedFields;
}

export function getTableOrColumnName(modelOrField: GraphQLObjectType | GraphQLField<any, any>): string {
  let transformedName = transformTableOrColumnName(modelOrField);

  const dbAnnotations = parseDbAnnotations(modelOrField);

  if (dbAnnotations.name) {
    transformedName = dbAnnotations.name;
  }

  return transformedName;
}

function transformTableOrColumnName(modelOrField: GraphQLObjectType | GraphQLField<any, any>, direction: DatabaseNameTransformDirection = 'to-db'): string {
  if (modelOrField instanceof GraphQLObjectType) {
    return defaultTableNameTransform(modelOrField.name, direction);
  }

  return defaultColumnNameTransform(modelOrField.name, direction);
}