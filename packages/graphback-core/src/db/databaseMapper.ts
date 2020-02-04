import { GraphQLField, GraphQLFieldMap, GraphQLObjectType, GraphQLSchema } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { getUserModels } from '../crud';
import { defaultTableNameTransform } from './defaultNameTransforms';
import { getPrimaryKey } from './utils';

export interface DatabaseMap {
  modelMap: ModelMap[]
}

export interface ModelMap {
  typeName: string
  tableName: string
  idField: string
  fieldMap: any
}

export const getModelTableMappings = (schema: GraphQLSchema): DatabaseMap => {
  const models = getUserModels(schema);

  const modelMap = mapModelsToTables(models);

  return {
    modelMap
  }
}

function mapModelsToTables(models: GraphQLObjectType[]): ModelMap[] {
  return models.map((model: GraphQLObjectType) => {
    return {
      idField: getPrimaryKey(model),
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