import { Type } from '../ContextTypes';
import { IGraphbackModule } from '../GraphQLBackend';
import {  generateAppModuleTemplate, generateModuleTemplate, generateCommonModuleTemplate } from './outputModule/moduleTemplate';
import { ResolverGenerator } from '../resolvers';
import { SchemaGenerator } from '../schema';

export class ModuleGenerator {

  public generate(name: string, inputContext: Type[], database: string): IGraphbackModule {
    const gqlModule: IGraphbackModule = {
      name
    };

    const schemaGenerator = new SchemaGenerator(inputContext)
    gqlModule.schema = schemaGenerator.generate()

    gqlModule.relations = schemaGenerator.getRelations(name);

    const resolverGenerator = new ResolverGenerator(inputContext)
    gqlModule.resolvers = resolverGenerator.generate(database)

    gqlModule.index = generateModuleTemplate(gqlModule.name, gqlModule.relations);

    return gqlModule;
  }

  public generateAppModule(moduleNames: string[]): IGraphbackModule {
    return {
      index: generateAppModuleTemplate(moduleNames)
    }
  }

  public generateCommonModule(): IGraphbackModule {
    return {
      name: 'Common',
      index: generateCommonModuleTemplate()
    }
  }
}
