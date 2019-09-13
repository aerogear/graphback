import { Type } from '../ContextTypes';
import { IGraphbackModule } from '../GraphQLBackend';
import {  generateAppModuleTemplate, generateModule, generateCommonModuleTemplate } from './outputModule/moduleTemplate';
import { ResolverGenerator } from '../resolvers';
import { SchemaGenerator } from '../schema';

export class ModuleGenerator {

  public generate(name: string, inputContext: Type[], database: string): IGraphbackModule {
    const gqlModule: IGraphbackModule = {
      name
    };

    const schemaGenerator = new SchemaGenerator(inputContext)
    gqlModule.schema = schemaGenerator.generate()

    const resolverGenerator = new ResolverGenerator(inputContext)
    gqlModule.resolvers = resolverGenerator.generate(database)

    gqlModule.index = generateModule(gqlModule.name)

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
