import { GraphQLObjectType } from 'graphql';
import { AdvancedFilter, GraphbackDataProvider } from './GraphbackDataProvider';
import { NoDataError } from './NoDataError';
const fetch = require('node-fetch')

export class RESTDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{

    protected baseUrl : string;

    public constructor(baseUrl:string) {
      this.baseUrl = baseUrl;
    }

    create(data: Type, context?: GraphbackContext): Promise<Type> {
        const url = this.baseUrl+`/${context!==undefined ? context : ""}`
        return fetch(url, {
        method: 'post',
        body:    JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        //throw new Error("Method not implemented.");
    }
    async update(data: Type, context?: GraphbackContext): Promise<Type> {
        const url = this.baseUrl+`/${context!==undefined ? context : ""}`+`/${data['id']}`
        const res = await fetch(url,{
            method: 'PUT',
            body:    JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            })
        const json = await res.json()
        return json;

        throw new Error("Method not implemented.");
    }
    delete(data: Type, context?: GraphbackContext): Promise<Type> {
        throw new Error("Method not implemented.");
    }
    async findAll(context?: GraphbackContext): Promise<Type[]> {
        const url = this.baseUrl+`/${context}`
        const res = await fetch(url)
        const json = await res.json()
        return json
    }
    findBy(filter: any, context?: GraphbackContext): Promise<Type[]> {
        throw new Error("Method not implemented.");
    }
    batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
        throw new Error("Method not implemented.");
    }


}
