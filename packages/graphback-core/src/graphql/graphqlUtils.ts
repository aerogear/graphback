import { GraphbackOperationType, InputModelTypeContext, INTERFACE_TYPE_DEFINITION, OBJECT_TYPE_DEFINITION, OBJECT_TYPE_EXTENSION, SCALAR_TYPE_DEFINITION } from '../api';

export const getFieldName = (typeName: string, action: GraphbackOperationType, plural: string = ''): string => {
  const upperCasedType = typeName.charAt(0).toUpperCase() + typeName.substr(1);

  return `${action}${upperCasedType}${plural}`
}

export const getTableName = (typeName: string): string => {
  return typeName.toLowerCase()
}

export const filterObjectTypes = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_DEFINITION);

export const filterScalars = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === SCALAR_TYPE_DEFINITION);

export const filterInterfaceTypes = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === INTERFACE_TYPE_DEFINITION);

export const filterObjectExtensions = (types: InputModelTypeContext[]) => types.filter((t: InputModelTypeContext) => t.kind === OBJECT_TYPE_EXTENSION);


