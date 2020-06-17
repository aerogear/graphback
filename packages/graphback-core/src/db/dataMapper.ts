import { ModelTableMap } from './buildModelTableMap';

export interface TableDataMap {
  idField?: TableID
  table?: string
  data?: any
  fieldMap?: any
}

export interface TableID {
  name: string
  value?: any
}

function getTableId(idField: string, data: any): TableID {
  if (!idField) { return undefined };

  let value: any;
  if (data && data[idField]) {
    value = data[idField];
  }

  return {
    name: idField,
    value
  }
}

export const getDatabaseArguments = (modelMap: ModelTableMap, data?: any, fieldMap?: any): TableDataMap => {
  const idField = modelMap.idField;

  //TODO: Map fields to custom db names

  return {
    idField: getTableId(idField, data),
    data
  }
}