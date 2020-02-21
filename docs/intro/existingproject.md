---
id: existingproject
title: Adding Graphback to your Node.js project
sidebar_label: Add to Project
---

## Adding Graphback to existing project using Graphback CLI

Graphback CLI can be used to add code generation capabilities to your existing Node.js Server that implements GraphQL API.

```bash
npx graphback-cli config
```
Follow the on-screen instructions.

You can use Graphback with either a SQLite (for prototyping) or PostgreSQL (for production) databases.
Config command will:
- Create `graphqlrc.yml` file with default graphback plugins
- Initialize example model file 
- Add required packages to your package.json file
- Provide database migration configuration for database running on local machine

> NOTE: If you use SQLite, you don't need to use Docker 

## Running Graphback in existing application without code generation

Graphback offers runtime layer that will create an in-memory implementation of the graphql services without code generation.
Developers can still customize the way that data is queried and cached thanks to runtime architecture.
For more information about runtime layer please follow [`runtime`](/docs/runtime) documentation.

## Creating and updating your database from your data model

Graphback will create or update the database configured in `graphqlrc.yml` file, using the types defined in your data model.

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

See [Database Relationships](../crud/relationships.md) on the different relationships kinds and how you can customise them further.
