import { Type, InterfaceType } from '../ContextTypes';
import { IGraphbackModule } from '../GraphQLBackend';
import { ResolverGenerator } from '../resolvers';
import { SchemaGenerator } from '../schema';
import { generateAppModuleTemplate, generateCommonModuleTemplate } from './outputModule/moduleTemplate';

export class ModuleGenerator {

  public generate(name: string, inputContext: Type[], database: string): IGraphbackModule {
    const gqlModule: IGraphbackModule = {
      name,
      types: inputContext,
      moduleImports: []
    };

    const schemaGenerator = new SchemaGenerator(inputContext)
    gqlModule.schema = schemaGenerator.generate()

    let interfaces = []
    inputContext.forEach((t: Type) => {
      if (t.interfaces) {
        interfaces = [...t.interfaces.map((i: InterfaceType) => i.type)];
      }
    });
    // inputContext.map((t: Type) => t.interfaces.map((i: InterfaceType) => i.type));
    gqlModule.dependentTypes = [...schemaGenerator.getRelations(name), ...interfaces];

    const resolverGenerator = new ResolverGenerator(inputContext)
    gqlModule.resolvers = resolverGenerator.generate(database)

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
