import Knex from 'knex';

interface OperatorMap {
  ne: '<>',
  eq: '=',
  le: '<=',
  lt: '<',
  ge: '>=',
  gt: '>',
  contains: 'like',
  startswith: 'like',
  endswith: 'like',
}

const methodMapping = {
  in: 'whereIn',
  between: 'whereBetween',
  default: 'where'
}

const notMethodMap = {
  where: 'whereNot',
  whereNull: 'whereNotNull',
  between: 'whereNotBetween',
  in: 'whereNotIn'
}

const AND_FIELD = 'and';
const OR_FIELD = 'or';
const NOT_FIELD = 'not';

function mapOperator(operator: any) {
  const operatorMap: OperatorMap = {
    ne: '<>',
    eq: '=',
    le: '<=',
    lt: '<',
    ge: '>=',
    gt: '>',
    contains: 'like',
    startswith: 'like',
    endswith: 'like'
  }

  const oprLower = operator.toLowerCase()

  if (!Object.keys(operatorMap).includes(oprLower)) {
    throw Error(`Not supported operator: ${operator}`)
  }

  return operatorMap[oprLower]
}

function builderMethod(method: string, or?: boolean, not?: boolean) {
  if (!not && methodMapping[method]) {
    method = methodMapping[method]
  } else if (not && notMethodMap[method]) {
    method = notMethodMap[method]
  }

  if (or) {
    return `or${method.charAt(0).toUpperCase()}${method.slice(1)}`
  }

  return method
}

function where(builder: Knex.QueryBuilder, filter: any, or: boolean = false, not: boolean = false) {
  if (!filter) {
    return builder
  }

  const andQueries = []
  const orQueries = []
  const notQueries = []
  for (const entry of Object.entries(filter)) {
    const col = entry[0]
    const expr = entry[1] as any

    // collect all AND condition filters
    if (col === AND_FIELD) {
      const andExpressions = Array.isArray(expr) ? expr : [expr]
      andQueries.push(...andExpressions)
      continue
    }

    // collect all OR condition filters
    if (col === OR_FIELD) {
      const orExpressions = Array.isArray(expr) ? expr : [expr]
      orQueries.push(...orExpressions)
      continue
    }

    // collect all NOT condition filters
    if (col === NOT_FIELD) {
      notQueries.push(expr)
      continue
    }

    const exprEntry = Object.entries(expr)[0]

    // eslint-disable-next-line no-null/no-null
    if (exprEntry[1] === null) {
      builder = builder[builderMethod('whereNull', or, exprEntry[0] === 'ne')](col)
    } else if (Object.keys(methodMapping).includes(exprEntry[0])) {
      builder = builder[builderMethod(exprEntry[0], or, not)](col, exprEntry[1])
    } else if (exprEntry[0] === 'contains') {
      builder = builder[builderMethod('where', or, not)](col, mapOperator(exprEntry[0]), `%${exprEntry[1]}%`)
    } else if (exprEntry[0] === 'startsWith') {
      builder = builder[builderMethod('where', or, not)](col, mapOperator(exprEntry[0]), `${exprEntry[1]}%`)
    } else if (exprEntry[0] === 'endsWith') {
      builder = builder[builderMethod('where', or, not)](col, mapOperator(exprEntry[0]), `%${exprEntry[1]}`)
    } else {
      builder = builder[builderMethod('where', or, not)](col, mapOperator(exprEntry[0]), exprEntry[1])
    }
  }

  // build AND queries
  for (const andFilter of andQueries) {
    builder = where(builder, andFilter, false, not)
  }

  // build NOT queries
  for (const notFilter of notQueries) {
    builder = where(builder, notFilter, or, true)
  }

  // build OR queries
  for (const orFilter of orQueries) {
    builder = where(builder, orFilter, true, not)
  }

  return builder
}

export function buildQuery(knex: Knex<any, any>, filter: any): Knex.QueryBuilder {
  const builder = where(knex.queryBuilder(), filter)

  return builder
}
