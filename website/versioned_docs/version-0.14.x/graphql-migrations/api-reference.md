---
id: api
title: API Reference
sidebar_label: API Reference
---

The `migrateDB` method takes the three arguments, listed below.
- `config`: [Knex](https://knexjs.org/#Installation-client) database configuration options.
- `schemaText`: GraphQL schema text.
- `options`: 
   - `dbSchemaName` (default: `'public'`): table schema: `<schemaName>.<tableName>`.
  - `dbTablePrefix` (default: `''`): table name prefix: `<prefix><tableName>`.
  - `dbColumnPrefix` (default: `''`): column name prefix: `<prefix><columnName>`.
  - [`updateComments`](#table-and-column-comments) (default: `false`): by default, `migrateDB` will not create or update comments on table and columns.
  - [`scalarMap`](#scalar-mapping) (default: `undefined`): Custom Scalar mapping
  - `mapListToJson` (default: `true`): Map scalar/enum lists to json column type by default.
  - [`plugins`](plugins.md) (default: `[]`): List of [graphql-migrations plugins](https://github.com/aerogear/graphback/blob/master/packages/graphql-migrations/src/plugin/MigratePlugin.ts) which describes queries that can be executed during migrations. 
  - `debug` (default: `false`): displays debugging informations and SQL queries.
  - `removeDirectivesFromSchema`: (default: `true`): Strips all directives from schema before processing.
  - [`operationFilter`](operation-filters.md): Filter out database operations that we don't want.

## Table and Column Comments

When `updateComments` is set to `true` it will automatically create/update table and column comments. 
Table / column comments are type or field description parsed from the model schema. 
The parsing logic takes care of stripping off all annotations leaving only business related comments.    

The below model:

```graphql
"""
Note business model table comment.
@model
"""
type Note {
  id: ID!
  """
  Note title.
  """
  title: String!
}
```

Execution with the `updateComments` options set to true, as shown below
```ts
....
migrateDB(dbConfig, schemaText, {
  updateComments: true
}).then((ops) => {
    console.log(ops);
});
...
```

Will create / update the `note` table comments as shown below: 

```sql
\d+
                                       List of relations
 Schema |    Name     |   Type   |   Owner    |    Size    |            Description             
--------+-------------+----------+------------+------------+------------------------------------
 public | note        | table    | postgresql | 8192 bytes | Note business model table comment.
 public | note_id_seq | sequence | postgresql | 8192 bytes | 
(2 rows)
```

```sql
\d+ note
                                                     Table "public.note"
 Column |          Type          |                     Modifiers                     | Storage  | Stats target | Description 
--------+------------------------+---------------------------------------------------+----------+--------------+-------------
 title  | character varying(255) | not null                                          | extended |              | Note title.
 id     | integer                | not null default nextval('note_id_seq'::regclass) | plain    |              | 
Indexes:
    "note_pkey" PRIMARY KEY, btree (id)
```
 
> NOTE: This options may not be supported by some database. 

## Scalar Mapping

This option is a function used to specify custom Scalar mapping.
It takes three arguments `(field: GraphQLField, fieldType: GraphQLScalarType, dbAnnotation: any)`, depending on the field type you could return the `TableColumnTypeDescriptor`: 

```ts
interface TableColumnTypeDescriptor {
  /**
   * Knex column builder function name.
   */
  type: TableColumnType | string
  /**
   * Builder function arguments.
   */
  args: any[]
}
```

For example, if you want a custom `CustomDate` scalar to be have a `date` type in the database:

```ts
import { migrateDB } from 'graphql-migrations';

const schemaText = ```
""" @model """
type Note {
  id: ID!
  title: String!
  createdAt: CustomDate
}

scalar CustomDate
```;

const dbConfig = {
   // Knex.js db configuration
};

migrateDB(dbConfig, schemaText, {
  scalarMap: (
  field: GraphQLField<any, any>,
  scalarType: GraphQLScalarType,
  annotations: any,
): TableColumnTypeDescriptor | null => {

  // custom date converted to date type
  if (scalarType.name === 'CustomDate') {
    return {
      type: 'date',
      args: []
    }
  }

  return undefined
} 
}).then((ops) => {
    console.log(ops);
});
```

A good example of this function is the [default scalar type to database column](https://github.com/aerogear/graphback/blob/master/packages/graphql-migrations/src/abstract/getColumnTypeFromScalar.ts#L18-L129) function, that Graphback uses to convert scalar types based on certain creteria.
