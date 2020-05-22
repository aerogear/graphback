import * as escapeRegex from "escape-string-regexp";

const AND_FIELD = 'and';
const OR_FIELD = 'or';
const NOT_FIELD = 'not';

// Operators that work with simple substitution :P
const operatorMap = {
    [AND_FIELD]: '$and',
    [OR_FIELD]: '$or',
    [NOT_FIELD]: '$nor',
    ne: '$ne',
    eq: '$eq',
    le: '$lte',
    lt: '$lt',
    ge: '$gte',
    gt: '$gt',
}

type OperatorTransform = [string, any][];

type OperatorTransformFunction = (value: any) => OperatorTransform;

// A map of functions to transform mongodb incompatible operators
// Each function returns pairs of a key and an object for that key
const operatorTransform: {
    [operator: string]: OperatorTransformFunction
} = {
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

// Function to check if variable is primitive or a map
function isPrimitive(test: any): boolean {
    return ((test instanceof RegExp) || (test !== Object(test)));
};


function traverse(filter: any): any {

    Object.keys(filter).forEach((key: string) => {

            // Transform the operators to mongodb operators

            // Check if it can be directly substituted
            if (operatorMap[key]) {

                // Substitute it with the mongodb operator
                filter[operatorMap[key]] = filter[key];
                /*eslint-disable-next-line*/
                delete filter[key];

            } else if (operatorTransform[key]) {

                // For: n/between, contains, startswith, endswith
                // Transform into mongodb operator
                const transforms = operatorTransform[key](filter[key]);
                // Apply the transformed operators to filter
                /*eslint-disable-next-line*/
                delete filter[key];
                transforms.forEach((t: [string, any]) => {
                    const [operator, value] = t;
                    filter[operator] = value;
                });
            }
    });

    // If there is nesting, recursively transform all operators
    Object.keys(filter).forEach((key: string) => {
            if (['$and', '$or', '$nor'].includes(key)) {

                // If AND, OR, NOT do not have an array as their contents
                // Transform contents to an array(as mongodb only supports
                // arrays as arguments of these operators)
                if (!Array.isArray(filter[key])) {
                    filter[key] = [filter[key]];
                }
            }

            // Recursive step
            if (!isPrimitive(filter[key])) {
                filter[key] = traverse(filter[key]);
            }
    });

    return filter
}

export function buildQuery(filter: any) {
    let query = {};
    if (filter)
        {query = traverse(filter);}

    return query;
}