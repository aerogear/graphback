import { ModelTableMap } from './buildModelTableMap';
import { type } from 'os';

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

  return {
    idField: getTableId(idField, data),
    // eslint-disable-next-line @typescript-eslint/tslint/config
    data: Object.keys(data).reduce((dataObj, key) => {
      const value = data[key]

      if (typeof value === 'object') {
        dataObj[key] = JSON.stringify(value)
      } else {
        dataObj[key] = value
      }
      
      return dataObj
    }, {})
  }
}
