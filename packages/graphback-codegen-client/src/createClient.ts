import { InputModelTypeContext } from '@graphback/core';
import { ClientDocuments } from './api/ClientDocuments';
import { ClientGenerator } from './ClientGenerator';


/**
 * Configuration for client generator
 */
export interface ClientGeneratorConfig {
    /**
     * Output language that will be supported
     * Our plugin supports multiple languages for simplicity
     *
     * - ts - typescript file output (backwards compatibility)
     * - gql - .graphql file
     */
    output: 'ts' | 'gql'
}


/**
 * Create client side based on inputContext
 *
 * @param inputContext
 */
export const createClient = async (inputContext: InputModelTypeContext[], config?: ClientGeneratorConfig): Promise<ClientDocuments> => {
    const clientGenerator = new ClientGenerator(inputContext, config);

    return clientGenerator.generate();
}
