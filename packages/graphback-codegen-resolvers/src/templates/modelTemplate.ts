import { lowerCaseFirstChar, ModelDefinition } from "@graphback/core"
import { FileDefinition } from '../GeneratorModel';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { formatDocumentJS, formatDocumentTs } from './formatter';

function generateModels(models: ModelDefinition[]) {
    const arrayContents = models.reduce((template: string, model: ModelDefinition) => {
        const objName = model.graphqlType.name;
        const chunk = `{
    name: "${objName}",
    pubSub: {
        publishCreate: ${model.crudOptions.subCreate},
        publishUpdate: ${model.crudOptions.subUpdate},
        publishDelete: ${model.crudOptions.subDelete}
    }
},
        `

        return template + chunk;
    }, '');


    return `
    const models = [
        ${arrayContents}
    ]
    `
}



function tsTemplate(models: ModelDefinition[]) {
    return `
    export ${generateModels(models)};
    `;
}


function jsTemplate(models: ModelDefinition[]) {
    return `
    ${generateModels(models)}
    module.exports = { models };
    `;
}

/**
 * Create file containing list of the models that can be passed to any available runtime engine
 * 
 * @param models 
 * @param config 
 */
export const createModelsFile = (models: ModelDefinition[], config: ResolverGeneratorPluginConfig): FileDefinition => {
    let output;

    if (config.format === 'js') {
        output = jsTemplate(models);
        output = formatDocumentJS(output)
    } else {
        output = tsTemplate(models);
        output = formatDocumentTs(output)
    }

    return {
        fileName: `models.${config.format}`,
        output
    }
}