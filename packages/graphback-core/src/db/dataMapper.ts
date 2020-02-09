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

export const mapDataToTable = (data: any, modelMap: ModelTableMap): ModelDataMap => {
    const fieldMap = modelMap.fieldMap;

    const dataMap: ModelDataMap = {
        table: modelMap.tableName,
        fieldMap
    }

    if (!fieldMap) {
        return dataMap;
    }

    dataMap.data = {};
    for (const key of Object.keys(data)) {
        const newKey = fieldMap[key] ? fieldMap[key] : key;
        if (data[key]) {
            dataMap.data[newKey] = data[key];
        }
    }

    return dataMap;
}

export const mapDataFromTable = (modelName: string, data: any, modelsMap: ModelTableMap[]): any => {
    const modelMap = getModelTableMap(modelName, modelsMap);
    const fieldMap = modelMap.fieldMap;

    const mappedData = {};
    for (const key of Object.keys(fieldMap)) {
        if (fieldMap[key] && data[fieldMap[key]]) {
            const newKey = fieldMap[key];
            mappedData[key] = data[newKey];
        }
    }

    return mappedData;
}

// TODO: Define interface for data
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