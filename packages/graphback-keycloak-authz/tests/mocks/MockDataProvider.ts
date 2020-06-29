/* eslint-disable */
import { GraphbackDataProvider, GraphbackPage, GraphbackOrderBy } from '@graphback/core';

export class MockDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<any, any> {
  async create(data: Type, context: GraphbackContext) {
    return data
  }

  async update(data: Type, context: GraphbackContext) {
    return data
  }

  async delete(data: Type, context: GraphbackContext) {
    return data
  }

  async findOne(args: Partial<Type>, context: GraphbackContext) {
    return args
  }

  async findBy(filter: any, context: GraphbackContext, page?: GraphbackPage, orderBy?: GraphbackOrderBy) {
    return []
  }

  async count(filter: any) {
    return 1
  }

  async batchRead(relationField: string, ids: string[], filter: any, context: GraphbackContext) {
    return []
  }
}
