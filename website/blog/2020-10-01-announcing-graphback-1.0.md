---
title: Announcing the Release of Graphback 1.0
description: Graphback 1.0 has been released! Read more to kickstart your GraphQL experience.
author: Enda Phelan
author_title: Software Engineer
author_url: https://twitter.com/PhelanEnda
author_image_url: https://avatars2.githubusercontent.com/u/11743717?s=460&u=3fd43aed3b4b8eb706fed5719e179d23c9c47eb1&v=4
tags: [graphql, graphback, graphqlcrud, graphql-js, nodejs, release, graphql-cli]
hide_table_of_contents: true
image: https://graphback.dev/img/logo.png
---

We are excited to announce the **official release of Graphback 1.0**! This release is the end result of the amazing work and collaboration between the Graphback team and our community. 

<!--truncate-->

To each and every one of you who helped by using Graphback and providing us with invaluable feedback, and to those who contributed in code and issues - thank you! You are all stars, and we would not have gotten here without you.

## What is Graphback?

Graphback is a Node.js runtime framework and toolkit to generate a production-ready GraphQL project. Graphback is a core extension of the GraphQL CLI, used to generate a set of queries, mutations and subscriptions for each of your data models and connects to the database of your choice, allowing you to focus on the business objectives of your application.

<div style={{textAlign: 'center', width: '400px', height: '400px', margin: '0 auto' }}>

![Graphback logo](/img/logo.png)

</div>

