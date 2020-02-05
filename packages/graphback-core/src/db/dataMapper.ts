import { ModelTableMapping } from './createModelTableMappings';

export interface DataMapping {
    table?: string
    data?: any
}

export const mapDataToTable = (modelName: string, data: any, modelsMap: ModelTableMapping[]): DataMapping => {
    const modelMap = getModelMappingByName(modelName, modelsMap);
    const fieldMap = modelMap.fieldMap;

    const mappedData = {};
    for (const key of Object.keys(data)) {
        if (data[key]) {
            const newKey = fieldMap[key];
            mappedData[newKey] = data[key];
        }
    }

    return {
        table: modelMap.tableName,
        data: mappedData
    };
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

function getModelMappingByName(name: string, mappings: ModelTableMapping[]) {
    return mappings.find((m: ModelTableMapping) => m.typeName === name);
}