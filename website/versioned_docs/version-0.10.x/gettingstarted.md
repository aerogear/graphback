---
title: What is Graphback and how do I get started?
sidebar_label: What is Graphback
id: gettingstarted
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

The best way to start with Graphback is to choose one of the available project boilerplates 
available as part of official GraphQL CLI. 
GraphQL CLI integrates Graphback with other community libraries offering acomprehensive way to work with GraphQL APIs.
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

Graphback offers runtime layer that will create an in-memory implementation of the graphql services without code generation.
Developers can still customize the way that data is queried and cached thanks to runtime architecture.
For more information about runtime layer please follow [`runtime`](/docs/runtime) documentation

## Creating and updating your database from your data model

Graphback will create or update the database configured in `graphback.json` file, using the types defined in your data model.

```gql
type User {
  id: ID!
  name: String
}
```

When ready, run `graphback db` in your terminal to create or update your database structure.

This creates a `user` table with `id` and `name` columns. Each type must have an `id: ID!` field which creates a primary key in the database table.

If you want to customise your database structure, check out [Database Schema Migrations](./database-schema-migrations#defining-your-data-model).

You can create relationships between tables directly in your model:

```gql
type User {
  id: ID!
  name: String
  messages: [Message]
}

type Message {
  id: ID!
  title: String
  body: String
  user: User!
}
```

Run `graphback db` again to update your existing database structure with the new table.

This creates a `message` table with the `id`, `title`, `body` columns and the `userId` foreign key column that references `user.id`.

See [Database Relationships](./relationships) on the different relationships kinds and how you can customise them further.
