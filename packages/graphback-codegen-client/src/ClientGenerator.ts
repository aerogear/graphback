import { InputModelTypeContext } from '@graphback/core';
import { ClientGeneratorConfig } from './createClient';
import { createClientDocumentsGqlComplete } from './templates/gqlCompleteTemplates';
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
    if (this.config) {
      if (this.config.output === 'ts') {
        return createClientDocumentsTS(this.inputContext)
      }
      if (this.config.output === 'gql') {
        return createClientDocumentsGQL(this.inputContext)
      }
      if (this.config.output === 'gqlwithfragment') {
        return createClientDocumentsGqlComplete(this.inputContext)
      }
    }

    return createClientDocumentsTS(this.inputContext)
  }
}