The generated API layer follows the [GraphQL CRUD](https://graphqlcrud.org/) specification developed by the GraphQL community, providing a common pattern for querying your data, and enables interoperability between GraphQL libraries which also adopt these patterns.

On top of the core framework, Graphback comes with a number of additional utility libraries which can optionally be used to aid development, like GraphQL Migrations for automatic database migration from your schema, and GraphQL Serve to instantly start up a Graphback API in-memory from the command-line.

## Why not ${otherGraphqlLibrary} instead?

But, you might ask, why not some other library instead? The GraphQL ecosystem is evolving quickly, with a growing number of frameworks and libraries. Why should I choose Graphback and GraphQL CLI?

### No vendor lock-in

The open design of Graphback and GraphQL CLI means there will be no vendor lock-in. You have full control over your code and you can easily extend, customise and replace to suit your use cases.

### Open Source, forever

Graphback is, and always will be, 100% open source. We actively work with and use feedback from our awesome community to help drive Graphback in the right direction, and will continue to do so forever more.

### Committed to improving the GraphQL ecosystem

One of our main philosophies is to ensure Graphback coexists and works with as many other GraphQL libraries and standards as possible, improving the overall experience for developers. Some of the libraries that Graphback works with:

* [GraphQL CLI](https://graphql-cli.com) - Graphback helps to power the GraphQL CLI
* [GraphQL Tools](https://www.graphql-tools.com/)
* [GraphQL Config](https://graphql-config.com/)
* [GraphQL Code Generator](https://graphql-code-generator.com/)
* [GraphQL CRUD](https://graphqlcrud.org/) - an open specification for common operations on top of GraphQL

### Easy to use, easier to stay

We tried to make Graphback as easy to use as possible. Whether you are highly experienced with GraphQL, or Graphback is your first venture into the world of GraphQL, we wanted to make it easy for you to add Graphback to your project and get up and running. You can bootstrap your server with Graphback through a couple of programmatic APIs.

```ts
import { buildGraphbackAPI, createCRUDService } from 'graphback';
import { createKnexDbProvider } from '@graphback/runtime-knex';
import { PubSub } from 'graphql-subscriptions';
import Knex from 'knex';

const db = Knex(...);

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  serviceCreator: createCRUDService({ pubSub: new PubSub() })
  dataProviderCreator: createKnexDbProvider(db)
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextCreator
});
```

### GraphQL CRUD out of the box

The Graphback team is a founding contributor of the GraphQL CRUD specification. This means that Graphback stays up-to-date with the latest features and improvements in the specification.

```graphql
type Query {
  findNotes(filter: NoteFilter, page: PageRequest, orderBy: OrderByInput): NoteResultList!
  getNote(id: ID!): Note
  findComments(filter: CommentFilter, page: PageRequest, orderBy: OrderByInput): CommentResultList!
  getComment(id: ID!): Comment
}
```

You can instantly begin performing mutations and queries without having to write any additional backend code.

<div style={{textAlign: 'center', margin: '0 auto' }}>

![GraphQL CRUD query](/img/graphqlcrud-query-getone.gif)

</div>

Graphback generates a CRUD service for each of your data models. First-class integration with [GraphQL Code Generator](https://graphql-code-generator.com/) gives you a type-safe, GraphQL CRUD programmatic API for every model, making it easier to create custom filtering from your resolver code.

```ts
import { NoteFilter } from '../generated-types';

const filter: QueryFilter<NoteFilter> = {
  title: {
    startsWith: '[DRAFT]'
  }
}

const results = await context.graphback.Note.findBy({ filter }, context, info);
```

### Extensible by design, flexible by nature

Graphback was designed with extensibility as a main priority. All core API functionality is generated through plugins, with additional customizations possible by using a community plugin or by [creating your own](https://graphback.dev/docs/plugins/create).

```ts
...
import { SchemaCRUDPlugin } from '@graphback/codegen-schema';
import { DataSyncPlugin } from '@graphback/datasync';

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  serviceCreator: createCRUDService({ pubSub: new PubSub() })
  dataProviderCreator: createKnexDbProvider(db),
  plugins: [
    new SchemaCRUDPlugin({...}),
    new DataSyncPlugin({...})
  ]
});
```

Graphback can be added to any existing GraphQL application (in Node.js), or you can create a project from scratch with [GraphQL CLI](https://graphql-cli.com).

```shell
$ npx graphql-cli init
? Select the best option for you I want to create a new project from a GraphQL CLI Project Template.
? What is the name of the project? cool-graphback-project
```

### Choose your database...or databases

Graphback works with both SQL and NoSQL databases. Use the [`@graphback/runtime-knex`](https://www.npmjs.com/package/@graphback/runtime-knex) package to connect to a PostgreSQL database, and [`@graphback/runtime-mongo`](https://www.npmjs.com/package/@graphback/runtime-mongo) to connect to MongoDB.

It’s as straightforward as changing a couple of lines in your code to switch between database providers and start to query and persist your data.

```ts
...
// import { createKnexDbProvider } from '@graphback/runtime-knex';
// highlight-next-line
import { createMongoDbProvider } from '@graphback/runtime-mongo';
import { DataSyncPlugin } from '@graphback/datasync';

const db = connectMongoDB();

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  // dataProviderCreator: createKnexDbProvider(db)
  // highlight-next-line
  dataProviderCreator: createMongoDbProvider(db)
});
```


With [`dataProviderCreator`](https://graphback.dev/docs/api/graphback/modules/_buildgraphbackapi_#graphbackdataprovidercreator) you can easily use multiple data sources in one application:

```ts
import { KnexDBDataProvider } from '@graphback/runtime-knex';
import { MongoDBDataProvider } from '@graphback/runtime-mongo';

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: (model: ModelDefinition) => {
    if (['Note', 'Comment'].includes(model.graphqlType.name)) {
      return new KnexDBDataProvider(model, Knex({...}));
    } else {
      return new MongoDBDataProvider(model, db);
    }
  }
});
```

## Before we go

Kickstart your GraphQL experience with Graphback today using the [GraphQL CLI](https://graphql-cli.com), or follow [our guide to add Graphback to your existing project](https://graphback.dev/docs/getting-started/add-to-project) with minimal work. 

Enjoying Graphback? We’d love to hear from you; and if you can see things that could to be improved, tell us! We want your feedback so we can continue to make Graphback better every day. 

Join our [Discord server](https://discordapp.com/invite/vSCavr) to reach us directly or go to our [GitHub](https://github.com/aerogear/graphback) to create an issue or pull request.

I can't leave without some special shout outs to the following people who were actively involved in shaping Graphback:

- [@ssd71](https://github.com/ssd71)
- [@ankitjena](https://github.com/ankitjena)
- [@lastmjs](https://github.com/lastmjs)
- [@renovate-bot](https://github.com/renovate-bot) - bots deserve ❤️ too 🤖!