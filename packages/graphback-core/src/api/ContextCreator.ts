import { GraphbackCRUDGeneratorConfig } from '../plugin/GraphbackCRUDGeneratorConfig';
import { InputModelTypeContext } from './ContextTypes';

/**
 * Interface that defines set of operations for creating context object from provided input (string)
 */
export interface InputContextCreator{
    /**
     * @param text text that represents input (it can be GraphQL Schema or JSON etc.)
     * @param defaultConfig - configuration for generator that will determine what elements will be created
     */
    createModelContext(text: string, defaultConfig: GraphbackCRUDGeneratorConfig): InputModelTypeContext[]
}
