---
id: commands
title: CLI commands
---

## Commands

CLI offers help prompt. 
Execute `graphback` in your shell for more information

### Config 

```bash
graphback config
```

Create configuration in existing project to support Graphback resolver and schema generation.

> **Note** When creating configuration please review if locations created for `folders` integration match your project folder structure

### Generate

  ```bash
  graphback generate
  ```
  Generate command will generate schema and resolvers for your GraphQL server based on your data model.

### DB
  ```bash
  graphback db
  ```
  Create databases resources based on your data model. Currently supports PostgreSQL and sqlite3.
> **Note** - *Running `graphback db` drops your database and recreates it with tables and relationships.*

## Update Database

```sh
graphback update-db
```

Updates your database schema based on your data model. Currently supported change types are:

- **TYPE_ADDED** - Adding a new GraphQL type to your model will create an associated database table.
- **FIELD_ADDED** - Adding a field to an existing model will create a new column in your database table.


## OpenAPI

 ```bash
 graphback openapi 
 ```    
 Generate GraphQL schema and resolvers based on OpenAPI spec
