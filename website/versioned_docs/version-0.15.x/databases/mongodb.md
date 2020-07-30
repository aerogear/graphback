---
id: mongodb
title: Using MongoDB in Graphback
sidebar_label: MongoDB 
---

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers.
[Graphback MongoDB Provider](https://www.npmjs.com/package/@graphback/runtime-mongo) package provides instant integration to your Mongo database, giving you a full implementation of the [CRUD API](../crud/introduction.md). 

The package is built on top of the official [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native).

## Installation

Install with npm:

```bash
npm install @graphback/runtime-mongo mongodb
```

Install with yarn:

```bash
yarn add @graphback/runtime-mongo mongodb
```

Running either of the two commands will install the `Graphback MongoDB Provider` ([`@graphback/runtime-mongo`](https://www.npmjs.com/package/@graphback/runtime-mongo)) and the MongoDB Driver ([`mongodb`](https://www.npmjs.com/package/mongodb)).

## Creating Database Connection

You'll need a running MongoDB instance before initializing the connection. 

:::info
If you do not have a running instance, you can use [Docker](https://www.docker.com/) to quickly spin up a MongoDB container by following the instructions given in
[MongoDB Docker Image](https://hub.docker.com/_/mongo).
:::

The following code can be used to connect to your MongoDB.

```ts
import { Db, MongoClient } from "mongodb";

// Example Mongo Connection URL
const url = 'mongodb://localhost:27017';

const mongoClient: MongoClient = await MongoClient.connect(url);
// get db instance
const db: Db = mongoClient.db('users');
```

Here we are connecting to the `users` database, on a MongoDB instance running locally.

You can change the configurations variables to match the one you have.

To learn more about the accepted configuration, visit the [MongoDB Driver Connection Options](https://mongodb.github.io/node-mongodb-native/3.5/reference/connecting/) documentation.

## Using MongoDB Provider

The Graphback MongoDB provider exposes a [`createMongoDbProvider`](../api/graphback-runtime-mongodb/modules/_createmongodbprovider_.md) method, which can be used to create data providers for each of your  data models. 

The code below shows how you can create such a data provider creator and how it can be passed to [`buildGraphbackAPI`](./api/graphback/modules/_buildgraphbackapi_.md).

```ts
import { Db, MongoClient } from "mongodb";
import { buildGraphbackAPI } from 'graphback';
import { createMongoDbProvider } from '@graphback/runtime-mongo';

// highlight-start
// Example Mongo Connection URL
const url = 'mongodb://localhost:27017';

const mongoClient: MongoClient = await MongoClient.connect(url);

// get db instance
const db: Db = mongoClient.db('users');

// create the MongoDB Data provider creator function
const dataProviderCreator = createMongoDbProvider(db);

// highlight-end

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

// Use the dataProvider in buildGraphbackAPI
const { resolvers, services, contextCreator } = buildGraphbackAPI(userModel, { dataProviderCreator });
```

The highlighted code does the following:
 - Define connection URL to the MongoDB.
 - Create a connection to our Mongo database.
 - Select the `users` database.
 - And finally, create a data provider creator by using the `createMongoDbProvider` API. 
  
The rest of the code uses [`buildGraphbackAPI`](./api/graphback/modules/_buildgraphbackapi_.md) to create Graphback CRUD API based on the defined `userModel` model.

Visit [Data Models](../model/datamodel.md) to learn more about how to design your business models.
