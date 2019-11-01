import { InputModelTypeContext } from './ContextTypes';
import { GraphbackGeneratorConfig } from './GraphbackGeneratorConfig';

/**
 * Interface that defines set of operations for creating context object from provided input (string)
 */
export interface InputContextCreator{
    /**
     * @param text text that represents input (it can be GraphQL Schema or JSON etc.)
     * @param defaultConfig - configuration for generator that will determine what elements will be created
     */
    createModelContext(text: string, defaultConfig: GraphbackGeneratorConfig): InputModelTypeContext[] 
}