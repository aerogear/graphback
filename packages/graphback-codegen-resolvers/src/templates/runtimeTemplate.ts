import { lowerCaseFirstChar, ModelDefinition } from "@graphback/core"
import { FileDefinition } from '../GeneratorModel';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { formatDocumentJS, formatDocumentTs } from './formatter';

function generatePubSubContext(models: ModelDefinition[]) {
    return models.reduce((template: string, model: ModelDefinition) => {
        const objName = model.graphqlType.name;
        const lowercasedName = lowerCaseFirstChar(objName);
        const chunk = `
        const ${lowercasedName}PubSubContext = {
            pubSub,
            publishCreate: ${model.crudOptions.subCreate},
            publishUpdate: ${model.crudOptions.subUpdate},
            publishDelete: ${model.crudOptions.subDelete}
        }`

        return template + chunk;
    }, '');
}

function generateContextObject(models: ModelDefinition[]) {
    return models.reduce((template: string, model: ModelDefinition) => {
        const objName = model.graphqlType.name;
        const lowercasedName = lowerCaseFirstChar(objName);
        const chunk = `
            ${objName}: createKnexCRUDRuntimeContext('${objName}', schema, db, ${lowercasedName}PubSubContext),
        `

        return template + chunk;
    }, '');
}


function tsTemplate(models: ModelDefinition[]) {
    return `
    import { createKnexCRUDRuntimeContext, KnexRuntimeContextConfig } from "@graphback/runtime"
    
    export const createCRUDResolversRuntimeContext = (options: KnexRuntimeContextConfig) => {
      const { schema, db, pubSub } = options;
      ${generatePubSubContext(models)}
    
      return {
        ${generateContextObject(models)}
      }
    }
    `;
}


function jsTemplate(models: ModelDefinition[]) {
    return `
    const { createKnexCRUDRuntimeContext, KnexRuntimeContextConfig } = require('@graphback/runtime');
    
    module.exports.createCRUDResolversRuntimeContext = (options) => {
        const { schema, db, pubSub } = options;
        ${generatePubSubContext(models)}
    
        return {
        ${generateContextObject(models)}
        }
    }
    `;
}

export const createRuntimeFile = (models: ModelDefinition[], config: ResolverGeneratorPluginConfig): FileDefinition => {
    let output;

    if (config.format === 'js') {
        output = jsTemplate(models);
        output = formatDocumentJS(output)
    } else {
        output = tsTemplate(models);
        output = formatDocumentTs(output)
    }

    return {
        fileName: `createContext.${config.format}`,
        output
    }
}