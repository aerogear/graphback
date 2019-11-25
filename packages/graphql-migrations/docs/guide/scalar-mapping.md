# Custom Scalar Mapping

To customize the scalar mapping, you can provide a function on the `scalarMap` option that gets field information and that returns a `TableColumnDescriptor` or `null`. Here is its signature:

```ts
type ScalarMap = (
  field: GraphQLField<any, any>,
  scalarType: GraphQLScalarType | null,
  annotations: any,
) => TableColumnTypeDescriptor | null
```

Here is the `TableColumnTypeDescriptor` interface:

```ts
interface TableColumnTypeDescriptor {
  /**
   * Knex column builder function name.
   */
  type: string
  /**
   * Builder function arguments.
   */
  args: any[]
}
```

Example:

```js
migrate(config, schema, {
  scalarMap: (field, scalarType, annotations) => {
    if (scalarType && scalarType.name === 'Timestamp') {
      return {
        type: 'timestamp',
        // useTz, precision
        args: [true, undefined],
      }
    }

    if (field.name === 'id' || annotations.type === 'uuid') {
      return {
        type: 'uuid',
        args: [],
      }
    }

    return null
  }
})
```