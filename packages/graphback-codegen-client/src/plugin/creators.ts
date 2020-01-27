import { ModelDefinition } from "@graphback/core"
import { createClientDocumentsGQL } from './templates/gqlTemplates';


export const createDocumentsGQL = (models: ModelDefinition[]) => {
    return createClientDocumentsGQL(models);
}

export const createDocumentsGqlComplete = (models: ModelDefinition[]) => {
    return {};
}

export const createDocumentsTS = (models: ModelDefinition[]) => {
    return {};
}