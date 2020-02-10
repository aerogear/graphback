import { lowerCaseFirstChar, ModelDefinition } from "@graphback/core"
import { ResolverGeneratorPluginConfig } from '../ResolverGeneratorPlugin';
import { FileDefinition } from '../GeneratorModel';

export const createIndexFile = (models: ModelDefinition[], config: ResolverGeneratorPluginConfig): FileDefinition => {
    const codeImpl = models.reduce((resultString: string, model: ModelDefinition) => {
        const objName = model.graphqlType.name;
        const lowercasedName = lowerCaseFirstChar(objName);

        // tslint:disable-next-line: no-parameter-reassignment
        return resultString += `
        const ${lowercasedName}Type = schema.getType(${objName});
        const ${lowercasedName}DB = new PgKnexDBDataProvider(${lowercasedName}Type, db);
        const ${lowercasedName} = new CRUDService(${lowercasedName}Type, ${lowercasedName}DB, pubSub)
        `
    }, '')


    const objList = models.reduce((resultString: string, model: ModelDefinition) => {
        // tslint:disable-next-line: no-parameter-reassignment
        return resultString += `${model.graphqlType.name},`
    }, '')

    return {
        fileName: `index.${config.format}`,
        output: `
    import { PgKnexDBDataProvider, CRUDService } from '@graphback/runtime';
    import { GraphQLSchema } from 'graphql';
    
    // TODO resolve DB issues
    export const createCRUDResolversRuntimeContext = (schema: GraphQLSchema, db: any, pubSub: any) => {
        ${codeImpl}

        return {
            ${objList}
        }
    }
    `}

}