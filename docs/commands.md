---
id: commands
title: CLI commands
---

## Commands

CLI offers help prompt. 
Execute `graphback` in your shell for more information

### Init
  ```bash
  graphback init <project-name>
  ```
  The command will guide you through a series of questions - choosing a template, bootstrapping model - and setup your project for you.

  ![](/img/init.gif)

  You can also provide the template name as argument which will skip the template selection part.
  ```bash
  graphback init <project-name> [template-name]
  ```
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

### Config 

  ```bash
  graphback config
  ```

  Create configuration in existing project to support Graphback resolver and schema generation.

  > **Note** When creating configuration please review if locations created for `files` integration match your project folder structure
  
## OpenAPI

 ```bash
 graphback openapi 
 ```    
 Generate GraphQL schema and resolvers based on OpenAPI spec
