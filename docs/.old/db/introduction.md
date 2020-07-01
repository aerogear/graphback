---
id: dbintroduction
title: Database
sidebar_label: Introduction
---

Graphback provides a rich set of tools and APIs that help you get your database working with your GraphQL application in minutes.

Graphback has a [CRUD abstraction](../crud/crudruntime) with a number of out-of-the-box implementations for different datasources (see [Data sources](./datasources)).

Graphback integrates with [`graphql-migrations`](https://www.npmjs.com/package/graphql-migrations) so that you can migrate your database using your GraphQL schema. `graphql-migrations` can be used programatically from your application code using the `migrateDB` API. For more see [Database Migrations](./dbmigrations).

## Compatibility

| Operation | PostgreSQL | MongoDB | SQLite |
| ------------- |:--:|:-----:|:-----:|
| Create        | ✔️ | ✔️     | ✔️     |
| Read | ✔️ | ✔️ | ✔️ |
| Update | ✔️ | ✔️ | ✔️ |
| Delete | ✔️ | ✔️ | ✔️ |
| Find | ✔️ | ✔️ | ✔️ |
| Batch queries | ✔️ | ✔️ | ✔️ |
| Relationships - 1:M | ✔️ | ✔️ | ✔️ |
| Relationships - 1:1 | ✔️ | ✔️ | ✔️ |
| Migrations - Create database | ✔️ | ❌ | ✔️ |
| Migrations - Update database | ✔️ | ❌ | ❌ |