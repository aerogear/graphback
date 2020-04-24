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
  nin: 'whereNotIn',
  between: 'whereBetween',
  nbetween: 'whereNotBetween',
  default: 'where'
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

function builderMethod(method: string, clause?: string) {
  switch (clause) {
    case 'not':
      return `${method}Not`;
    case 'or':
      return `${clause}${method.charAt(0).toUpperCase()}${method.slice(1)}`;
    default:
      return method;
  }
}

function where(builder: Knex.QueryBuilder, filter: any, clause?: string) {
  if (!filter) {
    return builder
  }

  // eslint-disable-next-line @typescript-eslint/tslint/config
  Object.entries(filter).forEach(([key, expr]) => {
    if ([AND_FIELD, OR_FIELD, NOT_FIELD].includes(key)) {
      if (Array.isArray(expr)) {
        for (const e of expr) {
          builder = where(builder, e, key)
        }
      }

      return
    }

    // eslint-disable-next-line @typescript-eslint/tslint/config
    // eslint-disable-next-line no-shadow
    Object.entries(expr).forEach((exprEntry: [any, any]) => {
      if (Object.keys(methodMapping).includes(exprEntry[0])) {
        const method = methodMapping[exprEntry[0]]
        builder = builder[method](key, exprEntry[1])
      }
      else if (exprEntry[0] === 'contains') {
        // const method = !orWhere ? 'where' : 'orWhere'
        builder = builder[builderMethod('where', clause)](key, mapOperator(exprEntry[0]), `%${exprEntry[1]}%`)
      } else if (exprEntry[0] === 'startsWith') {
        // const method = !orWhere ? 'where' : 'orWhere'
        builder = builder[builderMethod('where', clause)](key, mapOperator(exprEntry[0]), `${exprEntry[1]}%`)
      } else if (exprEntry[0] === 'endsWith') {
        // const method = !orWhere ? 'where' : 'orWhere'
        builder = builder[builderMethod('where', clause)](key, mapOperator(exprEntry[0]), `%${exprEntry[1]}`)
      }
      else {
        // const method = !orWhere ? 'where' : 'orWhere'
        builder = builder[builderMethod('where', clause)](key, mapOperator(exprEntry[0]), exprEntry[1])
      }
    })
  });

  return builder
}

export function buildQuery(knex: Knex<any, any>, filter: any): Knex.QueryBuilder {
  const builder = where(knex.queryBuilder(), filter)

  return builder
}
