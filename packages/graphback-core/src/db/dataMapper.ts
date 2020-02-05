import { ModelTableMapping } from './createModelTableMappings';

export interface DataMapping {
    id?: TableID
    table?: string
    data?: any
}

export interface TableID {
    name: string
    value: any
}

export const mapDataToTable = (modelName: string, data: any, modelsMap: ModelTableMapping[]): DataMapping => {
    const modelMap = getModelMappingByName(modelName, modelsMap);
    const fieldMap = modelMap.fieldMap;

    const mappedData = {};
    let mappedIdField: string;
    for (const key of Object.keys(data)) {
        const newKey = fieldMap[key];
        if (data[key]) {
            mappedData[newKey] = data[key];

            if (key === modelMap.id) {
                mappedIdField = newKey;
            }
        }
    }

    return {
        // TODO: Include ID in input object
        // id: {
        //     name: mappedIdField,
        //     value: data[modelMap.id]
        // },
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