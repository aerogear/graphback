import { ObjectId } from 'mongodb'
/**
 * Filter mapping for scalars that exist 
 */
export type FilterableScalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphbackObjectID: ObjectId | number | string;
  GraphbackTimestamp: number;
  GraphbackTime: string;
  GraphbackDate: Date;
  GraphbackDateTime: Date;
};

// Names of the scalars that support Graphback filter type generation
export const FILTER_SUPPORTED_SCALARS = [
  'ID',
  'String',
  'Boolean',
  'Int',
  'Float',
  'GraphbackObjectID',
  'GraphbackTimestamp',
  'GraphbackTime',
  'GraphbackDate',
  'GraphbackDateTime',
  'Timestamp',
  'Time',
  'Date',
  'DateTime'
];

export type Maybe<T> = T | null;

export type BooleanInput = {
  ne?: Maybe<FilterableScalars['Boolean']>;
  eq?: Maybe<FilterableScalars['Boolean']>;
};

export type FloatInput = {
  ne?: Maybe<FilterableScalars['Float']>;
  eq?: Maybe<FilterableScalars['Float']>;
  le?: Maybe<FilterableScalars['Float']>;
  lt?: Maybe<FilterableScalars['Float']>;
  ge?: Maybe<FilterableScalars['Float']>;
  gt?: Maybe<FilterableScalars['Float']>;
  in?: Maybe<FilterableScalars['Float'][]>;
  between?: Maybe<FilterableScalars['Float'][]>;
};

export type IdInput = {
  ne?: Maybe<FilterableScalars['ID']>;
  eq?: Maybe<FilterableScalars['ID']>;
  le?: Maybe<FilterableScalars['ID']>;
  lt?: Maybe<FilterableScalars['ID']>;
  ge?: Maybe<FilterableScalars['ID']>;
  gt?: Maybe<FilterableScalars['ID']>;
  in?: Maybe<FilterableScalars['ID'][]>;
};

export type IntInput = {
  ne?: Maybe<FilterableScalars['Int']>;
  eq?: Maybe<FilterableScalars['Int']>;
  le?: Maybe<FilterableScalars['Int']>;
  lt?: Maybe<FilterableScalars['Int']>;
  ge?: Maybe<FilterableScalars['Int']>;
  gt?: Maybe<FilterableScalars['Int']>;
  in?: Maybe<FilterableScalars['Int']>;
  between?: Maybe<FilterableScalars['Int'][]>;
};

export type StringInput = {
  ne?: Maybe<FilterableScalars['String']>;
  eq?: Maybe<FilterableScalars['String']>;
  le?: Maybe<FilterableScalars['String']>;
  lt?: Maybe<FilterableScalars['String']>;
  ge?: Maybe<FilterableScalars['String']>;
  gt?: Maybe<FilterableScalars['String']>;
  in?: Maybe<FilterableScalars['String'][]>;
  contains?: Maybe<FilterableScalars['String']>;
  startsWith?: Maybe<FilterableScalars['String']>;
  endsWith?: Maybe<FilterableScalars['String']>;
};

export type GraphbackDateInput = {
  ne?: Maybe<FilterableScalars['GraphbackDate']>;
  eq?: Maybe<FilterableScalars['GraphbackDate']>;
  le?: Maybe<FilterableScalars['GraphbackDate']>;
  lt?: Maybe<FilterableScalars['GraphbackDate']>;
  ge?: Maybe<FilterableScalars['GraphbackDate']>;
  gt?: Maybe<FilterableScalars['GraphbackDate']>;
  in?: Maybe<FilterableScalars['GraphbackDate'][]>;
  between?: Maybe<FilterableScalars['GraphbackDate'][]>;
};

export type GraphbackDateTimeInput = {
  ne?: Maybe<FilterableScalars['GraphbackDateTime']>;
  eq?: Maybe<FilterableScalars['GraphbackDateTime']>;
  le?: Maybe<FilterableScalars['GraphbackDateTime']>;
  lt?: Maybe<FilterableScalars['GraphbackDateTime']>;
  ge?: Maybe<FilterableScalars['GraphbackDateTime']>;
  gt?: Maybe<FilterableScalars['GraphbackDateTime']>;
  in?: Maybe<FilterableScalars['GraphbackDateTime'][]>;
  between?: Maybe<FilterableScalars['GraphbackDateTime'][]>;
};

export type GraphbackObjectIdInput = {
  ne?: Maybe<FilterableScalars['GraphbackObjectID']>;
  eq?: Maybe<FilterableScalars['GraphbackObjectID']>;
  le?: Maybe<FilterableScalars['GraphbackObjectID']>;
  lt?: Maybe<FilterableScalars['GraphbackObjectID']>;
  ge?: Maybe<FilterableScalars['GraphbackObjectID']>;
  gt?: Maybe<FilterableScalars['GraphbackObjectID']>;
  in?: Maybe<FilterableScalars['GraphbackObjectID'][]>;
  between?: Maybe<FilterableScalars['GraphbackObjectID'][]>;
};

export type GraphbackTimeInput = {
  ne?: Maybe<FilterableScalars['GraphbackTime']>;
  eq?: Maybe<FilterableScalars['GraphbackTime']>;
  le?: Maybe<FilterableScalars['GraphbackTime']>;
  lt?: Maybe<FilterableScalars['GraphbackTime']>;
  ge?: Maybe<FilterableScalars['GraphbackTime']>;
  gt?: Maybe<FilterableScalars['GraphbackTime']>;
  in?: Maybe<FilterableScalars['GraphbackTime'][]>;
  between?: Maybe<FilterableScalars['GraphbackTime'][]>;
};

export type GraphbackTimestampInput = {
  ne?: Maybe<FilterableScalars['GraphbackTimestamp']>;
  eq?: Maybe<FilterableScalars['GraphbackTimestamp']>;
  le?: Maybe<FilterableScalars['GraphbackTimestamp']>;
  lt?: Maybe<FilterableScalars['GraphbackTimestamp']>;
  ge?: Maybe<FilterableScalars['GraphbackTimestamp']>;
  gt?: Maybe<FilterableScalars['GraphbackTimestamp']>;
  in?: Maybe<FilterableScalars['GraphbackTimestamp'][]>;
  between?: Maybe<FilterableScalars['GraphbackTimestamp'][]>;
};

type GraphbackScalar = GraphbackDateInput | GraphbackDateTimeInput | GraphbackObjectIdInput | GraphbackTimeInput | GraphbackTimestampInput;

/**
 * Query filter used in Graphback services and data providers
 */
export type QueryFilter<T = any> = {
  [P in keyof T | 'not' | 'and' | 'or']?: Maybe<IdInput | BooleanInput | StringInput | FloatInput | IntInput | GraphbackScalar | T | T[]>;
};
