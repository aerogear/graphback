import { InputModelTypeContext } from '../../input/ContextTypes';
import { createSampleQueries } from './targetContext';

export interface ClientImplementation {
  name: string
  implementation: string
}

export interface Client {
  queries?: ClientImplementation[]
  mutations?: ClientImplementation[]
  fragments?: ClientImplementation[]
  subscriptions?: ClientImplementation[]
}

/**
 * Generate sample queries from the datamodel
 */
export class ClientGenerator {
  private inputContext: InputModelTypeContext[]

  constructor(inputContext: InputModelTypeContext[]) {
    this.inputContext = inputContext
  }

  public generate() {
    return createSampleQueries(this.inputContext)
  }
}
