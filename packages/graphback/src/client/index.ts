import { Type } from '../ContextTypes';
import { createSampleQueries } from './targetContext';

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