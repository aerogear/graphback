import { GraphQLObjectType } from 'graphql';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';
const fetch = require('node-fetch')

export class RESTDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

    protected baseUrl : string;

    create(data: Type, context?: GraphbackContext): Promise<Type> {

        throw new Error("Method not implemented.");
    }
    update(data: Type, context?: GraphbackContext): Promise<Type> {
        throw new Error("Method not implemented.");
    }
    delete(data: Type, context?: GraphbackContext): Promise<Type> {
        throw new Error("Method not implemented.");
    }
    async findAll(context?: GraphbackContext): Promise<Type[]> {
        const res = await fetch('https://crudcrud.com/api/2e1c242b1f6943a9b2b16455b79e04ab/unicorns')
        const json = await res.json()
        console.log(json)
        return json
    }
    findBy(filter: any, context?: GraphbackContext): Promise<Type[]> {
        throw new Error("Method not implemented.");
    }
    batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
        throw new Error("Method not implemented.");
    }


}

let source = new RESTDataProvider()
source.findAll()