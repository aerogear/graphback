import { ModelTableMapping } from './createModelTableMappings';

export interface DataMapping {
    id?: TableID
    table?: string
    data?: any
    fieldMap?: any
}

export interface TableID {
    name: string
    value: any
}

export const mapDataToTable = (data: any, modelMap: ModelTableMapping): DataMapping => {
    const fieldMap = modelMap.fieldMap;

    const dataMap: DataMapping = {
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

export const mapDataFromTable = (modelName: string, data: any, modelsMap: ModelTableMapping[]): any => {
    const modelMap = getModelMappingByName(modelName, modelsMap);
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

export function getModelMappingByName(name: string, mappings: ModelTableMapping[]) {
    return mappings.find((m: ModelTableMapping) => m.typeName === name);
}