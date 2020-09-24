---
id: "index"
title: "graphback"
sidebar_label: "README"
---

## Graphback

<p align="center">
  <img width="400" src="https://raw.githubusercontent.com/aerogear/graphback/master/website/static/img/logo.png"/>
  <br/>
  Auto generate database structure, <br/>
  GraphQL Resolvers and Queries from GraphQL types 🚀
</p>

## Motivation 

Graphback helps you to kickstart your experience with any existing GraphQL implementation
by generating backend and client side CRUD layer using your GraphQL data model.

**Documentation**: https://graphback.dev

**Repository**: https://github.com/aerogear/graphback/

## Usage

`graphback` provides a programmatic API for the Graphback ecosystem.
In most of the cases you can use graphback by utilizing graphback-cli package that will expose all useful commands and cover most of the use cases.

Install with npm:

```bash
npm install graphback
```

Install with yarn:

```bash
npm install graphback
```

`buildGraphbackAPI` will process your schema and generate a CRUD API with schema, resolvers, services and data sources.

```ts
import { buildGraphbackAPI } from 'graphback';
import { createKnexDbProvider } from '@graphback/runtime-knex';
import Knex from 'knex';

const db = Knex({...});

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(schema, {
  dataProviderCreator: createKnexDbProvider(db)
});
```

Up-to-date usage and configuration information is covered in depth over on our website [graphhback.dev](https://graphback.dev/docs/getting-started/add-to-project).
