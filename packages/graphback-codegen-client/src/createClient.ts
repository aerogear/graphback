import { InputModelTypeContext } from '@graphback/codegen-input';
import { ClientDocuments } from './api/ClientDocuments';
import { ClientGenerator} from "./transformer";

/**
 * Create client side 
 * @param inputContext 
 */
export const createClient = async (inputContext: InputModelTypeContext[]): Promise<ClientDocuments> => {
    const clientGenerator = new ClientGenerator(inputContext);
    
    return clientGenerator.generate();
}