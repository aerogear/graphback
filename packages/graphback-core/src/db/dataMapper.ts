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

export const getDatabaseArguments = (modelMap: ModelTableMap, data?: any): TableDataMap => {
  const idField = modelMap.idField;
  // Transform data if it defined
  let transFormedData: any;
  if (data) {
    const keys = Object.keys(data);
    transFormedData = {};
    for (const key of keys) {
      const value: any = data[key];
      transFormedData[key] = value && typeof value === 'object' ? JSON.stringify(value) : value;
    }
  };

  return {
    idField: getTableId(idField, data),
    data: transFormedData
  }
}
