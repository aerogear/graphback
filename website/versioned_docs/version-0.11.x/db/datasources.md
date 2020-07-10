---

title: Data Sources
id: datasources
---

Your Graphback enabled API can work with a variety of databases. Our runtime libraries provide datasources for the following databases:

- [PostgreSQL](#postgresql)
- [MongoDB](#mongodb)
- [SQLite](#sqlite)

Each of these datasources give you a database-specific implementation of our [CRUD Specification](../crud/crudspec). For more on how these data sources work see [CRUD Runtime Abstraction](../crud/crudruntime).

## PostgreSQL

### Installation

Install with npm:

```
npm install @graphback/runtime-knex
```

You will also need to have [Knex.js](http://knexjs.org/) installed:

```
npm install knex
```

### Adding to your project

The `createKnexPGCRUDRuntimeServices` method creates a CRUD service and PostgreSQL data provider for each of your models.  

`createKnexPGCRUDRuntimeServices` has the following arguments:

- `models: GraphbackPubSubModel[]`: List of your Graphback models and their individual configurations. This is generated with your resolvers.
- `schema: GraphQLSchema`: Your GraphQL schema.
- `db: Knex`: Knex database instance.
- `pubSub: PubSubEngine`: PubSub instance.

You can then attach these runtime services to your server context:

```ts
import { createKnexPGCRUDRuntimeServices } from '@graphback/runtime-knex';
import { buildSchema } from 'graphql';
import Knex from 'knex';
import { PubSub } from 'graphql-subscriptions';
import { models } from './resolvers/models';
import resolvers from './resolvers/resolvers';

const schema = buildSchema(...);

const db = Knex(...);

const pubSub = new PubSub();

// create runtime services for Postgres
const context = createKnexPGCRUDRuntimeServices(models, schema, db, pubSub);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
});
```

## MongoDB

### Installation

Install with npm:

```
npm install @graphback/runtime-mongo
```

You will also need to have a [MongoDB Node.js Driver](https://github.com/mongodb/node-mongodb-native) installed:

```bash
npm install mongodb
```

### Adding to your project

The `createMongoCRUDRuntimeContext` method creates a CRUD service and MongoDB data provider for each of your models.  

`createMongoCRUDRuntimeContext` has the following arguments:

- `models: GraphbackPubSubModel[]`: List of your Graphback models and their individual configurations. This is generated with your resolvers.
- `schema: GraphQLSchema`: Your GraphQL schema.
- `db: Db`: Mongo Database instance.
- `pubSub: PubSubEngine`: PubSub instance.

You can then attach these runtime services to your server context:

```ts
import { createMongoCRUDRuntimeContext } from '@graphback/runtime-mongo';
import { buildSchema } from 'graphql';
import { Db } from "mongodb";
import { PubSub } from 'graphql-subscriptions';
import { models } from './resolvers/models';
import resolvers from './resolvers/resolvers';

const schema = buildSchema(...);

// Example Mongo Connection URL
const url = 'mongodb://mongodb:mongo@localhost:27017/admin';

const mongoClient = await MongoClient.connect(url);
// get db instance
const db = mongoClient.db('users');

const pubSub = new PubSub();

// create runtime services for MongoDB
const context = createMongoCRUDRuntimeContext(models, schema, db, pubSub);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
});
```

## SQLite

### Installation

Install with npm:

```
npm install @graphback/runtime-knex
```

You will also need to have [Knex.js](http://knexjs.org/) installed:

```
npm install knex
```

### Adding to your project

The `createKnexCRUDRuntimeServices` method creates a CRUD service and PostgreSQL data provider for each of your models.  

`createKnexCRUDRuntimeServices` has the following arguments:

- `models: GraphbackPubSubModel[]`: List of your Graphback models and their individual configurations. This is generated with your resolvers.
- `schema: GraphQLSchema`: Your GraphQL schema.
- `db: Knex`: Knex database instance.
- `pubSub: PubSubEngine`: PubSub instance.

You can then attach these runtime services to your server context:

```ts
import { createKnexCRUDRuntimeServices } from '@graphback/runtime-knex';
import { buildSchema } from 'graphql';
import Knex from 'knex';
import { PubSub } from 'graphql-subscriptions';
import { models } from './resolvers/models';
import resolvers from './resolvers/resolvers';

const schema = buildSchema(...);

const db = Knex(...);

const pubSub = new PubSub();

// create runtime services for SQLite
const context = createKnexCRUDRuntimeServices(models, schema, db, pubSub);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context
});
```

## Using data sources

Your data sources are attached to the application context and can be accessed in every resolver function:

```js
findAllComments: (parent, args, context) => {
    return context.Comment.findAll();
};
```