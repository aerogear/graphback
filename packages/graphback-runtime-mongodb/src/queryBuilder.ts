import * as escapeRegex from "escape-string-regexp";
import { QueryFilter } from "@graphback/core";
import { FilterQuery } from 'mongodb';

type RootQueryOperator = '$and' | '$or' | '$nor' | '$not';
const operators = ['$exists', '$le', '$ge', '$gte', '$regex', '$ne', '$eq', '$lte', '$lt', '$gt', '$in'] as const;
type QueryOperator = typeof operators[number];

const operatorMap: { [key: string]: QueryOperator | RootQueryOperator } = {
  and: '$and',
  or: '$or',
  ne: '$ne',
  eq: '$eq',
  le: '$lte',
  lt: '$lt',
  ge: '$gte',
  gt: '$gt',
  in: '$in'
}

type OperatorTransform = [QueryOperator | RootQueryOperator, any][];

type OperatorTransformFunction = (value: any) => OperatorTransform;

// A map of functions to transform mongodb incompatible operators
// Each function returns pairs of a key and an object for that key
const operatorTransform: {
  [operator: string]: OperatorTransformFunction
} = {
  not: (value: any): OperatorTransform => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      value = [value];
    }

    return [
      ['$nor', value]
    ]
  },
  between: (values: [any, any]): OperatorTransform => {
    values.sort();

    return [
      [operatorMap.ge, values[0]],
      [operatorMap.le, values[1]]
    ]
  },
  nbetween: (values: [any, any]): OperatorTransform => {

    values.sort();

    return [
      [
        "$not",
        {
          [operatorMap.ge]: values[0],
          [operatorMap.le]: values[1],
        }
      ],
      [
        "$exists",
        true
      ]
    ]
  },
  contains: (value: string): OperatorTransform => {
    return [
      ['$regex', new RegExp(escapeRegex(value), 'g')]
    ]
  },
  startsWith: (value: string): OperatorTransform => {
    return [
      ['$regex', new RegExp(`^${escapeRegex(value)}`, 'g')]
    ]
  },
  endsWith: (value: string): OperatorTransform => {
    return [
      ['$regex', new RegExp(`${escapeRegex(value)}$`, 'g')]
    ]
  },
}

function isPrimitive(test: any): boolean {
  return ((test instanceof RegExp) || (test !== Object(test)));
};

function isQueryOperator(key: string): key is QueryOperator {
  return operators.includes(key as QueryOperator);
}

/**
 * Map Graphback Filter to MongoDb QueryFilter
 * 
 * @param {any} filter 
 */
function mapQueryFilterToMongoFilterQuery(filter: any): FilterQuery<any> {
  if (filter === undefined) { return undefined };

  if (Array.isArray(filter)) {
    return filter.map(mapQueryFilterToMongoFilterQuery)
  } else if (!isPrimitive(filter)) {
    return Object.keys(filter).reduce((obj: any, key: string) => {
      const propKey = operatorMap[key] || key;
      let propVal: any;
      if (isQueryOperator(propKey)) {
        propVal = filter[key];
      } else {
        propVal = mapQueryFilterToMongoFilterQuery(filter[key]);
      }

      if (operatorTransform[propKey]) {
        const transforms = operatorTransform[key](propVal);

        transforms.forEach((t: [QueryOperator, any]) => {
          const [operator, value] = t;
          propVal = value;
          obj[operator] = propVal;
        });
      } else {
        obj[propKey] = propVal;
      }

      return obj;
    }, {});
  }

  return filter;
}

/**
 * Build a MongoDB query from a Graphback filter
 * 
 * @param {QueryFilter} filter 
 */
export function buildQuery<M = any>(filter: QueryFilter<M>): FilterQuery<any> {
  return mapQueryFilterToMongoFilterQuery(filter);
}
