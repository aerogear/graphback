import { GraphbackDataProvider } from './GraphbackDataProvider';
const fetch = require('node-fetch');

export class RESTDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
    // Base url of the endpoint. When creating an RESTDataProvider instance, a string is passed into the constructor.
    protected baseUrl : string;

    //constructor
    public constructor(type: GraphqlObjectType, baseUrl:string) {
      this.baseUrl = baseUrl;
    }

    /** 
     * @param data - JSON object which carries the data needed for the create operation
     * @param context - Context carries the path needed to create a valid endpoint url
     * 
     * valid url => (baseUrl+path) 
     * baseUrl is defined at instance creation via the constructor. path is passed at runtime via 
     * the context parameter.
     * 
     */
    async create(data: Type, context?: GraphbackContext): Promise<Type> {
        const url = `${this.baseUrl}/${this.type.name.toLowerCase()}`   
        const res = await fetch(url, {
            method: 'post',
            body:    JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await res.json();
        return json;
    }


    /**
     * 
     * @param data - JSON object which carries the data needed for the update operation
     * @param context -Context carries the path needed to create a valid endpoint url
     * 
     * valid url => (baseUrl+path) 
     * baseUrl is defined at instance creation via the constructor. path is passed at runtime via 
     * the context parameter.
     * 
     */
    async update(data: Type, context?: GraphbackContext): Promise<Type> {
        const url = this.baseUrl+`/${context!==undefined ? context : ""}`+`/${data['id']}`
        const res = await fetch(url,{
            method: 'PUT',
            body:    JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            })
        const json = await res.json()
        return json;
    }

    /**
     * 
     * @param data - JSON object which carries the data needed for the update operation
     * @param context - Context carries the path needed to create a valid endpoint url
     * 
     * valid url => (baseUrl+path) 
     * baseUrl is defined at instance creation via the constructor. path is passed at runtime via 
     * the context parameter.
     * 
     * 
     */
    async delete(data: Type, context?: GraphbackContext): Promise<Type> {
        const url = this.baseUrl+`/${context!==undefined ? context : ""}` 
        const res = await fetch(url,{
            method:'DELETE',
            body:JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await res.json();
        return json;
    }


    /**
     * 
     * @param context - Context carries the path needed to create a valid endpoint url
     * 
     * valid url => (baseUrl+path) 
     * baseUrl is defined at instance creation via the constructor. path is passed at runtime via 
     * the context parameter.
     * 
     */
    async findAll(context?: GraphbackContext): Promise<Type[]> {
        const url = this.baseUrl+`/${context}`
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    /**
     * 
     * @param filter - filter sends the type of filter we want to apply for the query. filter is a json object which has
     *                 filterType and filter properties. Both these properties are aggregated to create a valid url 
     * @param context - Context carries the path needed to create a valid endpoint url
     * 
     * 
     * eg : baseUrl = www.jboss.com/api
     *      path passed with context = v2/users
     *      filterType = id
     *      filter = se006575
     *      
     *      url = www.jboss.com/api/v2/users/id/se006575
     */
    async findBy(filter: any, context?: GraphbackContext): Promise<Type[]> {
        const url = this.baseUrl+`/${context!==undefined ? context : ""}`+`/${filter['filterType']}/${filter['value']}`
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    /**
     * 
     * Will implement this later. Need further clarification about the implementation
     * 
     * @param relationField 
     * @param ids 
     */
    batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
        throw new Error("Method not implemented.");
    }


}
