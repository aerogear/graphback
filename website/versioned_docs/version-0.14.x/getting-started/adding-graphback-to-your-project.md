---
id: add-to-project
title: Adding Graphback to your project
sidebar_label: Add to project
---

Graphback can easily be added to your existing Apollo GraphQL Node.js application.

Let's take a look at a very simple, minimal Apollo GraphQL server setup.

```ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
 
const app = express();
 
const schema = `
type Note {
  id: ID!
  text: String!
  archived: Boolean!
}

type Query {
  getAllNotes(): [Note]!
}
`

const noteResolvers = {
  Query: {
    getAllNotes: (parent, args, context) => {
      return context.db.getAllNotes();
    }
  }
}
 
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: noteResolvers
});
 
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});
```

In just a few short steps, Graphback can be added to this project.


### Configure your database

For this example we are going to assume that the project uses a PostgreSQL database.

To use PostgreSQL with Graphback install [Knex.js](https://knexjs.org/) with the Graphback PostgreSQL library:

```bash
npm install knex @graphback/runtime-knex
```

Once installed, initialize a Knex client using your database credentials, and create a Knex database provider creator for Graphback:

```ts
import Knex from 'knex';
import { createKnexDbProvider } from '@graphback/runtime-knex';

const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'your_app_db'
  }
})

const knexProviderCreator = createKnexDbProvider(knex);
```

For more on database support in Graphback, see [Databases](../databases/overview).

### Configure your schema

Graphback will only process GraphQL types which are annotated with `@model`. This opt-in model enables you to combine Graphback enabled types and resolvers with your existing types that do not require bootstrapping.

In this scenario, we want `Note` to be processed by Graphback.

```diff
+"""
+@model
+"""
type Note {
  id: ID!
  text: String!
  archived: Boolean!
}
```

For more advanced usage on how to configure your data models, see our [Model](../model/datamodel) guides.

### Configure Graphback

Let's install Graphback and use it in the project.

```bash
npm install graphback
```

`buildGraphbackAPI` will process your schema and generate a CRUD API with schema, resolvers, services and data sources.

```ts
import { buildGraphbackAPI } from 'graphback';

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(schema, {
  dataProviderCreator: knexDbProviderCreator
});
```

Check out the [buildGraphbackAPI](../api/build-graphback-api) for more advanced use cases like CRUD configuration and plugin extensions.

### Finish setup

Now that you have added all the Graphback code, let's bring it together and add Graphback to your Apollo GraphQL server:

```ts
import express from 'express';
import http from "http";
import { ApolloServer } from 'apollo-server-express';
// highlight-start
import { buildGraphbackAPI } from 'graphback'
import { createKnexDbProvider } from '@graphback/runtime-knex'
// highlight-end

const app = express();
 
const schema = `
// highlight-start
"""
@model
"""
// highlight-end
type Note {
  id: ID!
  text: String!
  archived: Boolean!
}

type Query {
  getAllNotes(): [Note]!
}
`

// highlight-start
// create a Knex client
const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'your_app_db'
  }
});
// highlight-end

// highlight-start
// create a Knex database provider creator
const knexDbProviderCreator = createKnexDbProvider(knex);
// highlight-end

// highlight-start
// creates a schema, CRUD resolvers, services and data providers
const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(schema, {
  dataProviderCreator: knexDbProviderCreator
});
// highlight-end

const server = new ApolloServer({
  // highlight-start
  typeDefs, // your schema as a string
  resolvers: [resolvers, noteResolvers], // merge Graphback resolvers with your own
  // highlight-next-line
  context: contextCreator // creates a context with Graphback services attached
  // highlight-end
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app)
apolloServer.installSubscriptionHandlers(httpServer)
 
app.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});
```

