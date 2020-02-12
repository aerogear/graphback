import { GraphQLField, GraphQLFieldMap, GraphQLObjectType } from "graphql";
import { parseDbAnnotations } from '../annotations/parser';
import { defaultColumnNameTransform, defaultTableNameTransform } from './defaultNameTransforms';
import { getPrimaryKey } from './getPrimaryKey';

/**
 * Contains mapping information between GraphQL Model type and database table
 * 
 * - typeName: Original GraphQLObjectType name
 * - tableName: Name of datase table
 * - id: Indicates the primary key field
 * - fieldMap: Object of key-value mapping between GraphQL fields and database columns.
 */
export interface ModelTableMap {
  typeName: string
  tableName: string
  idField: string
  fieldMap?: { [key: string]: string }
}

export const buildModelTableMap = (model: GraphQLObjectType): ModelTableMap => {
  const primaryKeyField = getPrimaryKey(model);
  const tableName = getTableName(model);
  const fieldMap = mapFieldsToColumns(model.getFields());

  return {
    idField: primaryKeyField.name,
    typeName: model.name,
    tableName,
    fieldMap
  }
}

function mapFieldsToColumns(fieldMap: GraphQLFieldMap<any, any>): any {
  return Object.values(fieldMap).reduce((obj: any, field: GraphQLField<any, any>) => {
    const columnName = getColumnName(field);

    if (field.name !== columnName) {
      obj[field.name] = columnName;
    }

    // TODO: Map relationship fields

    return obj;
  }, {});
}

export function getTableName(model: GraphQLObjectType): string {
  let mappedTableName = defaultTableNameTransform(model.name, 'to-db');

  const dbAnnotations = parseDbAnnotations(model);
  if (dbAnnotations.name) {
    mappedTableName = dbAnnotations.name;
  }

  return mappedTableName;
}

export function getColumnName(field: GraphQLField<any, any>): string {
  let mappedColumnName = defaultColumnNameTransform(field.name, 'to-db');

  const dbAnnotations = parseDbAnnotations(field);
  if (dbAnnotations.name) {
    mappedColumnName = dbAnnotations.name;
  }

  return mappedColumnName;
}