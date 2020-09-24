---
id: sqlite
title: Using SQLite with Graphback
sidebar_label: SQLite
---

[SQLite](https://www.sqlite.org/index.html) is an open-source, zero-configuration, self-contained, stand-alone, transaction relational database engine designed to be embedded into an application. [Graphback Knex Provider](https://www.npmjs.com/package/@graphback/runtime-knex) package provides instant integration to your SQLite database, giving you implementation of the [CRUD API](../crud/introduction.md). 

:::caution
 SQLite is a good choice for testing or development purposes. We do not recommend using it in production environment. For a production setup, you can use [PostgreSQL](postgres.md). 
::::

## Installation

Install with npm:

```bash
npm install @graphback/runtime-knex knex
```

Install with yarn:

```bash
yarn add @graphback/runtime-knex knex
```

## Configuring the Database

The following code shows how a SQLite database can be configured.

```ts
import Knex from 'knex';

const dbConfig = {
    client: "sqlite3",
    connection: {
      filename: "./users.sqlite"
    }
};

const db = Knex(dbConfig);
```

Visit [Knex Connection Options](http://knexjs.org/#Installation-client) to learn more about the different connection options. 

## Using Knex Provider

The provider exposes a [`SQLiteKnexDBDataProvider`](../api/graphback-runtime-knex/classes/_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md) API, which can be used to create a SQLite data providers for each of your data models. 

The code below shows how to create a data provider creator for a SQLite database and how to use it in [`buildGraphbackAPI`](../api/graphback/modules/_buildgraphbackapi_.md).

```ts
import Knex from 'knex';
import { migrateDB } from 'graphql-migrations';
import { ModelDefinition } from '@graphback/core';
import { SQLiteKnexDBDataProvider } from '@graphback/runtime-knex';

// highlight-start
// database configuration
const dbConfig = {
    client: "sqlite3",
    connection: {
      filename: "./users.sqlite"
    }
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

// create the SQLite data provider
const dataProviderCreator = (model: ModelDefinition) => new SQLiteKnexDBDataProvider(model, db);

// highlight-end

// Use the dataProvider in buildGraphbackAPI
const { resolvers, services, contextCreator } = buildGraphbackAPI(userModel, { dataProviderCreator });
```

The highlighted code does the following:
 - Define connection configuration to the database.
 - Create a connection to SQLite database using Knex.
 - Define the user model.
 - Perform the migrations using [GraphQL Migrations](../graphql-migrations/intro.md) to create the `user` table.
 - And finally, create a data provider creator which will be applied to our model, using the [`SQLiteKnexDBDataProvider`](../api/graphback-runtime-knex/classes/_sqliteknexdbdataprovider_.sqliteknexdbdataprovider.md) API. 
  
The rest of the code uses [`buildGraphbackAPI`](../api/graphback/modules/_buildgraphbackapi_.md) to create Graphback CRUD API based on the defined `userModel` model.

Visit [Data Models](../model/datamodel.md) to learn more about how to design your business models.
