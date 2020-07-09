---
id: overview
title: Overview
sidebar_label: Overiew 
---

At the core of a CRUD API is the database that Graphback interacts with by providing a rich set of tools and APIs that help you get your database working with your GraphQL application in minutes.

Graphback has a [CRUD abstraction](../crud/overview) with a number of out-of-the-box implementations for [PostgreSQL](postgres.md), [MongoDB](mongodb.md) databases. [SQLite](sqlite.md) database is also partially supported and we do not recommend using it in production environment, however it is a good choice for testing or development purposes.

Additionally, Graphback integrates with [GraphQL Migrations`](../graphql-migrations/intro.md) so that you can migrate your databases using your business models defined in the GraphQL schema. 

:::note
GraphQL Migrations only operates on relational databases e.g PostgreSQL and does not work with MongoDB as shown in the [compatibility](#compatibility) table below.
:::

## Compatibility

| Operation | [PostgreSQL](postgres.md) | [MongoDB](mongodb.md) | [SQLite](sqlite.md) |
| ------------- |:--:|:-----:|:-----:|
| [Create](../crud/mutations#create)        | ✔️ | ✔️     | ✔️     |
| [Update](../crud/mutations#update) | ✔️ | ✔️ | ✔️ |
| [Delete](../crud/mutations#delete) | ✔️ | ✔️ | ✔️ |
| [Get](../crud/queries#get) | ✔️ | ✔️ | ✔️ |
| [Find](../crud/queries#find) | ✔️ | ✔️ | ✔️ |
| [Filtering](../crud/queries#filtering) | ✔️ | ✔️ | ✔️ |
| [Pagination](../crud/queries#pagination) | ✔️ | ✔️ | ✔️ |
| [Ordering](../crud/queries#ordering) | ✔️ | ✔️ | ✔️ |
| Batch queries | ✔️ | ✔️ | ✔️ |
| [Subscriptions](../crud/subscriptions.md) | ✔️ | ✔️ | ✔️ |
| Relationships - 1:M | ✔️ | ✔️ | ✔️ |
| Relationships - 1:1 | ✔️ | ✔️ | ✔️ |
| [Migrations](../graphql-migrations/intro.md) - Create database | ✔️ | ❌ | ✔️ |
| [Migrations](../graphql-migrations/intro.md) - Update database | ✔️ | ❌ | ❌ |
