---
title: CLI commands
id: commands
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

### Database

  ```bash
  graphback db
  ```

  This command creates a database or update an existing one based on your data model. Currently supports PostgreSQL and sqlite3.


## OpenAPI

 ```bash
 graphback openapi 
 ```    
 Generate GraphQL schema and resolvers based on OpenAPI spec
