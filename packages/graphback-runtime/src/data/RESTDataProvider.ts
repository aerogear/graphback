import { buildModelTableMap, getDatabaseArguments, ModelTableMap } from '@graphback/core';
import { GraphQLObjectType } from 'graphql';
import fetch from 'node-fetch';
import { GraphbackPage } from '../GraphbackPage';
import { GraphbackOrderBy } from '../GraphbackOrderBy';
import { GraphbackDataProvider, AdvancedFilter } from './GraphbackDataProvider';

/**
 * RESTDataProvider is providing the required functionality to connect with a RESTful Datasource.
 * It supports all the standard CRUD operations.
 *
 */
export class RESTDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<Type, GraphbackContext>{
  // Base url of the endpoint. When creating an RESTDataProvider instance, a string is passed into the constructor.
  protected baseUrl: string;
  protected baseType: GraphQLObjectType;
  protected headers: any;
  protected tableMap: ModelTableMap;

  //constructor
  public constructor(baseType: GraphQLObjectType, baseUrl: string, headers: any) {
    this.baseUrl = baseUrl;
    this.baseType = baseType;
    this.headers = headers;
    this.tableMap = buildModelTableMap(baseType);
  }

  /**
   * @param data - JSON object which carries the data needed for the update operation
   * @param context -passed by the resolvers
   *
   * valid url => (baseUrl+path)
   * baseUrl is defined at instance creation via the constructor. path is created from baseType name and other passed values.
   *
   */
  public async create(data: Type, context?: GraphbackContext): Promise<Type> {
    const url = `${this.baseUrl}/${this.baseType.name.toLowerCase()}/`
    const res = await fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: this.headers,
    })
    const json = await res.json();

    return json;
  }


  /**
   *
   * @param data - JSON object which carries the data needed for the update operation
   * @param context -passed by the resolvers
   *
   * valid url => (baseUrl+path)
   * baseUrl is defined at instance creation via the constructor. path is created from baseType name and other passed values.
   *
   */
  public async update(data: Type, context?: GraphbackContext): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    if (idField.value === undefined) {
      throw new Error(`Primary field value for type ${this.baseType} not provided`)
    } else {
      // eslint-disable-next-line prefer-template
      const url = this.baseUrl + `/${this.baseType.name.toLocaleLowerCase()}` + `/${data[idField.name]}`
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: this.headers,
      })
      const json = await res.json()

      return json;
    }
  }

  /**
   *
   * @param data - JSON object which carries the data needed for the update operation
   * @param context -passed by the resolvers
   *
   * valid url => (baseUrl+path)
   * baseUrl is defined at instance creation via the constructor. path is created from baseType name and other passed values.
   *
   *
   */
  public async delete(data: Type, context?: GraphbackContext): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, data);
    if (idField.value === undefined) {
      throw new Error(`Primary field value for type ${this.baseType} not provided`)
    } else {
      // eslint-disable-next-line prefer-template
      const url = this.baseUrl + `/${this.baseType.name.toLocaleLowerCase()}` + `/${data[idField.name]}`
      const res = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: this.headers,
      })
      const json = await res.json();

      return json;
    }
  }

  /**
   * TODO: Test this
   *
   * @param filter
   * @param context
   */
  public async findOne(filter: AdvancedFilter, context?: GraphbackContext): Promise<Type> {
    const { idField } = getDatabaseArguments(this.tableMap, filter);
    if (idField.value === undefined) {
      throw new Error(`Primary field value for type ${this.baseType} not provided`)
    }
    let result: Type

    const url = `${this.baseUrl}/${this.baseType.name.toLowerCase()}/${idField.value}`
    const res = await fetch(url, {
      method: 'GET',
      body: JSON.stringify(filter),
      headers: this.headers,
    })
    const json = await res.json();

    return json;
  }


  /**
   *
   * @param context -passed by the resolvers
   *
   * valid url => (baseUrl+path)
   * baseUrl is defined at instance creation via the constructor. path is created from baseType name and other passed values.
   *
   */
  public async findAll(page?: GraphbackPage): Promise<Type[]> {
    // eslint-disable-next-line prefer-template
    const url = this.baseUrl + `/${this.baseType.name.toLocaleLowerCase()}/`
    const res = await fetch(url)
    const json = await res.json()

    return json;
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
  public async findBy(filter: AdvancedFilter, orderBy?: GraphbackOrderBy, page?: GraphbackPage, context?: GraphbackContext): Promise<Type[]> {
    // eslint-disable-next-line prefer-template
    const url = this.baseUrl + `/${this.baseType.name.toLocaleLowerCase()}` + `/${filter.type}` + `/${filter.value}`
    const res = await fetch(url)
    const json = await res.json()

    return json
  }

  /**
   *
   * TODO : Need further clarification about the implementation
   *
   * @param relationField
   * @param ids
   */
  public async batchRead(relationField: string, ids: string[]): Promise<Type[][]> {
    return undefined;
  }


}
