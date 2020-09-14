import Knex from 'knex';
import { QueryFilter, QueryFilterOperator } from '@graphback/core';

const knexOperators = ['=', '<>', '<=', '<', '>', '>=', 'like', 'between', 'in'] as const;
const knexMethods = ['where', 'orWhere', 'orWhereNot', 'whereNot'] as const;

type KnexQueryOperator = typeof knexOperators[number];
type KnexMethod = typeof knexMethods[number];
type KnexWhereConditionMap = [KnexQueryOperator, any];
type RootQuerySelector = 'and' | 'or' | 'not';

type KnexRootQuerySelectorBuilderFn = (builder: Knex.QueryBuilder, filter: QueryFilter | QueryFilter[], rootSelectorContext: RootQuerySelectorContext) => Knex.QueryBuilder;
type KnexQueryBuilderMapFn = (builder: Knex.QueryBuilder, filter: QueryFilter | QueryFilter[]) => Knex.QueryBuilder;

interface RootQuerySelectorContext {
  and?: boolean
  or?: boolean
  not?: boolean
}

export interface CRUDKnexQueryMapper {
  /**
   * Maps a Graphback QueryFilter to a Knex query
   * 
   * @param {QueryFilter} [filter] - input filter
   */
  buildQuery(filter?: QueryFilter): Knex.QueryBuilder;
}

const mapQueryFilterOperatorToKnexWhereCondition = (operator: QueryFilterOperator, value: any): KnexWhereConditionMap => {
  const operatorToWhereConditionMap: { [key in QueryFilterOperator]: KnexWhereConditionMap } = {
    eq: ['=', value],
    ne: ['<>', value],
    lt: ['<', value],
    le: ['<=', value],
    ge: ['>=', value],
    gt: ['>', value],
    contains: ['like', `%${value}%`],
    startsWith: ['like', `${value}%`],
    endsWith: ['like', `%${value}`],
    in: ['in', value],
    between: ['between', value]
  }

  return operatorToWhereConditionMap[operator];
}

function buildKnexMethod(rootSelectorContext: RootQuerySelectorContext): KnexMethod {
  let method = 'where';
  if (rootSelectorContext?.not) {
    method = `${method}Not`
  }

  if (rootSelectorContext?.or) {
    method = `or${method.charAt(0).toUpperCase()}${method.slice(1)}`;
  }

  return method as KnexMethod
}

const rootSelectorMapper: { [key in RootQuerySelector]: KnexRootQuerySelectorBuilderFn } = {
  and: (builder: Knex.QueryBuilder, filters: QueryFilter[], rootSelectorContext: RootQuerySelectorContext): Knex.QueryBuilder => {
    builder = builder.where((b: Knex.QueryBuilder) => {
      filters.forEach((f: QueryFilter) => mapQuery(b, f, { ...rootSelectorContext, and: true }));
    });

    return builder;
  },
  or: (builder: Knex.QueryBuilder, filters: QueryFilter[], rootSelectorContext: RootQuerySelectorContext): Knex.QueryBuilder => {
    builder = builder.where((b: Knex.QueryBuilder) => {
      filters.forEach((f: QueryFilter) => mapQuery(b, f, { ...rootSelectorContext, or: true }));
    });

    return builder;
  },
  not: (builder: Knex.QueryBuilder, filter: QueryFilter, rootSelectorContext: RootQuerySelectorContext): Knex.QueryBuilder => {
    const builderMethod = buildKnexMethod(rootSelectorContext);
    builder = builder[builderMethod]((b: Knex.QueryBuilder) => {
      builder = mapQuery(b, filter, { ...rootSelectorContext, not: true });
    });

    return builder;
  },
}

/**
 * Wraps Knex methods and pipe the QueryFilter conditions into a final Knex condition
 */
const methodBuilderMapper: { [key in KnexMethod | 'finally']: KnexQueryBuilderMapFn } = {
  where: (builder: Knex.QueryBuilder, filter: QueryFilter): Knex.QueryBuilder => {
    return builder.where((b: Knex.QueryBuilder) => b = methodBuilderMapper.finally(b, filter));
  },
  orWhere: (builder: Knex.QueryBuilder, filter: QueryFilter): Knex.QueryBuilder => {
    return builder.orWhere((b: Knex.QueryBuilder) => b = methodBuilderMapper.finally(b, filter));
  },
  whereNot: (builder: Knex.QueryBuilder, filter: QueryFilter): Knex.QueryBuilder => {
    return builder.whereNot((b: Knex.QueryBuilder) => b = methodBuilderMapper.finally(b, filter));
  },
  orWhereNot: (builder: Knex.QueryBuilder, filter: QueryFilter): Knex.QueryBuilder => {
    return builder.orWhereNot((b: Knex.QueryBuilder) => b = methodBuilderMapper.finally(b, filter));
  },
  finally: (builder: Knex.QueryBuilder, filter: QueryFilter): Knex.QueryBuilder => {
    Object.entries(filter).forEach(([col, expr]: [string, any]) => {
      Object.entries(expr).forEach(([operator, val]: [any, any]) => {
        const [mappedOperator, transformedValue] = mapQueryFilterOperatorToKnexWhereCondition(operator, val);
        builder = builder.where(col, mappedOperator, transformedValue);
      })
    });

    return builder;
  }
}

function mapQuery(builder: Knex.QueryBuilder, filter: QueryFilter, rootSelectorContext: RootQuerySelectorContext = {}): Knex.QueryBuilder {
  if (filter === undefined) { return builder };

  const mappedQuery = {
    rootFieldQueries: {} as QueryFilter,
    and: [] as QueryFilter[],
    or: [] as QueryFilter[],
    not: {} as QueryFilter
  }

  for (const key of Object.keys(filter)) {
    const rootSelector = rootSelectorMapper[key];

    if (rootSelector) {
      mappedQuery[key] = filter[key];
    } else {
      mappedQuery.rootFieldQueries[key] = filter[key];
    }
  }

  // build conditions for root fields
  if (Object.keys(mappedQuery.rootFieldQueries).length) {
    const knexMethodName = buildKnexMethod(rootSelectorContext);

    const wrappedKnexMethod = methodBuilderMapper[knexMethodName];

    if (wrappedKnexMethod) {
      builder = wrappedKnexMethod(builder, mappedQuery.rootFieldQueries);
    }
  }

  if (mappedQuery.and.length) {
    builder = rootSelectorMapper.and(builder, mappedQuery.and, rootSelectorContext);
  }
  if (mappedQuery.or.length) {
    builder = rootSelectorMapper.or(builder, mappedQuery.or, rootSelectorContext);
  }
  if (Object.keys(mappedQuery.not).length) {
    builder = rootSelectorMapper.not(builder, mappedQuery.not, rootSelectorContext);
  }

  return builder;
}

/**
 * Create an instance of a CRUD => Knex query mapper
 *  * 
 * @param {Knex} knex - The current Knex connection instance
 */
export function createKnexQueryMapper(knex: Knex): CRUDKnexQueryMapper {
  return {
    buildQuery: (filter: QueryFilter): Knex.QueryBuilder => {
      return mapQuery(knex.queryBuilder(), filter);
    }
  }
}
