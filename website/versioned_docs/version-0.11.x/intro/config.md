---

title: Config
id: config
---

Graphback can generate source code, migrate your database or start fully functional server basing just on your GraphQL Model.
Graphback Config allows you to control and configure all those use cases for your own needs. 

The Core of Graphback will take your GraphQL Schema types annotated by `model` and perform various operations on them like:

- Code generation
- Database migrations
- InMemory GraphQL API. 

All those operations could be controlled by `crud` flags that enable or disable various data access methods in plugins and runtime. 
These include `create`, `update`, `delete`, `find` and `findAll`.

## Configuration

Graphback allows you to customize all processes by using the open configuration standard [GraphQL Config](https://graphql-config.com).

Each project needs to have a `.graphqlrc.yml` file available in the root folder. In new projects this will be added for you. For existing projects you can run `graphback config` to generate one for you - see [Adding to existing project](/docs/existingproject).

Typical configuration looks like this:

```yaml
## Schema is not used by graphback but it is required by graphql-config and can be used by other extensions
## Usually it should match the Graphback schema generator plugin
schema: ./server/src/schema/*.graphql
## Documents are not used by graphback but it is required by graphql-config and can be used by other extensions
## Usually it should match the Graphback client generator plugin
documents: ./client/src/graphql/**/*.graphql
extensions:
  # Graphback configuration
  graphback:
    ##  Location to file that is contains GraphQL schema that will be processed by Graphback
    model: ./model
    ## Global flags for CRUD methods that will be used in plugins
    crud:
      create: true
      update: true
      findAll: true
      find: true
      delete: true
      subCreate: true
      subUpdate: true
      subDelete: true
    ## List of the codegen plugins 
    plugins:
        graphback-schema:
          format: graphql
          outputPath: ./server/src/schema
        graphback-client:
          format: 'graphql'
          outputPath: ./client/src/graphql
        graphback-resolvers:
          format: ts
          outputPath: ./server/src/resolvers
```
Changing `crud` flags and running `graphback generate` will update the `schema` and `resolvers` using the latest config.

> **Note**: For subscriptions, the user needs to change the value of the respective operations to `true`. For example, changing `subDelete` to `true` won't work unless, `delete` is `true`.

### Changing CRUD configuration per type

Generator config applies the config to all the types in your schema. 
Graphback allows you to change these for any single type using annotations.

```graphql
"""
@model
@crud.create: false
"""
type User {
  ....
}
```

or to enable it:

```graphql
"""
@crud.create
"""
type User {
  ....
}
```
 
#### Available Options

All config options can be replicated by specifying the `@crud.` prefix

```
@crud.create: true
@crud.update: true
@crud.delete: true
@crud.find: true
@crud.findAll: true
@crud.subCreate: true
@crud.subUpdate: true
@crud.subDelete: true
```

You can use these annotations to have more control over individual elements. For example:

```
"""
@model
@crud.delete
"""
type Note {
  ...
}
```
will create the `delete` mutation for `Note` type.

> **Note**: Annotations override the configuration values in `.graphqlrc.yml`.

## Database Migrations

Graphback can migrate your database structure using your GraphQL schema.

> Note: Full database migration support is currently only supported for PostgreSQL databases. See [Database Compatibility](../db/dbintroduction#compatibility).

To enable migrations to work, add the `dbmigrations` extension to your `.graphqlrc.yml` file:

```yaml
...
extensions:
  # Graphback configuration
  graphback:
    ...
  ## graphql-migration config that can be also used in application
  ## Please do not connect it to shared database as Graphback will automatically 
  ## execute dlls statements that can affect other applications.
  dbmigrations:
    ## See knex.js for db specific config format
    client: pg
    connection:
      user: postgresql
      password: postgres
      database: users
      host: localhost
      port: 55432
```