import { GraphQLField, GraphQLFieldMap, GraphQLObjectType, GraphQLSchema } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { getUserModels } from '../crud';
import { getModelTypesFromSchema } from '../plugin/getModelTypesFromSchema';
import { defaultTableNameTransform } from './defaultNameTransforms';
import { getPrimaryKey } from './getPrimaryKey';

export interface ModelTableMapping {
  typeName: string
  tableName: string
  id: string
  fieldMap: any
}

export const getModelTableMappings = (schema: GraphQLSchema): ModelTableMapping[] => {
  const modelTypes = getModelTypesFromSchema(schema);
  const models = getUserModels(modelTypes);

  return mapModelsToTables(models);
}

function mapModelsToTables(models: GraphQLObjectType[]): ModelTableMapping[] {
  return models.map((model: GraphQLObjectType) => {
    return {
      id: getPrimaryKey(model),
      typeName: model.name,
      tableName: getTableName(model),
      fieldMap: mapFieldsToColumns(model.getFields())
    }
  });
}

function mapFieldsToColumns(fieldMap: GraphQLFieldMap<any, any>) {
  return Object.values(fieldMap).reduce((obj: any, field: GraphQLField<any, any>) => {
    obj[field.name] = getTableName(field);

    return obj;
  }, {});
}

export function getTableName(modelOrField: GraphQLObjectType | GraphQLField<any, any>): string {
  let tableName = defaultTableNameTransform(modelOrField.name, 'to-db');
  const dbAnnotations = parseDbAnnotations(modelOrField) || {};

  if (dbAnnotations.name) {
    tableName = dbAnnotations.name;
  }

  return tableName;
}