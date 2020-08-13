import { ObjectId } from 'mongodb'

/**
 * Filter mapping for scalars that exit
 */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphbackJSON: any;
  GraphbackJSONObject: { [key: string]: any };
  GraphbackObjectID: ObjectId | string;
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
  'GraphbackDateTime'
];

export type Maybe<T> = T | null;

export type BooleanInput = {
  ne?: Maybe<Scalars['Boolean']>;
  eq?: Maybe<Scalars['Boolean']>;
};

export type FloatInput = {
  ne?: Maybe<Scalars['Float']>;
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  in?: Maybe<Scalars['Float'][]>;
  between?: Maybe<Scalars['Float'][]>;
};

export type IdInput = {
  ne?: Maybe<Scalars['ID']>;
  eq?: Maybe<Scalars['ID']>;
  le?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  ge?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  in?: Maybe<Scalars['ID'][]>;
};

export type IntInput = {
  ne?: Maybe<Scalars['Int']>;
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  in?: Maybe<Scalars['Int']>;
  between?: Maybe<Scalars['Int'][]>;
};

export type StringInput = {
  ne?: Maybe<Scalars['String']>;
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  in?: Maybe<Scalars['String'][]>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type GraphbackDateInput = {
  ne?: Maybe<Scalars['GraphbackDate']>;
  eq?: Maybe<Scalars['GraphbackDate']>;
  le?: Maybe<Scalars['GraphbackDate']>;
  lt?: Maybe<Scalars['GraphbackDate']>;
  ge?: Maybe<Scalars['GraphbackDate']>;
  gt?: Maybe<Scalars['GraphbackDate']>;
  in?: Maybe<Scalars['GraphbackDate'][]>;
  between?: Maybe<Scalars['GraphbackDate'][]>;
};

export type GraphbackDateTimeInput = {
  ne?: Maybe<Scalars['GraphbackDateTime']>;
  eq?: Maybe<Scalars['GraphbackDateTime']>;
  le?: Maybe<Scalars['GraphbackDateTime']>;
  lt?: Maybe<Scalars['GraphbackDateTime']>;
  ge?: Maybe<Scalars['GraphbackDateTime']>;
  gt?: Maybe<Scalars['GraphbackDateTime']>;
  in?: Maybe<Scalars['GraphbackDateTime'][]>;
  between?: Maybe<Scalars['GraphbackDateTime'][]>;
};

export type GraphbackObjectIdInput = {
  ne?: Maybe<Scalars['GraphbackObjectID']>;
  eq?: Maybe<Scalars['GraphbackObjectID']>;
  le?: Maybe<Scalars['GraphbackObjectID']>;
  lt?: Maybe<Scalars['GraphbackObjectID']>;
  ge?: Maybe<Scalars['GraphbackObjectID']>;
  gt?: Maybe<Scalars['GraphbackObjectID']>;
  in?: Maybe<Scalars['GraphbackObjectID'][]>;
  between?: Maybe<Scalars['GraphbackObjectID'][]>;
};

export type GraphbackTimeInput = {
  ne?: Maybe<Scalars['GraphbackTime']>;
  eq?: Maybe<Scalars['GraphbackTime']>;
  le?: Maybe<Scalars['GraphbackTime']>;
  lt?: Maybe<Scalars['GraphbackTime']>;
  ge?: Maybe<Scalars['GraphbackTime']>;
  gt?: Maybe<Scalars['GraphbackTime']>;
  in?: Maybe<Scalars['GraphbackTime'][]>;
  between?: Maybe<Scalars['GraphbackTime'][]>;
};

export type GraphbackTimestampInput = {
  ne?: Maybe<Scalars['GraphbackTimestamp']>;
  eq?: Maybe<Scalars['GraphbackTimestamp']>;
  le?: Maybe<Scalars['GraphbackTimestamp']>;
  lt?: Maybe<Scalars['GraphbackTimestamp']>;
  ge?: Maybe<Scalars['GraphbackTimestamp']>;
  gt?: Maybe<Scalars['GraphbackTimestamp']>;
  in?: Maybe<Scalars['GraphbackTimestamp'][]>;
  between?: Maybe<Scalars['GraphbackTimestamp'][]>;
};

type GraphbackScalarInput = GraphbackDateInput | GraphbackDateTimeInput | GraphbackObjectIdInput | GraphbackTimeInput | GraphbackTimestampInput;

/**
 * Query filter used in Graphback services and data providers
 */
export type QueryFilter<T = any> = {
  [P in keyof T | 'and' | 'or' | 'not']?: Maybe<IdInput | BooleanInput | StringInput | FloatInput | IntInput | GraphbackScalarInput | T | T[]>;
};
