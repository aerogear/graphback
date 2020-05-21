import { GraphbackDataProvider, GraphbackPage, GraphbackOrderBy } from '@graphback/runtime';

export class MockDataProvider<Type = any, GraphbackContext = any> implements GraphbackDataProvider<any, any> {
  async create(data: Type, context?: GraphbackContext) {
    return data
  }

  async update(data: Type, context?: GraphbackContext) {
    return data
  }

  async delete(data: Type, context?: GraphbackContext) {
    return data
  }

  async findOne(args: Partial<Type>, context?: GraphbackContext) {
    return args
  }

  async findBy(filter?: any, orderBy?: GraphbackOrderBy, page?: GraphbackPage, context?: GraphbackContext) {
    return []
  }

  async batchRead(relationField: string, ids: string[]) {
    return []
  }
}