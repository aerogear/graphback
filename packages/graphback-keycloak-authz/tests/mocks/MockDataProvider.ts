import { GraphbackDataProvider, GraphbackPage, GraphbackOrderBy } from '@graphback/runtime';

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

  async findBy(filter: any, context: GraphbackContext, orderBy?: GraphbackOrderBy, page?: GraphbackPage) {
    return []
  }

  async batchRead(relationField: string, ids: string[], filter: any, context: GraphbackContext) {
    return []
  }
}
