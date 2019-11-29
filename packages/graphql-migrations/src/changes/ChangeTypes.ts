import { InputModelTypeContext } from '@graphback/core';

// TODO: Rename this
export enum ModelChangeType {
  TYPE_ADDED = 'TYPE_ADDED',
  FIELD_ADDED = 'FIELD_ADDED'
}

export interface ModelChange {
  // tslint:disable-next-line: no-reserved-keywords
  type: ModelChangeType
  path: {
    // tslint:disable-next-line: no-reserved-keywords
    type: string
    field?: string
  }
}

export interface ModelChangeGroup {
  // tslint:disable-next-line: no-reserved-keywords
  name: string
  changes: ModelChange[]
}
