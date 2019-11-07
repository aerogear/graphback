import { InputModelTypeContext } from '@graphback/core';

// TODO: Rename this
export enum GraphQLSchemaChangeTypes {
  TYPE_ADDED = 'TYPE_ADDED',
  FIELD_ADDED = 'FIELD_ADDED'
}

export interface GraphbackChange {
  // tslint:disable-next-line: no-reserved-keywords
  type: GraphQLSchemaChangeTypes
  path: {
    // tslint:disable-next-line: no-reserved-keywords
    type: string
    field?: string
  }
}

export interface GraphbackChangeGroup {
  // tslint:disable-next-line: no-reserved-keywords
  name: string
  changes: GraphbackChange[]
}
