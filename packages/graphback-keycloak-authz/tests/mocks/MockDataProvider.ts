/* eslint-disable */
import { GraphbackDataProvider, GraphbackPage, GraphbackOrderBy, FindByArgs, QueryFilter } from '@graphback/core';

export class MockDataProvider<Type = any> implements GraphbackDataProvider<Type> {
  async create(data: Type, selectedFields: string[]) {
    return data
  }

  async update(data: Type, selectedFields: string[]) {
    return data
  }

  async delete(data: Type, selectedFields: string[]) {
    return data
  }

  async findOne(args: Partial<Type>, selectedFields: string[]) {
    return args as Type
  }

  async findBy(args: FindByArgs, selectedFields: string[], page?: GraphbackPage, orderBy?: GraphbackOrderBy) {
    return []
  }

  async count(filter: QueryFilter) {
    return 1
  }

  async batchRead(relationField: string, ids: string[], filter: QueryFilter, selectedFields: string[]) {
    return []
  }
}
