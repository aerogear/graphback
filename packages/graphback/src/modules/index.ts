import { IGraphbackModule } from '../GraphQLBackend';
import { generateAppModule, generateModule } from './outputModule/moduleTemplate';

export class ModuleGenerator {

  public generate(): IGraphbackModule {
    return {
      index: generateModule()
    }
  }

  public generateAppModule(): IGraphbackModule {
    return {
      index: generateAppModule()
    }
  }
}
