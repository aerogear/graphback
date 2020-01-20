import { FieldDefinitionNode, ObjectTypeDefinitionNode, parse, visit, buildSchema } from 'graphql';
import { parseAnnotations } from 'graphql-metadata';
import { PubSubEngine } from 'graphql-subscriptions';
import * as Knex from 'knex'
import { CRUDService, PgKnexDBDataProvider } from '.';
import { GraphbackRuntimeContext } from './api/GraphbackRuntimeContext';

const inputVisitor = {
  ObjectTypeDefinition: (node: ObjectTypeDefinitionNode) => {
    const nodeName = node.name.value;
    if (nodeName === 'Query' || nodeName === 'Mutation' || nodeName === 'Subscription') {
      return undefined;
    }

    const annotations: any = node.description ? parseAnnotations('db', String(node.description.value)) : undefined;

    const objectType = {
      typeMap: {
        [node.name.value]: lowerCaseFirstChar(node.name.value),
      },
      fieldMap: node.fields
    };

    if (annotations && annotations.name) {
      objectType.typeMap[node.name.value] = annotations.name
    }

    return objectType;
  },
  FieldDefinition: (node: FieldDefinitionNode) => {
    const annotations: any = node.description ? parseAnnotations('db', String(node.description.value)) : undefined;

    const fieldDef = {
      [node.name.value]: lowerCaseFirstChar(node.name.value),
    };

    if (annotations && annotations.name) {
      fieldDef[node.name.value] = annotations.name
    }

    return fieldDef;
  }
}

const getFieldMapping = (fieldMappings: any[]) => {
  return Object.assign({}, ...fieldMappings.map((item: any) => {
    const fieldKey = Object.keys(item)[0];

    return {
      [fieldKey]: item[fieldKey]
    }
  }))
}

const getDatabaseTypeMappings = (schemaText: string) => {
  const astNode = parse(schemaText);

  const built = buildSchema(schemaText);

  const typeMap = visit(astNode, { leave: inputVisitor })

  const typeMappings: any[] = typeMap.definitions.filter((d: any) => d.typeMap).map((d: any) => {
    const key = Object.keys(d.typeMap)[0];

    return {
      [key]: d.typeMap[key],
      fields: getFieldMapping(d.fieldMap)
    }
  });

  const final = Object.assign({}, ...typeMappings.map((item: any) => {
    const fieldKey = Object.keys(item)[0];

    return {
      [fieldKey]: {
        name: item[fieldKey],
        fieldMap: item.fields
      }
    }
  }));

  return final;
}

/**
 * Create context object required for the graphback runtime layer 
 */
export const createKnexRuntimeContext = (db: Knex, pubSub: PubSubEngine, schemaText: string): GraphbackRuntimeContext => {
  const fieldMap = getDatabaseTypeMappings(schemaText);
  const crudDb = new PgKnexDBDataProvider(db);
  const crudService = new CRUDService(crudDb, pubSub);

  return {
    crudService,
    crudDb,
    pubSub,
    fieldMap
  };
}

// TODO: Extract to core
export function lowerCaseFirstChar(text: string) {
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
