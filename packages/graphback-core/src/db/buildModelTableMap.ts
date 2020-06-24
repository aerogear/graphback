import { GraphQLField, GraphQLFieldMap, GraphQLObjectType } from "graphql";
import { parseMetadata } from 'graphql-metadata'
import { defaultTableNameTransform } from './defaultNameTransforms';
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

/**
 * Gets the datase column name for a GraphQL type.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
export function getTableName(model: GraphQLObjectType): string {
  let tableName = defaultTableNameTransform(model.name, 'to-db');

  const dbAnnotations = parseMetadata('db', model);
  if (dbAnnotations && dbAnnotations.name) {
    tableName = dbAnnotations.name;
  }

  return tableName;
}

/**
 * Gets the datase column name for a GraphQL field.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
export function getColumnName(field: GraphQLField<any, any>): string {
  let columnName = field.name;

  const dbAnnotations = parseMetadata('db', field);
  if (dbAnnotations && dbAnnotations.name) {
    columnName = dbAnnotations.name;
  }

  return columnName;
}

function mapFieldsToColumns(fieldMap: GraphQLFieldMap<any, any>): any {
  return Object.values(fieldMap).reduce((obj: any, field: GraphQLField<any, any>) => {
    const columnName = getColumnName(field);

    if (field.name !== columnName) {
      obj[field.name] = columnName;
    }

    //TODO: Map relationship fields

    return obj;
  }, {});
}

/**
 * Builds a database mapping model of a GraphQLObject type.
 * @param model - The GraphQL object data model representation
 *
 * @returns {ModelTableMap} A model containing the table name, any field customisations and a mapping of the primary key field.
 */
export const buildModelTableMap = (model: GraphQLObjectType): ModelTableMap => {
  const primaryKeyField = getPrimaryKey(model);
  const tableName = getTableName(model);
  const fieldMap = mapFieldsToColumns(model.getFields());

  return {
    idField: getColumnName(primaryKeyField),
    typeName: model.name,
    tableName,
    fieldMap
  }
}
