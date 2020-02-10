import { getModelTableMap, ModelTableMap } from './modelTableMapper';

export interface ModelDataMap {
    id?: TableID
    table?: string
    data?: any
    fieldMap?: any
}

export interface TableID {
    field: string
    value: any
}

export const getUpdateArgs = (idField: string, data: any, fieldMap?: any): ModelDataMap => {
    const mappedData: ModelDataMap = {
        id: {
            field: idField,
            value: data[idField]
        },
        data
    }

    // tslint:disable-next-line: no-dynamic-delete
    delete mappedData.data[idField];

    return mappedData;
}