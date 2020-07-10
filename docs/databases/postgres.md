---
id: postgres
title: Using PostgreSQL with Graphback
sidebar_label: PostgreSQL
---

[PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. [Graphback Knex Provider](https://www.npmjs.com/package/@graphback/runtime-knex) package provides instant integration to your PostgreSQL database, giving you a full implementation of the [CRUD API](../crud/introduction.md). 

Additionally you can use [GraphQL Migrations](../graphql-migrations/intro.md) to perform database migrations using the models defined in the GraphQL schema created by Graphback.

The provider is built on top of [Knex.js](http://knexjs.org/), a flexible SQL query builder.

## Installation

Install with npm:

```bash
npm install @graphback/runtime-knex knex
```

Install with yarn:

```bash
yarn add @graphback/runtime-knex knex
```

Running either of the two commands will install the `Graphback Knex Provider` ([`@graphback/runtime-knex`](https://www.npmjs.com/package/@graphback/runtime-knex)) and the Knex.js library ([`knex`](https://www.npmjs.com/package/knex)).

## Creating Database Connection

You'll need a running PostgreSQL instance before initializing the connection. 

:::info
If you do not have a running instance, you can use [Docker](https://www.docker.com/) to quickly spin up a PostgreSQL container by following the instructions given in [PostgreSQL Docker Image](https://hub.docker.com/_/postgres).
:::

```ts
import Knex from 'knex'

const dbConfig = {
    client: "pg",
    connection: {
      user: "postgresql",
      password: "password",
      database: "users",
      host: "localhost",
      port: 5432
    },
    pool: { min: 5, max: 30 }
};

const db = Knex(dbConfig);
```

The above code initiates a connection to a local running PostgreSQL database, using the `postgresql:password` credentials. We also create a database connection pool to a minimum of `5` and maximum of `30`. You can modify the configurations depending on your setup. 

Visit [Knex Connection Options](http://knexjs.org/#Installation-client) to learn more about configuring your database connection and the different connection options. 

# Using Knex Provider

The provider exposes a [`createKnexDbProvider`](../api/create-knexdb-provider.md) method, which can be used to create data providers for each of your data models. 

The code below shows how you can create such a data provider creator and how it can be passed to [`buildGraphbackAPI`](../api/build-graphback-api.md).

```ts
import Knex from 'knex'
import { migrateDB } from 'graphql-migrations';
import { createKnexDbProvider } from '@graphback/runtime-knex';

// highlight-start
// database configuration
const dbConfig = {
    client: "pg",
    connection: {
      user: "postgresql",
      password: "password",
      database: "users",
      host: "localhost",
      port: 5432
    },
    pool: { min: 5, max: 30 }
};

// create the connection to the database
const db = Knex(dbConfig);

// the business model
const userModel = `
 """
 @model
 """
 type User {
     id: ID!
     username: String!
 }
`;

// create the user table in database 
migrateDB(dbConfig, userModel, { }).then(() => {
  console.log("Migrated database");
});

// create the postgres data provider
const dataProviderCreator = createKnexDbProvider(db);

// highlight-end

// Use the dataProvider in buildGraphbackAPI
const { resolvers, services, contextCreator } = buildGraphbackAPI(userModel, { dataProviderCreator });
```

The highlighted code does the following:
 - Define connection configuration to the database.
 - Create a connection to PostgreSQL database using Knex.
 - Define the user model.
 - Perform the migrations using [GraphQL Migrations](../graphql-migrations/intro.md) to create the `user` table.
 - And finally, create a data provider creator by using the `createKnexDbProvider` API. 
  
The rest of the code uses [buildGraphbackAPI](../api/build-graphback-api) to create Graphback CRUD API based on the defined `userModel` model.

Visit [Data Models](../model/datamodel.md) pages to learn more about how to design your business models.
