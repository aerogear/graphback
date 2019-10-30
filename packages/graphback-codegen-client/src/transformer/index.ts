import { InputModelTypeContext } from '@graphback/codegen-input';
import {  createClientDocuments } from './targetContext';

/**
 * Generate ClientDocuments from the datamodel.
 * Those definitions will be the actual queries, 
 * mutations and subscriptions that can be then saved to some predefined locations.
 */
export class ClientGenerator {
  private inputContext: InputModelTypeContext[]

  constructor(inputContext: InputModelTypeContext[]) {
    this.inputContext = inputContext
  }

  public generate() {
    return createClientDocuments(this.inputContext)
  }
}
