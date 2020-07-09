---
id: quickstart
title: Create client and server application from template
sidebar_label: Create a new app
---

You can use the Graphback CLI to generate a new GraphQL project in minutes.

Initializing with npx:

```bash
npx graphback-cli init <project-name>
```

Or by installing Graphback CLI globally:

```bash
npm install -g graphback-cli
graphback init <project-name>
```

The CLI will ask you to choose from one of three templates:

- `apollo-fullstack-ts`: Apollo GraphQL server and React client using TypeScript and PostgreSQL.
- `apollo-postgres-runtime-ts`: Apollo GraphQL Server using Graphback runtime API and PostgreSQL database.
- `apollo-mongo-runtime-ts`: Apollo GraphQL Server using Graphback runtime API and MongoDB database.


In a few seconds you should have an empty GraphQL application.

### Next steps

1. To change the default application configuration see [Graphback Config](./config.md).

2. See [Defining your Data model](./datamodel.md) for how to design your data model.

3. Once your data model is complete, run `graphback generate` from your project to generate a GraphQL schema and API.

4. Graphback provides a number of different data sources which can be configured at application runtime. See [Data Sources](../db/datasources).

5. If you are using a PostgreSQL datasource you can migrate your database to match your schema by running `graphback db`. See [Database Migrations](../db/migrations.md) for more.

6. Run your application!