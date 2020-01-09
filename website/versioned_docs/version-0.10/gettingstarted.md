---
id: version-0.10-gettingstarted
title: What is Graphback and how do I get started?
sidebar_label: What is Graphback
original_id: gettingstarted
---

Graphback is a package and CLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch by giving developers:

- Generated GraphQL Schema containing Queries and Mutations for general data access
- Underlying resolvers to fetch data in performant way
- Support for subscriptions and live updates on the data
- Relational support
- Database migrations for relational database of your choice using Knex.js framework
- Extensible runtime layer for composing data services used in generated resolvers
- Generated client side queries 
- Integration with other community libraries like graphql-config and graphql-code-generator
- Component based approach allows to support different programimng languages.
Graphback currently supports:
    - Typescript
    - JavaScript
    - GQL (for Schema)

## Multiple ways of getting started

Graphback offers many ways of starting

- Using Graphback with most popular GraphQL boilerplates with GraphQL CLI
- Adding Graphback to your existing project
- Initializing Graphback in your code without code generation
- Migrating your existing RESTfull api to GraphQL 

### Start new project using Graphback and GraphQL CLI

Best way to start with Graphback is to choose one of the available project boilerplates 
available as part of official GraphQL CLI. 
GraphQL CLI integrates Graphback with other community libraries offering compehensive 
way to work with GraphQL API's.
You can use any of the available GraphQL-CLI templates to bootstrap Graphback enabled project. 

With yarn:
```
yarn global add graphql-cli@canary
```

With npm:
```
npm install -g graphql-cli@canary
```

Execute init command to create project from scratch

```
graphql init
```

Please answer all questions based on your preference.
After project is created please follow project README file that might differ depending on
the template that was chosen on startup.

GraphQL CLI offers various commands to interact with your project that work with the Graphback package.
Graphback specific commands are available by executing `graphql generate` 
 
## Adding Graphback to existing project using Graphback CLI

Graphback CLI can be used to add code generation capabilities to your existing applications

```bash
npm i -g graphback-cli
graphback config <project-name>
```
Follow the onscreen instructions.

You can use Graphback with either a SQLite (for prototyping) or PostgreSQL (for production) databases.

If you use SQLite, you don't need to use Docker.

## Running Graphback in existing application without code generation

Graphback offers runtime layer that will create in memory implementation of the graphql services without code generation.
Developers can still customize the way that data is queried and cached thanks to runtime architecture.
For more information about runtime layer please follow [`runtime`](/docs/runtime) documentation
