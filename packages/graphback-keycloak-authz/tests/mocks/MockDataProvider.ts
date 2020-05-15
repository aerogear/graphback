import { GraphbackDataProvider, GraphbackPage, AdvancedFilter } from '@graphback/runtime';

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

  async findAll(page?: GraphbackPage, context?: GraphbackContext) {
    return []
  }

  async findBy(filter: Type | AdvancedFilter, page?: GraphbackPage, context?: GraphbackContext) {
    return []
  }

  async batchRead(relationField: string, ids: string[]) {
    return []
  }
}