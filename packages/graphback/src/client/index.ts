import { Type } from '../ContextTypes';
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
  private inputContext: Type[]

  constructor(inputContext: Type[]) {
    this.inputContext = inputContext
  }

  public generate() {
    return createSampleQueries(this.inputContext)
  }
}