import { InputModelTypeContext } from '@graphback/codegen-input';
import { ClientGeneratorConfig } from './createClient';
import { createClientDocumentsGQL } from './templates/gqlTemplates';
import { createClientDocumentsTS } from './templates/tsTemplates';


/**
 * Generate ClientDocuments from the datamodel.
 * Those definitions will be the actual queries, 
 * mutations and subscriptions that can be then saved to some predefined locations.
 */
export class ClientGenerator {
  private inputContext: InputModelTypeContext[]
  private config: ClientGeneratorConfig;

  constructor(inputContext: InputModelTypeContext[], config: ClientGeneratorConfig) {
    this.inputContext = inputContext
    this.config = config;
  }

  public generate() {
    if(this.config){
      if(this.config.language === 'ts'){
        return createClientDocumentsTS(this.inputContext)
      }
      if(this.config.language === 'gql'){
        return createClientDocumentsGQL(this.inputContext)
      }
    }
    
    return createClientDocumentsTS(this.inputContext)
  }
}
