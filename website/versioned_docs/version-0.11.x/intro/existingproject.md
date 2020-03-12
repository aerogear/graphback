---
id: version-0.11.x-existingproject
title: Adding Graphback to your Node.js project
sidebar_label: Add to existing project
original_id: existingproject
---

## Adding Graphback to existing project using Graphback CLI

Graphback CLI can be used to add code generation capabilities to your existing Node.js Server that implements GraphQL API.

```bash
npx graphback-cli config
```

Follow the on-screen instructions.

Graphback will do the following:

- Create `.graphqlrc.yml` file with default Graphback plugins
- Initialize an example model file 
- Add required packages to your `package.json` file
- Add a `dbmigrations` config to your `.graphqlrc.yml` file for PostgreSQL databases

### Next Steps

See [Defining your Data model](./datamodel.md) for how to design your data model to work with Graphback.

To change the default application configuration see [Graphback Config](./config.md).

Once your data model is complete, run `graphback generate` from your project to generate a GraphQL schema and API.

You can migrate your database to match your schema by running `graphback db`. See [Database Migrations](../db/migrations.md) for more.

## Running Graphback in existing application without code generation

Graphback offers runtime layer that will create an in-memory implementation of the Graphql services without code generation.
Developers can still customize the way that data is queried and cached thanks to runtime architecture.
For more information about runtime layer please follow [`runtime`](/docs/runtime) documentation.
