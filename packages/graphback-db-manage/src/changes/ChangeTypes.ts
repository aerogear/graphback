import { InputModelTypeContext } from '@graphback/core';

// TODO: Rename this
export enum ModelChangeType {
  TYPE_ADDED = 'TYPE_ADDED',
  FIELD_ADDED = 'FIELD_ADDED'
}

export interface GraphbackChange {
  // tslint:disable-next-line: no-reserved-keywords
  type: ModelChangeType
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
