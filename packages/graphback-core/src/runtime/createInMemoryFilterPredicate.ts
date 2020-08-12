import { convertType, isDateObject } from '../utils/convertType';
import { QueryFilter } from './QueryFilter';

type PredicateFn = (input: any) => boolean;
type InputType = number | string | boolean | Date;

interface IPredicate {
  eq(filterValue: InputType): PredicateFn
  ne(filterValue: InputType): PredicateFn
  gt(filterValue: InputType): PredicateFn
  ge(filterValue: InputType): PredicateFn
  le(filterValue: InputType): PredicateFn
  lt(filterValue: InputType): PredicateFn
  in(filterValue: InputType[]): PredicateFn
  between(filterValue: InputType[]): PredicateFn
  contains(filterValue: InputType): PredicateFn
  startsWith(filterValue: string): PredicateFn
  endsWith(filterValue: string): PredicateFn
}

const predicateMap: IPredicate = {
  eq: (filterValue: InputType) => (fieldValue: InputType) => {
    const parsedFieldValue = convertType(fieldValue, typeof filterValue);
    const parsedFilterValue = convertType(filterValue, typeof parsedFieldValue)

    return parsedFieldValue === parsedFilterValue;
  },
  ne: (filterValue: InputType) => (fieldValue: InputType) => {
    const parsedFieldValue = convertType(fieldValue, typeof filterValue);
    const parsedFilterValue = convertType(filterValue, typeof parsedFieldValue)

    return parsedFilterValue !== parsedFieldValue;
  },
  gt: (filterValue: InputType) => (fieldValue: InputType) => {
    const parsedFieldValue = convertType(fieldValue, typeof filterValue);
    const parsedFilterValue = convertType(filterValue, typeof parsedFieldValue)

    return parsedFieldValue > parsedFilterValue;
  },
  ge: (filterValue: InputType) => (fieldValue: InputType) => {
    const parsedFieldValue = convertType(fieldValue, typeof filterValue);
    const parsedFilterValue = convertType(filterValue, typeof parsedFieldValue)

    return parsedFieldValue >= parsedFilterValue;
  },
  le: (filterValue: InputType) => (fieldValue: InputType) => {
    const parsedFieldValue = convertType(fieldValue, typeof filterValue);
    const parsedFilterValue = convertType(filterValue, typeof parsedFieldValue)

    return parsedFieldValue <= parsedFilterValue;
  },
  lt: (filterValue: InputType) => (fieldValue: InputType) => {
    const parsedFieldValue = convertType(fieldValue, typeof filterValue);
    const parsedFilterValue = convertType(filterValue, typeof parsedFieldValue)

    return parsedFieldValue < parsedFilterValue;
  },
  in: (filterValue: InputType[]) => (fieldValue: InputType) => {
    return filterValue.map((f: InputType) => f?.toString()).includes(fieldValue?.toString());
  },
  between: ([fromVal, toVal]: InputType[]) => (fieldValue: InputType) => {
    if (isDateObject(fieldValue)) {
      const fieldValDate = convertType(fieldValue, typeof fieldValue)
      const fromValDate = convertType(fromVal, typeof fieldValue)
      const toValDate = convertType(toVal, typeof fieldValue)

      return fieldValDate >= fromValDate && fieldValDate <= toValDate;
    }

    const parsedFieldValue = Number(fieldValue)

    return parsedFieldValue >= Number(fromVal) && parsedFieldValue <= Number(toVal);
  },
  contains: (filterValue: InputType = '') => (fieldValue: InputType = '') => {
    return fieldValue?.toString().includes(filterValue?.toString());
  },
  startsWith: (filterValue: string = '') => (fieldValue: string = '') => {
    return fieldValue?.toString().startsWith(filterValue?.toString());
  },
  endsWith: (filterValue: string = '') => (fieldValue: string = '') => {
    return fieldValue?.toString().endsWith(filterValue?.toString());
  }
}

/**
 * Dynamically creates a subscription filter predicate using the filter object values
 * 
 * @param {QueryFilter} filter - subscription filter input object
 */
export function createInMemoryFilterPredicate<T = any>(filter: QueryFilter): (input: Partial<T>) => boolean {
  const andFilter = filter.and;
  const orFilter = filter.or;
  const notFilter = filter.not;

  const filterFields = Object.keys(filter).filter((key: string) => !['and', 'or', 'not'].includes(key));

  return (payload: Partial<T>): boolean => {
    let predicateResult = true;
    for (const fieldName of filterFields) {
      // skip these filter expressions
      if (['and', 'or', 'not'].includes(fieldName)) {
        continue;
      }

      const fieldFilter = filter[fieldName];

      for (const [expr, exprVal] of Object.entries(fieldFilter)) {
        const predicateFn: PredicateFn = predicateMap[expr](exprVal)

        if (!predicateFn(payload[fieldName])) {
          predicateResult = false;
          break;
        }
      }
    }

    if (orFilter) {
      const orPredicateResult = getOrPredicateResult<T>(orFilter, payload);
      predicateResult = predicateResult || orPredicateResult;
      if (!predicateResult) {
        return false;
      }
    }
    if (andFilter) {
      const andPredicateResult = getAndPredicateResult(andFilter, payload);
      predicateResult = predicateResult && andPredicateResult;
    }
    if (notFilter) {
      const notPredicateResult = createInMemoryFilterPredicate<T>(notFilter)(payload);
      predicateResult = predicateResult && !notPredicateResult;
    }

    return predicateResult;
  }
}

/**
 * Get the predicate result of an `and` filter expression
 * 
 * @param {QueryFilter|QueryFilter[]} and - And filter
 * @param {Partial<T>} payload - Subscription payload
 */
function getAndPredicateResult<T>(and: QueryFilter | QueryFilter[], payload: Partial<T>): boolean {
  let andResult = true;

  if (Array.isArray(and)) {
    for (const andItem of and) {
      andResult = createInMemoryFilterPredicate<T>(andItem)(payload);

      if (!andResult) {
        break;
      }
    }
  } else {
    andResult = createInMemoryFilterPredicate<T>(and)(payload);
  }

  return andResult;
}

/**
 * Get the boolean result of an `or` filter expression
 * 
 * @param {QueryFilter|QueryFilter[]} or - Or query filter 
 * @param {Partial<T>} payload - Subscription payload
 */
function getOrPredicateResult<T>(or: QueryFilter | QueryFilter[], payload: Partial<T>): boolean {
  let orResult = true;
  if (Array.isArray(or)) {
    for (const orItem of or) {
      orResult = createInMemoryFilterPredicate<T>(orItem)(payload);

      if (orResult) {
        break;
      }
    }
  } else {
    orResult = createInMemoryFilterPredicate<T>(or)(payload);
  }

  return orResult;
}