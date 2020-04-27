---

title: Templates
id: templates
---
## Templates

Graphback provides users with the choice of setting up a custom environment with features with the help of templates. We plan to provide
templates with multiple use cases including various server frameworks like GraphQL server frameworks like Apollo GraphQL, GraphQL-js and others.

### [apollo-typescript-starter](https://github.com/aerogear/graphback/tree/templates-master/templates/apollo-starter-ts)
Typescript implementation of GraphQL server using apollo-express framework. 
Uses knex.js library for database access.

 
### Custom templates

Graphback supports custom templates by providing `templateUrl` parameter for init command.

```
graphback init name --templateUrl=https://github.com/aerogear/modern-appdev-workshop#master
```

> NOTE: Template needs to be located in repository `/template` folder

## Folder Structure
Each template has the following folder structure, which is created as each `graphback` command is used.

```
|-----model                         // Model - type declaration
|-----src
      |-----config                  // config for the server
      |-----resolvers
            |-----custom            // empty stubs for custom implementation
            |-----generated         // generated resolvers from datamodel
            |-----index.ts
      |-----schema
            |-----generated.schema  // generated schema
      |-----db.ts                   // db connection
      |-----index.ts
      |-----mapping.ts              // map generated content
|-----package.json
|-----Dockerfile
|-----docker-compose.yml
|-----package-lock.json
|-----tslint.json
|-----README.md
```
