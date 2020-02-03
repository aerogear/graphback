import { GraphQLField, GraphQLFieldMap, GraphQLObjectType, GraphQLSchema } from "graphql";
import { parseAnnotations, parseMarker } from 'graphql-metadata';
import { lowerCaseFirstChar } from '../crud';
import { getModelTypesFromSchema } from '../plugin/getModelTypesFromSchema';

export const getFieldMapping = (fieldMappings: any[]) => {
  return Object.assign({}, ...fieldMappings.map((item: any) => {
    const fieldKey = Object.keys(item)[0];

    return {
      [fieldKey]: item[fieldKey]
    }
  }))
}

export const getDatabaseTypeMappings = (schema: GraphQLSchema) => {
  const models = getUserModels(schema);

  return mapTypes(models);
}

function mapTypes(models: GraphQLObjectType[]) {
  return models.map((model: GraphQLObjectType) => {
    return {
      id: getPrimaryKey(model.getFields()),
      [model.name]: getDbName(model),
      fields: mapFields(model.getFields())
    }
  });
}

function mapFields(fieldMap: GraphQLFieldMap<any, any>) {
  return Object.values(fieldMap).reduce((obj: any, field: GraphQLField<any, any>) => {
    obj[field.name] = getDbName(field);

    return obj;
  }, {});
}

// TODO: Common annotation helper?
const parseDbAnnotations = (description?: string): any => {
  return description ? parseAnnotations('db', String(description)) : {};
}

function getPrimaryKey(fieldMap: GraphQLFieldMap<any, any>) {
  const fields = Object.values(fieldMap);
  
  // const primaryKey = fields.find(())

  return 'id';
}

function getDbName(modelOrField: GraphQLObjectType | GraphQLField<any, any>): string {
  let tableName = lowerCaseFirstChar(modelOrField.name);
  const dbAnnotations = parseDbAnnotations(modelOrField.description);

  if (dbAnnotations.name) {
    tableName = dbAnnotations.name;
  }

  return tableName;
}

function getUserModels(schema: GraphQLSchema) {
  const types = getModelTypesFromSchema(schema)

  return types.filter((modelType: GraphQLObjectType) => parseMarker('model', modelType.description))
}