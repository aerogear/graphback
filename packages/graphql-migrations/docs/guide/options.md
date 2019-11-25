# Migrate Options

`migrate` has the following arguments:

- `config`: a [knex config object](https://knexjs.org/#Installation-client) to connect to the database.
- `schema`: a GraphQL schema object. You can use `buildSchema` from `graphql`.
- `options`:
  - `dbSchemaName` (default: `'public'`): table schema: `<schemaName>.<tableName>`.
  - `dbTablePrefix` (default: `''`): table name prefix: `<prefix><tableName>`.
  - `dbColumnPrefix` (default: `''`): column name prefix: `<prefix><columnName>`.
  - `updateComments` (default: `false`): by default, `migrate` won't overwrite comments on table and columns. This forces comment overwritting.
  - `transformTableName` (default: transform to `snake_case`): transform function for table names.
  - `transformColumnName` (default: transform to `snake_case`): transform function for column names.
  - `scalarMap` (default: `null`): Custom Scalar mapping
  - `mapListToJson` (default: `true`): Map scalar/enum lists to json column type by default.
  - `plugins` (default: `[]`): List of graphql-migrations plugins
  - `debug` (default: `false`): displays debugging informations and SQL queries.