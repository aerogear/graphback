import * as mquery from 'mquery';
import { Collection } from 'mongodb';

const AND_FIELD = 'and';
const OR_FIELD = 'or';
const NOT_FIELD = 'not';

type AddMethod = (builder, key: string, value: any) => any;

// Map for adding ops to a query
const add:{ [x: string]: (op: string) => AddMethod }= {
    [`${NOT_FIELD}`]: (op: string) => {
        const notMap = {
            in: 'nin',
            nin: 'in',
            between: 'nbetween',
            nbetween: 'between',
            lt: 'ge',
            ge: 'lt',
            le: 'gt',
            gt: 'le',
            eq: 'ne',
            ne: 'eq'
        };
        op = notMap[op];
        return methodMapping[op];
    },
    [`${OR_FIELD}`]: (op: string) => {
        if (!["between", "nbetween"].includes(op)) {
            op = mopify(op);
            return (builder, field, value) => {
                let q = {};
                q[field] = { op: value};
                return builder.or(q);
            }
        } else {
            return (builder: any, field: string, values: [any, any]) => {
                let q = {};
                values.sort();
                if (op === "between") {
                    q[field] = {
                        $gte: values[0],
                        $lte: values[1],
                    };
                } else if (op === "nbetween") {
                    q[field] = {
                        $lt: values[0],
                        $gt: values[1],
                    };
                }
                return builder.or(q);
            }
        }
    },
    [`${AND_FIELD}`]: (op: string) => {
        return methodMapping[op];
    }
}

// convert schema ops to mongodb ops
function mopify(op: string): string {
    switch(op) {
        case 'ge':
            return '$gte';
        case 'le':
            return '$lte';
        default:
            return `$${op}`;
    }
}

const methodMapping: { [x: string]: AddMethod } = {
    in: (builder, key: String, set: Array<any>) => {
        return builder.where(key).in(set);
    },
    nin: (builder, key: String, set: Array<any>) => {
        return builder.where(key).nin(set);
    },
    between: (builder, key: String, values: [any, any]) => {
        values.sort();
        return builder.where(key).gte(values[0]).lte(values[1]);
    },
    nbetween: (builder, key: String, values: [any, any]) => {
        values.sort();
        return builder.where(key).lt(values[0]).gt(values[1]);
    },
    lt: (builder, key: String, value: any) => {
        return builder.where(key).lt(value);
    },
    le: (builder, key: String, value: any) => {
        return builder.where(key).lte(value);
    },
    gt: (builder, key: String, value: any) => {
        return builder.where(key).gt(value);
    },
    ge: (builder, key: String, value: any) => {
        return builder.where(key).gte(value);
    },
    eq: (builder, key: String, value: any) => {
        return builder.where(key).eq(value);
    },
    ne: (builder, key: String, value: any) => {
        return builder.where(key).ne(value);
    },
};


function where(builder: any, filter: any, clause?: string) {
    if (!filter) {
        return builder;
    }

    // eslint-disable-next-line @typescript-eslint/tslint/config
    Object.entries(filter).forEach(([key, expr]) => {
        if ([AND_FIELD, OR_FIELD].includes(key)) {

            // mquery().or/and
            if (Array.isArray(expr)) {
                for(const e of expr) {
                    builder = where(builder, e, key)
                }
            }

            return;
        } else if (key === NOT_FIELD) {
            builder =  where(builder, expr, key);
        }

        // eslint-disable-next-line @typescript-eslint/tslint/config
        // eslint-disable-next-line no-shadow
        Object.entries(expr).forEach((exprEntry: [any, any]) => {
            if (Object.keys(methodMapping).includes(exprEntry[0])) {
                // This is read like Add or between/Add not eq
                const addMethod = add[clause || AND_FIELD](exprEntry[0]);
                // It adds that operator to the query
                builder = addMethod(builder, key, exprEntry[1]);
            } else if (exprEntry[0] === 'contains') {
                const addMethod = add[clause || AND_FIELD]('eq');
                builder = addMethod(builder, key, new RegExp(`${exprEntry[1]}`, 'g'))
            } else if (exprEntry[0] === 'startsWith') {
                const addMethod = add[clause || AND_FIELD]('eq');
                builder = addMethod(builder, key, new RegExp(`^${exprEntry[1]}`, 'g'))
            } else if (exprEntry[0] === 'endsWith') {
                const addMethod = add[clause || AND_FIELD]('eq');
                builder = addMethod(builder, key, new RegExp(`${exprEntry[1]}$`, 'g'))
            } else {
                throw Error(`Not supported operator: ${exprEntry[0]}`);
            }
        });
    });

    return builder;
}

export function buildQuery(collection: Collection, filter: any): any {
    const builder = where(mquery(collection), filter);

    return builder;
}
