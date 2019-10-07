import { GraphbackDataProvider } from './GraphbackDataProvider';


/**
 * In Mem data provider used for testing capabilities
 */
// TODO
// tslint:disable-next-line: no-any
export class InMemoryDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
    public deleteObject(name: string, id: string, context?: GraphbackContext): Promise<string> {
        throw new Error("Method not implemented.");
    }
 
    public createObject(name: string, data: Type, context?: GraphbackContext): Promise<Type> {
        throw new Error("Method not implemented.");
    }

    public updateObject(name: string, id: string, data: Type, context?: GraphbackContext): Promise<Type> {
        throw new Error("Method not implemented.");
    }

    public readObject(name: string, id: string, context?: GraphbackContext): Promise<Type> {
        throw new Error("Method not implemented.");
    }

    public findAll(name: string, context?: GraphbackContext): Promise<Type[]> {
        throw new Error("Method not implemented.");
    }
    
    // tslint:disable-next-line: no-any
    public findBy(name: string, filter: any, context?: GraphbackContext): Promise<Type[]> {
        throw new Error("Method not implemented.");
    }

}