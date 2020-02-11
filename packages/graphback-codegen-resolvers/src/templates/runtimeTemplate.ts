import { lowerCaseFirstChar, ModelDefinition } from "@graphback/core"
import { FileDefinition } from '../GeneratorModel';
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { formatDocumentJS, formatDocumentTs } from './formatter';

export const createIndexFile = (models: ModelDefinition[], config: ResolverGeneratorPluginConfig): FileDefinition => {
    const codeImpl = models.reduce((resultString: string, model: ModelDefinition) => {
        const objName = model.graphqlType.name;
        const lowercasedName = lowerCaseFirstChar(objName);
        // TODO Migrate to RUNTIME
        // tslint:disable-next-line: no-parameter-reassignment
        return resultString += `
        const ${lowercasedName}Type = schema.getType("${objName}");
        const ${lowercasedName}DB = new PgKnexDBDataProvider(${lowercasedName}Type, db);
        const ${objName} = new CRUDService(${lowercasedName}Type, ${lowercasedName}DB, pubSub)
        `
    }, '')


    const objList = models.reduce((resultString: string, model: ModelDefinition) => {
        // tslint:disable-next-line: no-parameter-reassignment
        return resultString += `${model.graphqlType.name},\n`
    }, '')

    let methodArgs = `schema: GraphQLSchema, db: any, pubSub: any`
    let requires = `
    import { PgKnexDBDataProvider, CRUDService } from '@graphback/runtime';
    import { GraphQLSchema } from 'graphql';
    `
    if (config.format === 'js') {
        methodArgs = `schema, db, pubSub`
        requires = `
        const { PgKnexDBDataProvider, CRUDService } = require('@graphback/runtime');
        const { GraphQLSchema } = require('graphql');
        `
    }

    let output = `
    ${requires}
    
    export const createCRUDResolversRuntimeContext = (${methodArgs}) => {
        ${codeImpl}
        // TODO subscription config
        return {
            ${objList}
        }
    }
    `;

    if (config.format === 'js') {
        output = formatDocumentJS(output)
    } else {
        output = formatDocumentTs(output)
    }

    return {
        fileName: `crudContext.${config.format}`,
        output
    }
}